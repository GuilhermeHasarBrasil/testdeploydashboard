import styled from 'styled-components'

export default function TopDashboard({ finalizados, conferidos, furos }) {

    return (
        <div style={{ display: 'flex', flexDirection: 'row', marginLeft:10, marginTop:10, }} >
            <Row>
                <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: '#206F0D', width: 70, height: 70 }} >
                    <img src="/assets/images/furoimg.png" />
                </div>
                <div style={{ backgroundColor: '#2FAB10', height: 70, width: 400 }} >
                    <Column>
                        <TitleBox>FUROS PROCESSADOS</TitleBox>
                        <Number>{finalizados}</Number>
                    </Column>
                </div>
            </Row>
            <Row>
                <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: '#2760BB', width: 70, height: 70 }} >
                    <img src="/assets/images/furoimg.png" />
                </div>
                <div style={{ backgroundColor: '#307BF4', height: 70, width: 400 }} >
                    <Column>
                        <TitleBox>FUROS NÃO PROCESSADOS</TitleBox>
                        <Number>{furos.length - conferidos}</Number>
                    </Column>
                </div>
            </Row>
            <Row>
                <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: '#996501', width: 70, height: 70 }} >
                    <img src="/assets/images/furoimg.png" />
                </div>
                <div style={{ backgroundColor: '#E89E0E', height: 70, width: 400 }} >
                    <Column>
                        <TitleBox>FUROS EM PROCESSAMENTO</TitleBox>
                        <Number>{ conferidos - finalizados }</Number>
                    </Column>
                </div>
            </Row>
        </div>


    )
}
const Row = styled.div({
    display: 'flex',
    flexDirection: 'row', marginLeft:25, marginRight:25
})
const Column = styled.div({
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 15
})
const TitleBox = styled.text({
    color: 'white',
    fontSize: 17,
    fontWeight: '600'
})
const Number = styled.text({
    fontSize: 35,
    color: 'white',
    fontWeight: 'bold'
})

