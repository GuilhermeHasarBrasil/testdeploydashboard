import { useEffect, useState } from "react";
import { useAuth } from "../firebase/auth";
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import styled from 'styled-components'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import * as furosmock from "../components/mockedContent/furos";
import * as chipboxesmock from "../components/mockedContent/chipboxes";
import * as paletesmock from "../components/mockedContent/paletes"
import * as whiteBoxesmock from "../components/mockedContent/whiteboxes"
import Header from "../components/Header";
import RowFuros from "../components/index/rowFuros";
import TableFuros from "../components/Relatorios/tableFuros";
import MenuLeft from "../components/index/menuLeft";
import TopDashboard from "../components/Dashboard/topDashboard";
import { Divider } from '@mui/material';
import Relatorio from "../components/Dashboard/relatorio";
import DadosProcessamento from "../components/DadosProcessamento/dadosProcessamento";
import PrintLabel from "../components/ImpressaoEtiquetas/impressao";
import PrinterSettings from "../components/ConfigImpressora/ConfigImpressora";
import CustomBarChart from "../components/Dashboard/CustomBarChartHorizontal";
import SquareIcon from '@mui/icons-material/Square';
import BarChartWeek from "../components/Dashboard/WeekWorkBarchart";
import Mensagens from "../components/Mensagens/Mensagens";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Relatorios from "../components/Relatorios/Relatorios";
import Import from "../components/ImportarArquivo/importar";
import CustomBarChartMes from "../components/Dashboard/BarChartMes";
import { motion } from 'framer-motion';

export default function Home() {
    const { signOut, authUser, isLoading } = useAuth();
    const router = useRouter();
    const [furos, setFuros] = useState(furosmock.furos)
    const [chipBoxes, setChipBoxes] = useState(chipboxesmock.chipboxes)
    const [chipBoxesInternos, setChipBoxesInternos] = useState([])
    const [selected, setSelected] = useState('Dashboard')
    const [furoSelecionado, setFuroSelecionado] = useState()
    const [quantidadeConferidos, setQuantidadeConferidos] = useState(0);
    const [quantidadeFinalizados, setQuantidadeFinalizados] = useState(0);
    const [filtroConferencia, setFiltroConferencia] = useState([])
    const [filtroMarcacao, setFiltroMarcacao] = useState([])
    const [filtroFotografia, setFiltroFotografia] = useState([])
    const [filtroDensidade, setFiltroDensidade] = useState([])
    const [filtroSerragem, setFiltroSerragem] = useState([])
    const [filtroArquivamento, setFiltroArquivamento] = useState([])

    const [contagensPorDiaConferencia, setContagensPorDiaConferencia] = useState({}); // Estado para armazenar as contagens por dia
    const [contagensPorDiaMarcacao, setContagensPorDiaMarcacao] = useState({});
    const [contagensPorDiaFotografia, setContagensPorDiaFotografia] = useState({});
    const [contagensPorDiaDensidade, setContagensPorDiaDensidade] = useState({});
    const [contagensPorDiaSerragem, setContagensPorDiaSerragem] = useState({});
    const [contagensPorDiaDespacho, setContagensPorDiaDespacho] = useState({});
    const [contagensPorDiaArquivamento, setContagensPorDiaArquivamento] = useState({});

    const [whiteBoxes, setWhiteBoxes] = useState(whiteBoxesmock.whiteb)
    const [paletes, setPaletes] = useState(paletesmock.paletes)

    useEffect(() => {
        if (!isLoading && !authUser) {
            router.push("/login");
        }

        //if (!!authUser) {
        //     const unsubscribeFuros = onSnapshot(query(collection(db, "Furos"), orderBy('numero')), (snapshot) => {
        //         const updatedFuros = snapshot.docs.map((doc) => ({
        //             id: doc.id,
        //             ...doc.data()
        //         }));
        //         setFuros(updatedFuros);
        //     });

        //     const unsubscribeChipBoxes = onSnapshot(query(collection(db, "ChipBoxes"), orderBy('furo')), (snapshot) => {
        //         const updatedChipBoxes = snapshot.docs.map((doc) => ({
        //             id: doc.id,
        //             ...doc.data()
        //         }));
        //         setChipBoxes(updatedChipBoxes);
        //     });

            // const unsubscribeWhiteBoxes = onSnapshot(query(collection(db, "WhiteBoxes"), orderBy('furo')), (snapshot) => {
            //     const WhiteBoxes = snapshot.docs.map((doc) => ({
            //         id: doc.id,
            //         ...doc.data()
            //     }));
            //     setWhiteBoxes(WhiteBoxes);
            // });

            // const unsubscribePaletes = onSnapshot(query(collection(db, "Paletes"), orderBy('furo')), (snapshot) => {
            //     const Paletes = snapshot.docs.map((doc) => ({
            //         id: doc.id,
            //         ...doc.data()
            //     }));
            //     setPaletes(Paletes);
            // });

            // return () => {
                //unsubscribeFuros();
                //unsubscribeChipBoxes();
            //     unsubscribeWhiteBoxes();
            //     unsubscribePaletes();
            // };
       // }
    }, [authUser, isLoading]);

    useEffect(() => {
        if (chipBoxes) {
            const chipboxesPorFuro = {};
            for (const chipbox of chipBoxes) {
                const furo = chipbox.furo;
                if (chipboxesPorFuro[furo]) {
                    chipboxesPorFuro[furo].push(chipbox);
                } else {
                    chipboxesPorFuro[furo] = [chipbox];
                }
            }
            const arraysInternos = Object.values(chipboxesPorFuro);
            setChipBoxesInternos(arraysInternos)

            const arraysFiltradosConferencia = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.conferencia.sai !== null
                )
            );
            setFiltroConferencia(arraysFiltradosConferencia)

            const arraysFiltradosMarcacao = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.marcacao.sai !== null
                )
            );
            setFiltroMarcacao(arraysFiltradosMarcacao)

            const arraysFiltradosFotografia = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.fotografia.sai !== null
                )
            );
            setFiltroFotografia(arraysFiltradosFotografia)

            const arraysFiltradosDensidade = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.densidade.sai !== null
                )
            );
            setFiltroDensidade(arraysFiltradosDensidade)

            const arraysFiltradosSerragem = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.serragem.sai !== null
                )
            );
            setFiltroSerragem(arraysFiltradosSerragem)

            const arraysFiltradosArquivamento = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.arquivamento.sai !== null
                )
            );
            setFiltroArquivamento(arraysFiltradosArquivamento)
        }
    }, [chipBoxes])

    useEffect(() => {
        const quantidadeConferidos = furos.filter(furo => furo.conferido === true).length;
        const quantidadeFinalizado = furos.filter(furo => furo.finalizado === true).length;
        setQuantidadeConferidos(quantidadeConferidos);
        setQuantidadeFinalizados(quantidadeFinalizado);
    }, [furos])

    const [dataBarChart, setDataBarChart] = useState([])
    useEffect(() => {
        setDataBarChart([
            {
                name: 'Conferência',
                processed: filtroConferencia[furoSelecionado?.index]?.length,
                total: chipBoxesInternos[furoSelecionado?.index]?.length,
            },
            {
                name: 'Marcação',
                processed: filtroMarcacao[furoSelecionado?.index]?.length,
                total: chipBoxesInternos[furoSelecionado?.index]?.length,
            },
            {
                name: 'Fotografia',
                processed: filtroFotografia[furoSelecionado?.index]?.length,
                total: chipBoxesInternos[furoSelecionado?.index]?.length,
            },
            {
                name: 'Densidade',
                processed: filtroDensidade[furoSelecionado?.index]?.length,
                total: chipBoxesInternos[furoSelecionado?.index]?.length,
            },
            {
                name: 'Serragem',
                processed: filtroSerragem[furoSelecionado?.index]?.length,
                total: chipBoxesInternos[furoSelecionado?.index]?.length,
            },
            {
                name: 'Arquivamento',
                processed: filtroArquivamento[furoSelecionado?.index]?.length,
                total: chipBoxesInternos[furoSelecionado?.index]?.length,
            },
        ]);
    }, [furoSelecionado, filtroArquivamento, filtroConferencia, filtroDensidade, filtroFotografia, filtroMarcacao, filtroSerragem])

    useEffect(() => {
        function getDayOfWeek(date) {
            const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
            const dayIndex = date.getDay();
            return daysOfWeek[dayIndex];
        }
        function processarDadosConferencia() {
            const novaContagemPorDia = {};
            chipBoxes.forEach(item => {
                if (item.processos && item.processos.conferencia && item.processos.conferencia.sai) {
                    const timestamp = item.processos.conferencia.sai.seconds * 1000; // Converter para milissegundos
                    const data = new Date(timestamp);
                    const diaDaSemana = getDayOfWeek(data);
                    if (novaContagemPorDia[diaDaSemana]) {
                        novaContagemPorDia[diaDaSemana]++;
                    } else {
                        novaContagemPorDia[diaDaSemana] = 1;
                    }
                }
            });
            setContagensPorDiaConferencia(novaContagemPorDia);
        }
        function processarDadosMarcacao() {
            const novaContagemPorDia = {};
            chipBoxes.forEach(item => {
                if (item.processos && item.processos.marcacao && item.processos.marcacao.sai) {
                    const timestamp = item.processos.marcacao.sai.seconds * 1000; // Converter para milissegundos
                    const data = new Date(timestamp);
                    const diaDaSemana = getDayOfWeek(data);
                    if (novaContagemPorDia[diaDaSemana]) {
                        novaContagemPorDia[diaDaSemana]++;
                    } else {
                        novaContagemPorDia[diaDaSemana] = 1;
                    }
                }
            });
            setContagensPorDiaMarcacao(novaContagemPorDia);
        }
        function processarDadosFotografia() {
            const novaContagemPorDia = {};
            chipBoxes.forEach(item => {
                if (item.processos && item.processos.fotografia && item.processos.fotografia.sai) {
                    const timestamp = item.processos.fotografia.sai.seconds * 1000; // Converter para milissegundos
                    const data = new Date(timestamp);
                    const diaDaSemana = getDayOfWeek(data);
                    if (novaContagemPorDia[diaDaSemana]) {
                        novaContagemPorDia[diaDaSemana]++;
                    } else {
                        novaContagemPorDia[diaDaSemana] = 1;
                    }
                }
            });
            setContagensPorDiaFotografia(novaContagemPorDia);
        }
        function processarDadosDensidade() {
            const novaContagemPorDia = {};
            chipBoxes.forEach(item => {
                if (item.processos && item.processos.densidade && item.processos.densidade.sai) {
                    const timestamp = item.processos.densidade.sai.seconds * 1000; // Converter para milissegundos
                    const data = new Date(timestamp);
                    const diaDaSemana = getDayOfWeek(data);
                    if (novaContagemPorDia[diaDaSemana]) {
                        novaContagemPorDia[diaDaSemana]++;
                    } else {
                        novaContagemPorDia[diaDaSemana] = 1;
                    }
                }
            });
            setContagensPorDiaDensidade(novaContagemPorDia);
        }
        function processarDadosSerragem() {
            const novaContagemPorDia = {};
            chipBoxes.forEach(item => {
                if (item.processos && item.processos.serragem && item.processos.serragem.sai) {
                    const timestamp = item.processos.serragem.sai.seconds * 1000; // Converter para milissegundos
                    const data = new Date(timestamp);
                    const diaDaSemana = getDayOfWeek(data);
                    if (novaContagemPorDia[diaDaSemana]) {
                        novaContagemPorDia[diaDaSemana]++;
                    } else {
                        novaContagemPorDia[diaDaSemana] = 1;
                    }
                }
            });
            setContagensPorDiaSerragem(novaContagemPorDia);
        }
        function processarDadosDespacho() {
            const novaContagemPorDia = {};
            chipBoxes.forEach(item => {
                if (item.processos && item.processos.despacho && item.processos.despacho.sai) {
                    const timestamp = item.processos.despacho.sai.seconds * 1000; // Converter para milissegundos
                    const data = new Date(timestamp);
                    const diaDaSemana = getDayOfWeek(data);
                    if (novaContagemPorDia[diaDaSemana]) {
                        novaContagemPorDia[diaDaSemana]++;
                    } else {
                        novaContagemPorDia[diaDaSemana] = 1;
                    }
                }
            });
            setContagensPorDiaDespacho(novaContagemPorDia);
        }
        function processarDadosArquivamento() {
            const novaContagemPorDia = {};
            chipBoxes.forEach(item => {
                if (item.processos && item.processos.arquivamento && item.processos.arquivamento.sai) {
                    const timestamp = item.processos.arquivamento.sai.seconds * 1000; // Converter para milissegundos
                    const data = new Date(timestamp);
                    const diaDaSemana = getDayOfWeek(data);
                    if (novaContagemPorDia[diaDaSemana]) {
                        novaContagemPorDia[diaDaSemana]++;
                    } else {
                        novaContagemPorDia[diaDaSemana] = 1;
                    }
                }
            });
            setContagensPorDiaArquivamento(novaContagemPorDia);
        }
        processarDadosConferencia();
        processarDadosMarcacao();
        processarDadosFotografia();
        processarDadosDensidade();
        processarDadosSerragem();
        processarDadosDespacho();
        processarDadosArquivamento();
    }, [chipBoxes]);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [filtroConferenciaEnt, setFiltroConferenciaEnt] = useState([])
    const [filtroMarcacaoEnt, setFiltroMarcacaoEnt] = useState([])
    const [filtroFotografiaEnt, setFiltroFotografiaEnt] = useState([])
    const [filtroDensidadeEnt, setFiltroDensidadeEnt] = useState([])
    const [filtroSerragemEnt, setFiltroSerragemEnt] = useState([])
    const [filtroArquivamentoEnt, setFiltroArquivamentoEnt] = useState([])

    useEffect(() => {
        if (chipBoxes) {
            const chipboxesPorFuro = {};
            for (const chipbox of chipBoxes) {
                const furo = chipbox.furo;
                if (chipboxesPorFuro[furo]) {
                    chipboxesPorFuro[furo].push(chipbox);
                } else {
                    chipboxesPorFuro[furo] = [chipbox];
                }
            }
            const arraysInternos = Object.values(chipboxesPorFuro);

            const arraysFiltradosConferencia = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.conferencia.sai !== null
                )
            );
            setFiltroConferenciaEnt(arraysFiltradosConferencia)

            const arraysFiltradosMarcacao = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.marcacao.sai !== null
                )
            );
            setFiltroMarcacaoEnt(arraysFiltradosMarcacao)

            const arraysFiltradosFotografia = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.fotografia.sai !== null
                )
            );
            setFiltroFotografiaEnt(arraysFiltradosFotografia)

            const arraysFiltradosDensidade = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.densidade.sai !== null
                )
            );
            setFiltroDensidadeEnt(arraysFiltradosDensidade)

            const arraysFiltradosSerragem = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.serragem.sai !== null
                )
            );
            setFiltroSerragemEnt(arraysFiltradosSerragem)

            const arraysFiltradosArquivamento = arraysInternos.map(arrayInterno =>
                arrayInterno.filter(chipbox =>
                    chipbox.processos.arquivamento.sai !== null
                )
            );
            setFiltroArquivamentoEnt(arraysFiltradosArquivamento)
        }
    }, [chipBoxes])
   
    return !authUser ? (
        <Loader />
    ) : (
        <main className="">
            <Container>
                <Header onClick={signOut} authUser={authUser} />
                <RenderFunctions>
                    <MenuLeft setSelected={setSelected} selected={selected} />
                    <Content>
                        <RowFuros furos={furos} setFuroSelecionado={setFuroSelecionado} selected={selected} />
                        {
                            selected === 'Dashboard' ?
                                <>
                                    <Divider sx={{ borderWidth: '1px', backgroundColor: 'grey', }} />
                                    <TopDashboard finalizados={quantidadeFinalizados} conferidos={quantidadeConferidos} furos={furos} />
                                    <Divider sx={{ borderWidth: '2px', backgroundColor: 'red', marginTop: 1, boxShadow: '10px 6px 6px rgba(0, 0, 0, 0.6)', marginBottom: 1 }} />
                                    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                        <Tabs value={value} onChange={handleChange} centered>
                                            <Tab label="Quantidade de caixas finalizadas (total do furo)" style={{ fontSize: 16, fontWeight: 'bold' }} />
                                            <Tab label="Tempo de cada caixa por processo" style={{ fontSize: 16, fontWeight: 'bold' }} />
                                            <Tab label="Dias de maior rendimento do processamento (todas as caixas)" style={{ fontSize: 16, fontWeight: 'bold' }} />
                                            <Tab label="Processamento por periodo em metros (todas as caixas)" style={{ fontSize: 16, fontWeight: 'bold' }} />
                                        </Tabs>
                                    </Box>
                                    {
                                        furoSelecionado && value === 0 ?
                                            <div style={{ marginLeft: 100, marginTop: 20, display: 'flex', flexDirection: 'column' }} >
                                                <text style={{ fontSize: 20, fontWeight: 'bold' }} >Quantidade de caixas finalizadas por processo</text>
                                                <text style={{ margin: 5, marginLeft: 55 }} >Total {<SquareIcon style={{ color: '#ef3a25' }} />} </text>
                                                <text style={{ margin: 5 }} >Finalizadas {<SquareIcon style={{ color: '#008f83' }} />}   </text>

                                                <CustomBarChart data={dataBarChart} maxValue={chipBoxesInternos[furoSelecionado?.index]?.length} />
                                            </div>
                                            :
                                            <></>
                                    }
                                    {
                                        furoSelecionado && value === 1 ?
                                            <div style={{ marginLeft: 100, marginTop: 12, display: 'flex', flexDirection: 'column' }} >
                                                <Relatorio
                                                    chipBoxes={chipBoxes} furoSelecionado={furoSelecionado}
                                                    filtroConferencia={filtroConferencia} filtroMarcacao={filtroMarcacao}
                                                    filtroFotografia={filtroFotografia} filtroDensidade={filtroDensidade}
                                                    filtroSerragem={filtroSerragem} filtroArquivamento={filtroArquivamento}
                                                    chipBoxesInternos={chipBoxesInternos}
                                                    authUser={authUser}
                                                />
                                            </div>
                                            :
                                            <></>
                                    }
                                    {
                                        value === 2 ?
                                            <BarChartWeek contagensPorDiaConferencia={contagensPorDiaConferencia}
                                                contagensPorDiaMarcacao={contagensPorDiaMarcacao}
                                                contagensPorDiaFotografia={contagensPorDiaFotografia}
                                                contagensPorDiaDensidade={contagensPorDiaDensidade}
                                                contagensPorDiaSerragem={contagensPorDiaSerragem}
                                                contagensPorDiaDespacho={contagensPorDiaDespacho}
                                                contagensPorDiaArquivamento={contagensPorDiaArquivamento}
                                                chipBoxes={chipBoxes}
                                            />
                                            :
                                            <></>
                                    }
                                    {
                                        value === 3 ?
                                            <CustomBarChartMes  
                                                chipBoxes={chipBoxes} furoSelecionado={furoSelecionado}
                                                filtroConferencia={filtroConferencia} filtroMarcacao={filtroMarcacao}
                                                filtroFotografia={filtroFotografia} filtroDensidade={filtroDensidade}
                                                filtroSerragem={filtroSerragem} filtroArquivamento={filtroArquivamento}
                                                chipBoxesInternos={chipBoxesInternos}
                                                authUser={authUser}
                                            />
                                            :
                                            <></>
                                    }
                                </>
                                :
                                <></>
                        }
                        {
                            selected === 'Relatórios' ?
                                <div style={{ display: 'flex', flexDirection: 'column' }} >
                                    <Relatorios furos={furos}
                                        chipBoxes={chipBoxes}
                                        furoSelecionado={furoSelecionado}
                                        filtroConferencia={filtroConferenciaEnt}
                                        filtroMarcacao={filtroMarcacaoEnt}
                                        filtroFotografia={filtroFotografiaEnt}
                                        filtroDensidade={filtroDensidadeEnt}
                                        filtroSerragem={filtroSerragemEnt}
                                        filtroArquivamento={filtroArquivamentoEnt}
                                        chipBoxesInternos={chipBoxesInternos}
                                        setFuroSelecionado={setFuroSelecionado}
                                        authUser={authUser}
                                    />
                                </div>
                                :
                                <></>
                        }
                        {
                            selected === 'Impressão Etiquetas' ?
                                <PrintLabel furoSelecionado={furoSelecionado} chipBoxesInternos={chipBoxesInternos} furos={furos} whiteBoxes={whiteBoxes} paletes={paletes} />
                                :
                                <></>
                        }
                        {
                            selected === 'Importar Arquivo' ?
                                <Import />
                                :
                                <></>
                        }
                        {
                            selected === 'Dados Processamento' ?
                                <DadosProcessamento
                                    chipBoxes={chipBoxes} furoSelecionado={furoSelecionado}
                                    filtroConferencia={filtroConferencia} filtroMarcacao={filtroMarcacao}
                                    filtroFotografia={filtroFotografia} filtroDensidade={filtroDensidade}
                                    filtroSerragem={filtroSerragem} filtroArquivamento={filtroArquivamento}
                                    chipBoxesInternos={chipBoxesInternos}
                                />
                                :
                                <></>
                        }
                        {
                            selected === 'Config. Impressora' ?
                                <PrinterSettings />
                                :
                                <></>
                        }
                        {
                            selected === 'Mensagens/Avisos' ?
                                <Mensagens
                                    chipBoxes={chipBoxes}
                                    furos={furos}
                                />
                                :
                                <></>
                        }

                    </Content>
                </RenderFunctions>
            </Container>
        </main>
    );
}

const Container = styled.div({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
})
const Content = styled.div({
    flex: 1,
    width: '80%',
})
const RenderFunctions = styled.div({
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
})