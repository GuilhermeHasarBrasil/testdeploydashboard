import { useState } from "react";
import styled from 'styled-components'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

export default function MenuLeft({ setSelected, selected }) {
    const [selectedItem, setSelectedItem] = useState(null);

    function sett(selected) {
        setSelected(selected)
        setSelectedItem(selected);
    }

    return (
        <MenuHamburguer>
            <div style={{ padding: 20 }}>
                <img src='/assets/logovale.png' />
            </div>
            <Content>
                <Row onClick={() => sett('Dashboard')} >
                    <ImgContainer>
                        <img src='/assets/dashboard.png' />
                    </ImgContainer>
                    <Button>
                        <TitleOption selected={selected === 'Dashboard'}>Dashboard</TitleOption>
                    </Button>
                </Row>
                <Row onClick={() => sett('Relatórios')}>
                    <ImgContainer>
                        <img src='/assets/relatorios.png' />
                    </ImgContainer>
                    <Button>
                        <TitleOption selected={selected === 'Relatórios'}>Relatórios</TitleOption>
                    </Button>
                </Row>
                <Resources>
                    <SwapHorizIcon style={{ color: 'white' }} />
                    <TitleOption>RECURSOS</TitleOption>
                </Resources>
                <Row onClick={() => sett('Impressão Etiquetas')}>
                    <ImgContainer>
                        <img src='/assets/print.png' />
                    </ImgContainer>
                    <Button>
                        <TitleOption selected={selected === 'Impressão Etiquetas'}>Impressão Etiquetas</TitleOption>
                    </Button>
                </Row>
                <Row onClick={() => sett('Importar Arquivo')}>
                    <ImgContainer>
                        <img src='/assets/addarquivo.png' />
                    </ImgContainer>
                    <Button>
                        <TitleOption selected={selected === 'Importar Arquivo'}>Importar Arquivo</TitleOption>
                    </Button>
                </Row>
                <Row onClick={() => sett('Dados Processamento')}>
                    <ImgContainer>
                        <img src='/assets/dadosprocessamento.png' />
                    </ImgContainer>
                    <Button>
                        <TitleOption selected={selected === 'Dados Processamento'}>Dados Processamento</TitleOption>
                    </Button>
                </Row>
                <Resources>
                    <SwapHorizIcon style={{ color: 'white' }} />
                    <TitleOption>CONFIGURAÇÃO</TitleOption>
                </Resources>
                <Row onClick={() => sett('Config. Impressora')}>
                    <ImgContainer>
                        <img src='/assets/configprinter.png' />
                    </ImgContainer>
                    <Button>
                        <TitleOption selected={selected === 'Config. Impressora'}>Config. Impressora</TitleOption>
                    </Button>
                </Row>
                <Row onClick={() => sett('Parâmetros')}>
                    <ImgContainer>
                        <img src='/assets/params.png' />
                    </ImgContainer>
                    <Button>
                        <TitleOption selected={selected === 'Parâmetros'}>Parâmetros</TitleOption>
                    </Button>
                </Row>
                <Resources>
                    <SwapHorizIcon style={{ color: 'white' }} />
                    <TitleOption>ADMINISTRAÇÃO</TitleOption>
                </Resources>
                <Row onClick={() => sett('Usuário')}>
                    <ImgContainer>
                        <img src='/assets/user.png' />
                    </ImgContainer>
                    <Button>
                        <TitleOption selected={selected === 'Usuário'}>Usuário</TitleOption>
                    </Button>
                </Row>
                <Row onClick={() => sett('Mensagens/Avisos')}>
                    <ImgContainer>
                        <img src='/assets/avisos.png' />
                    </ImgContainer>
                    <Button>
                        <TitleOption selected={selected === 'Mensagens/Avisos'}>Mensagens/Avisos</TitleOption>
                    </Button>
                </Row>
            </Content>
        </MenuHamburguer>
    )
}

const MenuHamburguer = styled.div({
    height: '100%',
    width: '15%',
    backgroundColor: 'black',
})

const Content = styled.div({
    display: 'flex',
    flexDirection: 'column',
    marginTop: 2
})

const ImgContainer = styled.div({
    width: 35,
    height: 35,
    padding: 4
})

const TitleOption = styled.text`
    color: ${props => (props.selected ? '#3699FF' : 'white')};
    font-size: 16px;
    margin-left: 8px;
    font-weight: 500;
    letter-spacing: 0.3px;
    transition: opacity 0.3s;

    &:hover {
        opacity: 0.7;
    }
`;

const Row = styled.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginTop: 12
})

const Resources = styled.div({
    backgroundColor: '#6D6262',
    width: '100%',
    height: 40,
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
})

const Button = styled.button`
    transition: opacity 0.3s;
    align-items: center;
    justify-content: center;
    &:hover {
        opacity: 0.2;
    }

`