import { useEffect, useState } from "react"
import { sendMessage } from "../../hooks/sendMessage"
import styled from 'styled-components'

export default function Mensagens({ chipBoxes, furos }) {
    const [filteredChipBoxesTempoProcessoConferencia, setFilteredChipBoxesTempoProcessoConferencia] = useState([]);
    const [filteredChipBoxesTempoProcessoMarcacao, setFilteredChipBoxesTempoProcessoMarcacao] = useState([]);
    const [filteredChipBoxesTempoProcessoFotografia, setFilteredChipBoxesTempoProcessoFotografia] = useState([]);
    const [filteredChipBoxesTempoProcessoGeologiaGeologica, setFilteredChipBoxesTempoProcessoGeologiaGeologica] = useState([]);
    const [filteredChipBoxesTempoProcessoGeologiaGeotecnica, setFilteredChipBoxesTempoProcessoGeologiaGeotecnica] = useState([]);
    const [filteredChipBoxesTempoProcessoGeologiaEstrutural, setFilteredChipBoxesTempoProcessoGeologiaEstrutural] = useState([]);
    const [filteredChipBoxesTempoProcessoDensidade, setFilteredChipBoxesTempoProcessoDensidade] = useState([]);
    const [filteredChipBoxesTempoProcessoSerragem, setFilteredChipBoxesTempoProcessoSerragem] = useState([]);
    const [filteredChipBoxesTempoProcessoAmostragem, setFilteredChipBoxesTempoProcessoAmostragem] = useState([]);
    const [filteredChipBoxesTempoProcessoDespacho, setFilteredChipBoxesTempoProcessoDespacho] = useState([]);
    const [filteredChipBoxesTempoProcessoArquivamento, setFilteredChipBoxesTempoProcessoArquivamento] = useState([]);
    const [processoMenssage, setProcessoMessage] = useState()
    const [mensagem, setMensagem] = useState()
    const temposOptions = [
        { value: 2, label: "2 segundos" },
        { value: 60, label: "1 minuto" },
        { value: 300, label: "5 minutos" },
        { value: 600, label: "10 minutos" },
        { value: 1800, label: "30 minutos" },
        { value: 3600, label: "1 hora" },
        { value: 7200, label: "2 horas" },
        { value: 14400, label: "4 horas" },
        { value: 28800, label: "8 horas" },
        { value: 86400, label: "1 dia" },
        { value: 172800, label: "2 dias" },
        { value: 259200, label: "3 dias" },
        { value: 345600, label: "4 dias" },
        { value: 432000, label: "5 dias" }
    ];
    const [selectedTempo, setSelectedTempo] = useState(0);
    const [label, setLabel] = useState()

    useEffect(() => {
        function getSecondsDifference(start, end) {
            return (end.seconds - start.seconds);
        }

        function createTimestamp() {
            const milliseconds = Date.now();
            const seconds = Math.floor(milliseconds / 1000);
            const nanoseconds = (milliseconds % 1000) * 1e6; // Convertendo milissegundos para nanossegundos
            return {
                seconds,
                nanoseconds,
            };
        }
        const timestamp = createTimestamp();

        const filteredItemsConferencia = chipBoxes.filter(item => {
            const conferencia = item.processos.conferencia;
            const conferenciasaida = conferencia?.sai ? conferencia?.sai : timestamp

            if (conferencia.sai && conferencia.ent) {
                const difference = getSecondsDifference(conferencia.ent, conferenciasaida);
                return difference > selectedTempo;
            }
            return false;
        });
        setFilteredChipBoxesTempoProcessoConferencia(filteredItemsConferencia);

        const filteredItemsMarcacao = chipBoxes.filter(item => {
            const marcacao = item.processos.marcacao;
            const marcacaosaida = marcacao?.sai ? marcacao?.sai : timestamp
            if (marcacaosaida && marcacao.ent) {
                const difference = getSecondsDifference(marcacao.ent, marcacaosaida);
                return difference > selectedTempo;
            }
            return false;
        });
        setFilteredChipBoxesTempoProcessoMarcacao(filteredItemsMarcacao);

        const filteredItemsFotografia = chipBoxes.filter(item => {
            const fotografia = item.processos.fotografia;
            const fotografiasaida = fotografia?.sai ? fotografia?.sai : timestamp

            if (fotografiasaida && fotografia.ent) {
                const difference = getSecondsDifference(fotografia.ent, fotografiasaida);
                return difference > selectedTempo;
            }
            return false;
        });
        setFilteredChipBoxesTempoProcessoFotografia(filteredItemsFotografia);

        const filteredItemsGeologiaGeologica = furos.filter(item => {
            const geologia = item.processos?.geologia.descGeologica;
            const geologiasaida = geologia?.sai ? geologia?.sai : timestamp

            if (geologiasaida && geologia?.ent) {
                const difference = getSecondsDifference(geologia?.ent, geologiasaida);
                return difference > selectedTempo;
            }
            return false;
        });
        setFilteredChipBoxesTempoProcessoGeologiaGeologica(filteredItemsGeologiaGeologica);

        const filteredItemsGeologiaGeotecnica = furos.filter(item => {
            const geologia = item.processos?.geologia?.descGeotecnica;
            const geologiasaida = geologia?.sai ? geologia?.sai : timestamp

            if (geologiasaida && geologia?.ent) {
                const difference = getSecondsDifference(geologia?.ent, geologiasaida);
                return difference > selectedTempo;
            }
            return false;
        });
        setFilteredChipBoxesTempoProcessoGeologiaGeotecnica(filteredItemsGeologiaGeotecnica);

        const filteredItemsGeologiaEstrutural = furos.filter(item => {
            const geologia = item.processos?.geologia?.descEstrutural;
            const geologiasaida = geologia?.sai ? geologia?.sai : timestamp

            if (geologiasaida && geologia?.ent) {
                const difference = getSecondsDifference(geologia?.ent, geologiasaida);
                return difference > selectedTempo;
            }
            return false;
        });
        setFilteredChipBoxesTempoProcessoGeologiaEstrutural(filteredItemsGeologiaEstrutural);

        const filteredItemsDensidade = furos.filter(item => {
            const densidade = item.processos?.densidade;
            const densidadesaida = densidade?.sai ? densidade?.sai : timestamp

            if (densidadesaida && densidade?.ent) {
                const difference = getSecondsDifference(densidade.ent, densidadesaida);
                return difference > selectedTempo;
            }
            return false;
        });
        setFilteredChipBoxesTempoProcessoDensidade(filteredItemsDensidade);

        const filteredItemsSerragem = furos.filter(item => {
            const serragem = item.processos?.serragem;
            const serragemsaida = serragem?.sai ? serragem?.sai : timestamp

            if (serragemsaida && serragem?.ent) {
                const difference = getSecondsDifference(serragem.ent, serragemsaida);
                return difference > selectedTempo;
            }
            return false;
        });
        setFilteredChipBoxesTempoProcessoSerragem(filteredItemsSerragem);

        const filteredItemsAmostragem = furos.filter(item => {
            const amostragem = item.processos?.amostragem;
            const amostragemsaida = amostragem?.sai ? amostragem?.sai : timestamp

            if (amostragem?.sai && amostragem?.ent) {
                const difference = getSecondsDifference(amostragem.ent, amostragemsaida);
                return difference > selectedTempo;
            }
            return false;
        });
        setFilteredChipBoxesTempoProcessoAmostragem(filteredItemsAmostragem);

        const filteredItemsDespacho = furos.filter(item => {
            const despacho = item.processos?.despacho;
            const despachosaida = despacho?.sai ? despacho?.sai : timestamp

            if (despachosaida && despacho?.ent) {
                const difference = getSecondsDifference(despacho.ent, despachosaida);
                return difference > selectedTempo;
            }
            return false;
        });
        setFilteredChipBoxesTempoProcessoDespacho(filteredItemsDespacho);

        const filteredItemsArquivamento = chipBoxes.filter(item => {
            const arquivamento = item.processos.arquivamento;
            const arquivamentosaida = arquivamento.sai ? arquivamento.sai : timestamp
            if (arquivamentosaida && arquivamento?.ent) {
                const difference = getSecondsDifference(arquivamento.ent, arquivamentosaida);
                return difference > selectedTempo? selectedTempo : 0;
            }
            return false;
        });
        setFilteredChipBoxesTempoProcessoArquivamento(filteredItemsArquivamento);

    }, [chipBoxes, furos, selectedTempo, processoMenssage]);

    const handleTempoChange = (event) => {
        const selectedOption = temposOptions.find(option => option.value === parseInt(event.target.value));
        setSelectedTempo(selectedOption.value);
        setLabel(selectedOption.label);
    };

    const [process, setProcess] = useState(null);
    const processos = [
        { 'processo': 'Conferência' },
        { 'processo': 'Marcação' },
        { 'processo': 'Fotografia' },
        { 'processo': 'Desc. Geológica' },
        { 'processo': 'Desc. Geotécnica' },
        { 'processo': 'Desc. Estrutural' },
        { 'processo': 'Densidade' },
        { 'processo': 'Serragem' },
        { 'processo': 'Amostragem' },
        { 'processo': 'Despacho' },
        { 'processo': 'Arquivamento' },

    ]

    function sett(selected) {
        setProcess(selected);
    }

    const [arrayRenderizado, setArrayRenderizado] = useState()
    useEffect(() => {
        if (process === 'Conferência') {
            setArrayRenderizado(filteredChipBoxesTempoProcessoConferencia)
        }
        if (process === 'Marcação') {
            setArrayRenderizado(filteredChipBoxesTempoProcessoMarcacao)
        }
        if (process === 'Fotografia') {
            setArrayRenderizado(filteredChipBoxesTempoProcessoFotografia)
        }
        if (process === 'Desc. Geológica') {
            setArrayRenderizado(filteredChipBoxesTempoProcessoGeologiaGeologica)
        }
        if (process === 'Desc. Geotécnica') {
            setArrayRenderizado(filteredChipBoxesTempoProcessoGeologiaGeotecnica)
        }
        if (process === 'Desc. Estrutural') {
            setArrayRenderizado(filteredChipBoxesTempoProcessoGeologiaEstrutural)
        }

        if (process === 'Densidade') {
            setArrayRenderizado(filteredChipBoxesTempoProcessoDensidade)
        }
        if (process === 'Serragem') {
            setArrayRenderizado(filteredChipBoxesTempoProcessoSerragem)
        }
        if (process === 'Despacho') {
            setArrayRenderizado(filteredChipBoxesTempoProcessoDespacho)
        }
        if (process === 'Arquivamento') {
            setArrayRenderizado(filteredChipBoxesTempoProcessoArquivamento)
        }

        setProcessoMessage(process)

    }, [process, selectedTempo, filteredChipBoxesTempoProcessoConferencia, filteredChipBoxesTempoProcessoMarcacao, filteredChipBoxesTempoProcessoFotografia, filteredChipBoxesTempoProcessoDensidade, filteredChipBoxesTempoProcessoSerragem, filteredChipBoxesTempoProcessoAmostragem])


    useEffect(() => {
        let formattedString = "Aviso:\n";
        arrayRenderizado?.forEach(item => {
            let formattedLine = `A caixa ${item.cx} do furo ${item.furo} está a mais de ${label} em ${process}\n`;
            formattedString += formattedLine;
        });
        setMensagem(formattedString)
    }, [arrayRenderizado])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
            <div style={{ display: 'flex', marginTop: '4%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '70%', marginLeft: '15%', marginRight: '15%' }} >
                <select style={{ marginTop: 20, borderRadius: 5, paddingLeft: 8, backgroundColor: '#008F83', color: 'white', width: 280, height: 50, fontSize: 21, fontWeight: 'bold' }} value={selectedTempo.value} onChange={handleTempoChange}>
                    {temposOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <Button onClick={async () => { await sendMessage(mensagem), setMensagem('') }} >
                    <text style={{ backgroundColor: '#074f92', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold', width: 280, height: 50, fontSize: 21, marginTop: 20, borderRadius: 5, }} >
                        Enviar o aviso
                    </text>
                </Button>

            </div>
            <ul style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', overflow: 'hidden', marginTop: '3%' }} >
                {processos.map((processOption, index) => (
                    <Button>
                        <li style={{ marginLeft: 10, marginRight: 0, backgroundColor: processOption.processo == process ? '#008f83' : '#c4c4c4', padding: 8, borderRadius: 10, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }} key={processOption.id}>
                            <h1 style={{ color: processOption.processo !== process ? 'black' : '#f3c108', width: 120, fontWeight: 'bold' }} onClick={() => sett(processOption.processo, index)} >
                                {processOption.processo}
                            </h1>
                        </li>
                    </Button>
                ))}
            </ul>
            <ul style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', overflow: 'hidden', marginTop: 15 }} >
                {arrayRenderizado?.map((item, index) => (
                    <li style={{ marginLeft: 30, marginRight: 0, backgroundColor: '#074f92', padding: 18, borderRadius: 10, marginTop: 5, }} key={item.id}>
                        <div style={{ display: 'flex', flexDirection: 'column', width: 250, backgroundColor: 'white', padding: 3 }} >
                            <text style={{ color: 'red', fontWeight: 'bold', fontSize: 18 }} >Aviso!</text>
                            <text style={{ fontWeight: 'bold' }} >A caixa {item.cx} do furo {item.furo} levou ou está a mais de {label} em {process}</text>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const Button = styled.button`
    transition: opacity 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        opacity: 0.2;
    }

`
const BgIcon = styled.button`
    transition: opacity 0.3s;
    height: 45px;
    width: 45px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color:'white';
    &:hover {
        opacity: 0.2;
    }

`