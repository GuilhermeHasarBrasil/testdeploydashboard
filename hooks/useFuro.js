import * as XLSX from 'xlsx'
const ExcelJS = require('exceljs');
import { collection, addDoc, getDocs, where, query, deleteDoc, updateDoc, doc,} from "firebase/firestore";
import { db } from '../firebase/firebase';

async function retornaDadosExcel (event) {
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

    // setFuro(furoPlanilha)
    // setChipBoxes(caixas)
    //inserirFuroECaixasNoBanco(furoPlanilha, caixas)
    return { furoPlanilha, caixas }

    reader.readAsBinaryString(file);
};

async function inserirFuroECaixasNoBanco( furo, caixas ) {

    console.log('dentro da funcao', furo)
    console.log('type', typeof(furo))

    // //const { exists } = await firebase.firestore().collection('Furos').doc(furo.numero).get();
    // const q = query(collection(db,'Furos'), where("numero", '==', furo.furo))
    // const {exists} = await getDocs(q)
    // console.log(exists)

    // if (exists) {
    //     const docRef = firebase.firestore().collection('Furos').doc(furo.numero);
    //     try {
    //         const docSnapshot = await docRef.get();

    //         if (docSnapshot.exists) {

    //             const furoData = docSnapshot.data();
    //             const reversedCaixas = [...caixas].reverse(); // cria uma cópia do array e inverte, pois é inserido as novas caixas de tras pra frente no for

    //             // se o furo antes tinha 10 caixas por ex, agr entra a planilha com 12. Atraves do campo profundidade, pode-se inserir apenas as 2 ultimas
    //             for (let i = 0; i < reversedCaixas.length - furoData.profundidade; i++) {
    //                 const docNumber = caixas.length - i;
    //                 const caixa = reversedCaixas[i];
    //                 firebase.firestore()
    //                     .collection('ChipBoxes')
    //                     .doc(furo.numero + '-' + docNumber)
    //                     .set({
    //                         conferido: false,
    //                         furo: furo.numero,
    //                         cx: docNumber,
    //                         dataExtraida: new Date(caixa.dt),
    //                         sonda: caixa.sonda,
    //                         de: caixa.de,
    //                         ate: caixa.ate,
    //                         qrcode: `${docNumber};${furo.projeto};${furo.numero};${caixa.de
    //                             .toFixed(2)
    //                             .replace('.', ',')
    //                             .padStart(6, '0')};${caixa.ate
    //                                 .toFixed(2)
    //                                 .replace('.', ',')
    //                                 .padStart(6, '0')}`,
    //                         createdAt: firestore.Timestamp.now(),
    //                         processos: {
    //                             conferencia: {
    //                                 ent: null,
    //                                 sai: null,
    //                                 user: null,
    //                             },

    //                             marcacao: {
    //                                 ent: null,
    //                                 sai: null,
    //                                 obs: null,
    //                                 user: null,
    //                             },

    //                             fotografia: {
    //                                 ent: null,
    //                                 sai: null,
    //                                 obs: null,
    //                                 user: null,
    //                             },
    //                             arquivamento: {
    //                                 ent: null,
    //                                 sai: null,
    //                                 user: null,
    //                             },
    //                         },
    //                     })

    //                 //atualizar o furo que tem furo.numero como doc
    //                 try {
    //                     await docRef.update({
    //                         profundidade: caixas.length,
    //                         ate: caixas[caixas.length - 1].ate,
    //                         ultimaCaixa: {
    //                             furo: furo.numero,
    //                             cx: caixas[caixas.length - 1].cx,
    //                             dataExtraida: new Date(caixas[caixas.length - 1].dt),
    //                             sonda: caixas[caixas.length - 1].sonda,
    //                             de: caixas[caixas.length - 1].de,
    //                             ate: caixas[caixas.length - 1].ate,
    //                             qrcode: `${caixas[caixas.length - 1].cx};${furo.projeto};${furo.numero};${caixas[caixas.length - 1].de
    //                                 .toFixed(2)
    //                                 .replace('.', ',')
    //                                 .padStart(6, '0')};${caixas[caixas.length - 1].ate
    //                                     .toFixed(2)
    //                                     .replace('.', ',')
    //                                     .padStart(6, '0')}`,
    //                             createdAt: firestore.Timestamp.now(),
    //                         }
    //                     });
    //                     console.log('Documento do furo atualizado com sucesso.');
    //                 } catch (error) {
    //                     console.error('Erro ao atualizar o documento do furo:', error);
    //                 }
    //             }
    //             return

    //         } else {
    //             console.log('Nenhum furo encontrado com esse número.');
    //         }
    //     } catch (error) {
    //         console.error('Erro ao buscar o furo:', error);
    //     }
    // }

    // else {
    //     firebase.firestore()
    //         .collection('Furos')
    //         .doc(furo.numero)
    //         .set({
    //             numero: furo.numero,
    //             projeto: furo.projeto,
    //             profundidade: furo.profundidade,
    //             createdAt: firestore.Timestamp.now(),
    //             processadasFotografia: 0,
    //             de: caixas[0].de,
    //             ate: caixas[caixas.length - 1].ate,
    //             ultimaCaixa: {
    //                 furo: furo.numero,
    //                 cx: caixas[caixas.length - 1].cx,
    //                 dataExtraida: new Date(caixas[caixas.length - 1].dt),
    //                 sonda: caixas[caixas.length - 1].sonda,
    //                 de: caixas[caixas.length - 1].de,
    //                 ate: caixas[caixas.length - 1].ate,
    //                 qrcode: `${caixas[caixas.length - 1].cx};${furo.projeto};${furo.numero};${caixas[caixas.length - 1].de
    //                     .toFixed(2)
    //                     .replace('.', ',')
    //                     .padStart(6, '0')};${caixas[caixas.length - 1].ate
    //                         .toFixed(2)
    //                         .replace('.', ',')
    //                         .padStart(6, '0')}`,
    //                 createdAt: firestore.Timestamp.now(),
    //             },
    //             processos: {
    //                 geologia: {
    //                     descGeologica: {
    //                         ent: null,
    //                         sai: null,
    //                         obs: null,
    //                         user: null,
    //                     },
    //                     descGeotecnica: {
    //                         ent: null,
    //                         sai: null,
    //                         obs: null,
    //                         user: null,
    //                     },
    //                     descEstrutural: {
    //                         ent: null,
    //                         sai: null,
    //                         obs: null,
    //                         user: null,
    //                     },
    //                 },
    //                 densidade: {
    //                     ent: null,
    //                     sai: null,
    //                     obs: null,
    //                     user: null,
    //                 },
    //                 serragem: {
    //                     ent: null,
    //                     sai: null,
    //                     obs: null,
    //                     user: null,
    //                 },
    //                 amostragem: {
    //                     ent: null,
    //                     sai: null,
    //                     user: null,
    //                 },
    //                 despacho: {
    //                     ent: null,
    //                     sai: null,
    //                     user: null,
    //                 },
    //             }
    //         })
    //         .then(() => {
    //             caixas.forEach(cx => {
    //                 firebase.firestore()
    //                     .collection('ChipBoxes')
    //                     .doc(furo.numero + '-' + cx.cx)
    //                     .set({
    //                         conferido: false,
    //                         furo: furo.numero,
    //                         cx: cx.cx,
    //                         dataExtraida: new Date(cx.dt),
    //                         sonda: cx.sonda,
    //                         de: cx.de,
    //                         ate: cx.ate,
    //                         qrcode: `${cx.cx};${furo.projeto};${furo.numero};${cx.de
    //                             .toFixed(2)
    //                             .replace('.', ',')
    //                             .padStart(6, '0')};${cx.ate
    //                                 .toFixed(2)
    //                                 .replace('.', ',')
    //                                 .padStart(6, '0')}`,
    //                         createdAt: firestore.Timestamp.now(),
    //                         processos: {
    //                             conferencia: {
    //                                 ent: null,
    //                                 sai: null,
    //                                 user: null,
    //                             },

    //                             marcacao: {
    //                                 ent: null,
    //                                 sai: null,
    //                                 obs: null,
    //                                 user: null,
    //                             },

    //                             fotografia: {
    //                                 ent: null,
    //                                 sai: null,
    //                                 obs: null,
    //                                 user: null,
    //                             },
    //                             arquivamento: {
    //                                 ent: null,
    //                                 sai: null,
    //                                 user: null,
    //                             },
    //                         },
    //                     })
    //                     .catch(err => {
    //                         console.log('Erro ao criar caixa:', err);
    //                     });
    //             });
    //         })
    //         .catch(err => {
    //             console.log('Erro ao criar furo: ', err);
    //         });
    // }

    return;
}

export const useFuro = () => ({
    retornaDadosExcel,
    inserirFuroECaixasNoBanco,
  });
  