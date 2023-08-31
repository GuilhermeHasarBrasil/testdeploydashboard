import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx'
const ExcelJS = require('exceljs');
import {
    collection,
    getDocs,
    where,
    query,
    updateDoc,
    doc,
    setDoc,
    Timestamp,
} from "firebase/firestore";
import { db } from '../../firebase/firebase'
import "firebase/database"
import TableFuro from './table';
import styled from 'styled-components'
import { AiOutlineUpload } from "react-icons/ai";
import { Alert } from '@mui/material';

export default function Import() {
    const [data, setData] = useState([]);
    const [furo, setFuro] = useState()
    const [chipBoxes, setChipBoxes] = useState([])

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        let furoPlanilha = []
        let caixas = []

        reader.onload = (e) => {
            const binaryData = e.target.result;
            const workbook = XLSX.read(binaryData, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            setData(data)
            let totalFilledRows = 0;
            data.forEach((row, index) => {
                if (
                    index >= 3 &&
                    row.some(cell => cell !== undefined && cell !== null && cell !== '')
                ) {
                    totalFilledRows++;
                }
            });

            const wbJS = new ExcelJS.Workbook();
            const wsJS = wbJS.addWorksheet('Sheet1');
            data.forEach(row => {
                wsJS.addRow(row);
            });



            let numeroCaixa = 0;
            wsJS.eachRow((linha, numeroLinha) => {
                if (numeroLinha == 3) {
                    let conferePadraoFuro = wsJS.getCell(`A3`).value;
                    let conferePadraoSonda = wsJS.getCell('B3').value;
                    let conferePadraoDe = wsJS.getCell('D3').value;
                    if (conferePadraoFuro != 'FURO' && conferePadraoSonda != 'SONDA' && conferePadraoDe != 'DE') {
                        throw new Error('Erro ao inserir furo.\nArquivo no formato errado!');
                    }
                }

                if (numeroLinha > 3) {
                    numeroCaixa++;
                    // Captura amostras e demais dados da planilha
                    const sonda = wsJS.getCell(`B${numeroLinha}`).value;
                    const data = wsJS.getCell(`C${numeroLinha}`).value;
                    const amDe = wsJS.getCell(`D${numeroLinha}`).value;
                    const amAte = wsJS.getCell(`E${numeroLinha}`).value;

                    //converte a data retornada
                    const date = new Date((data - (25567 + 1)) * 86400 * 1000);
                    const dataFormatada = date.toDateString();
                    const dataFinal = new Date(dataFormatada);
                    const numeroFr = wsJS.getCell('A4').value;
                    const projetoFr = numeroFr.substring(0, 3);
                    const profundidade = totalFilledRows;

                    setFuro({
                        furo: numeroFr,
                        projeto: projetoFr,
                        profundidade: profundidade
                    })

                    let furoEx = {
                        furo: numeroFr,
                        projeto: numeroFr.substring(0, 3),
                        profundidade: totalFilledRows
                    }

                    let itemLinha = {
                        cx: numeroCaixa,
                        sonda: sonda,
                        dt: dataFinal,
                        de: amDe,
                        ate: amAte,
                    };

                    furoPlanilha.push(furoEx)
                    caixas.push(itemLinha);
                }
            });
        };

        setFuro(furoPlanilha)
        setChipBoxes(caixas)
        reader.readAsBinaryString(file);
    };

    async function inserirFuroECaixasNoBanco(furo, caixas) {
        const furosCollection = collection(db, "Furos");
        const q = query(furosCollection, where("numero", "==", furo.furo));
        const querySnapshot = await getDocs(q);
        let documento = querySnapshot.docs[0]?.data()

        if (documento?.numero == furo.furo) {
            try {
                const reversedCaixas = [...caixas].reverse();
                console.log('cheguei dentro do try ', querySnapshot.docs[0].data().profundidade)

                for (let i = 0; i < reversedCaixas.length - querySnapshot.docs[0].data().profundidade; i++) {
                    const docNumber = caixas.length - i;
                    const caixa = reversedCaixas[i];
                    let chipBoxId = `${furo.furo}-${docNumber}`
                    console.log('cheguei aqui chipboxid: ', chipBoxId)
                    try {
                        const chipBoxesCollectionRef = collection(db, "ChipBoxes"); // Referência da coleção "ChipBoxes"
                        const chipBoxDocRef = doc(chipBoxesCollectionRef, chipBoxId); // Cria uma referência ao documento com ID personalizado

                        await setDoc(chipBoxDocRef, {
                            conferido: false,
                            furo: furo.furo,
                            cx: docNumber,
                            dataExtraida: new Date(caixa.dt),
                            sonda: caixa.sonda,
                            de: caixa.de,
                            ate: caixa.ate,
                            qrcode: `${docNumber};${furo.projeto};${furo.furo};${caixa.de
                                .toFixed(2)
                                .replace('.', ',')
                                .padStart(6, '0')};${caixa.ate
                                    .toFixed(2)
                                    .replace('.', ',')
                                    .padStart(6, '0')}`,
                            createdAt: Timestamp.now(),
                            processos: {
                                conferencia: {
                                    ent: null,
                                    sai: null,
                                    user: null,
                                },
                                marcacao: {
                                    ent: null,
                                    sai: null,
                                    obs: null,
                                    user: null,
                                },
                                fotografia: {
                                    ent: null,
                                    sai: null,
                                    obs: null,
                                    user: null,
                                },
                                arquivamento: {
                                    ent: null,
                                    sai: null,
                                    user: null,
                                },
                            },
                        });
                        const docRef = doc(db, "Furos", querySnapshot.docs[0].id);
                        await updateDoc(docRef, {
                            profundidade: caixas.length,
                            ate: caixas[caixas.length - 1].ate,
                            ultimaCaixa: {
                                furo: furo.furo,
                                cx: caixas[caixas.length - 1].cx,
                                dataExtraida: new Date(caixas[caixas.length - 1].dt),
                                sonda: caixas[caixas.length - 1].sonda,
                                de: caixas[caixas.length - 1].de,
                                ate: caixas[caixas.length - 1].ate,
                                qrcode: `${caixas[caixas.length - 1].cx};${furo.projeto};${furo.furo};${caixas[caixas.length - 1].de
                                    .toFixed(2)
                                    .replace('.', ',')
                                    .padStart(6, '0')};${caixas[caixas.length - 1].ate
                                        .toFixed(2)
                                        .replace('.', ',')
                                        .padStart(6, '0')}`,
                                createdAt: Date.now(),
                            },
                        });
                        setSincro(true)
                    } catch (error) {
                        console.error('Erro ao atualizar o documento do furo:', error);
                    }
                }
                return
            } catch (error) {
                console.error('Erro ao buscar o furo:', error);
            }
        }

        else {
            const furoId = furo.furo
            const FurosCollectionRef = collection(db, "Furos"); // Referência da coleção "Furos"
            const FuroDocRef = doc(FurosCollectionRef, furoId); // Cria uma referência ao documento com ID personalizado
            await setDoc(FuroDocRef, {
                numero: furo.furo,
                projeto: furo.projeto,
                profundidade: furo.profundidade,
                createdAt: Timestamp.now(),
                processadasFotografia: 0,
                de: caixas[0].de,
                ate: caixas[caixas.length - 1].ate,
                ultimaCaixa: {
                    furo: furo.furo,
                    cx: caixas[caixas.length - 1].cx,
                    dataExtraida: new Date(caixas[caixas.length - 1].dt),
                    sonda: caixas[caixas.length - 1].sonda,
                    de: caixas[caixas.length - 1].de,
                    ate: caixas[caixas.length - 1].ate,
                    qrcode: `${caixas[caixas.length - 1].cx};${furo.projeto};${furo.furo};${caixas[caixas.length - 1].de
                        .toFixed(2)
                        .replace('.', ',')
                        .padStart(6, '0')};${caixas[caixas.length - 1].ate
                            .toFixed(2)
                            .replace('.', ',')
                            .padStart(6, '0')}`,
                    createdAt: Timestamp.now(),
                },
                processos: {
                    geologia: {
                        descGeologica: {
                            ent: null,
                            sai: null,
                            obs: null,
                            user: null,
                        },
                        descGeotecnica: {
                            ent: null,
                            sai: null,
                            obs: null,
                            user: null,
                        },
                        descEstrutural: {
                            ent: null,
                            sai: null,
                            obs: null,
                            user: null,
                        },
                    },
                    densidade: {
                        ent: null,
                        sai: null,
                        obs: null,
                        user: null,
                    },
                    serragem: {
                        ent: null,
                        sai: null,
                        obs: null,
                        user: null,
                    },
                    amostragem: {
                        ent: null,
                        sai: null,
                        user: null,
                    },
                    despacho: {
                        ent: null,
                        sai: null,
                        user: null,
                    },
                }
            })
                .then(() => {
                    caixas.forEach(async cx => {
                        let chipBoxId = furo.furo + '-' + cx.cx
                        const chipBoxesCollectionRef = collection(db, "ChipBoxes"); // Referência da coleção "ChipBoxes"
                        const chipBoxDocRef = doc(chipBoxesCollectionRef, chipBoxId); // Cria uma referência ao documento com ID personalizado

                        await setDoc(chipBoxDocRef, {
                            conferido: false,
                            furo: furo.furo,
                            cx: cx.cx,
                            dataExtraida: new Date(cx.dt),
                            sonda: cx.sonda,
                            de: cx.de,
                            ate: cx.ate,
                            qrcode: `${cx.cx};${furo.projeto};${furo.furo};${cx.de
                                .toFixed(2)
                                .replace('.', ',')
                                .padStart(6, '0')};${cx.ate
                                    .toFixed(2)
                                    .replace('.', ',')
                                    .padStart(6, '0')}`,
                            createdAt: Timestamp.now(),
                            processos: {
                                conferencia: {
                                    ent: null,
                                    sai: null,
                                    user: null,
                                },

                                marcacao: {
                                    ent: null,
                                    sai: null,
                                    obs: null,
                                    user: null,
                                },

                                fotografia: {
                                    ent: null,
                                    sai: null,
                                    obs: null,
                                    user: null,
                                },
                                arquivamento: {
                                    ent: null,
                                    sai: null,
                                    user: null,
                                },
                            },
                        })
                            .catch(err => {
                                console.log('Erro ao criar caixa:', err);
                            });
                    });
                })
                .catch(err => {
                    console.log('Erro ao criar furo: ', err);
                });
        }
        setSincro(true)
        return;
    }

    const fileInputRef = useRef(null);

    const [sincro, setSincro] = useState(false)

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3%' }}>
            <input
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileUpload}
            />
            <label
                htmlFor="fileInput"
                style={{
                    cursor: 'pointer',
                    height: 80,
                    width: 260,
                    backgroundColor: 'grey',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    borderRadius: 10,
                    padding: 8
                }}
                onClick={() => fileInputRef.current.click()} // Simula o clique no input de arquivo
            >
                <AiOutlineUpload style={{ color: 'white' }} size={45} /> <text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }} >Selecione o arquivo </text>
            </label>
            {
                furo && chipBoxes.length > 2 ?
                    <Button disabled={!sincro ? false : true} onClick={() => inserirFuroECaixasNoBanco(furo, chipBoxes)} >
                        <text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }} >{!sincro ? 'Sincronizar planilha no banco de dados' : 'Sincronizado!'}</text>
                    </Button>
                    :
                    <></>
            }
            {
                furo && chipBoxes.length > 0 ?
                !sincro ? 
                <Alert style={{marginTop:15, width:600, marginBottom: 12}} severity="warning">Ao pressionar o botão acima, você enviará todas as caixas ao banco de dados!</Alert>
                :
                <Alert style={{marginTop:15, marginBottom:12, width:600}} severity="success">Sincronizado com sucesso! As caixas foram enviadas ao banco com sucesso.</Alert>
                
                :
                <Alert style={{marginTop:15, width:600}} severity="info">Após importar, você deve sincronizar a planilha!</Alert>
            }
            {
                chipBoxes.length > 0 ?
                    <TableFuro furo={furo} caixas={chipBoxes} />
                    :
                    <></>
            }
            
        </div>
    );
}

const Button = styled.button`

    margin-top: 15px;
    margin-bottom: 15px;
    background-color: #074F92;
    transition: opacity 0.3s;
    height: 80px;
    width: 260px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: 'white';
    &:hover {
        opacity: 0.2;
    }

`