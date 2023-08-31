import styled from 'styled-components'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { LogOutSharp, BarChartSharp, ArrowBackCircleSharp, ArrowForwardCircleSharp, CloseCircleSharp, CheckmarkCircleSharp } from 'react-ionicons'

export default function Header({ onClick, authUser }) {

    return (
        <Cont>
            <h1 style={{ color: 'white', marginLeft: 10 }} >Bem-vindo(a), {authUser.email}</h1>
            <Title>
                <BarChartSharp
                    color={'#fff'}
                    title={'iconapp'}
                    height="32px"
                    width="32px"
                />
                <h1 style={{ color: 'white', fontSize: 30, marginLeft: 10, marginRight: 200 }} >
                    HSD - HASAR Sample Data
                </h1>
            </Title>
            <ButtonIcon>
                <LogOutSharp
                    color={'#ffff'}
                    title={'deslogar'}
                    height="40px"
                    width="40px"
                    onClick={onClick}
                />
            </ButtonIcon>
        </Cont>
    )
}
const Title = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: row;
    padding-right:20;
`
const Cont = styled.div({
    width: '100%',
    height: 45,
    backgroundColor: '#074F92',
    display: 'flex', flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
})
const ButtonIcon = styled.button`
    background-color: #074F92;
    transition: opacity 0.3s;
    height: 45px;
    width: 45px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    &:hover {
        opacity: 0.2;
    }
`;