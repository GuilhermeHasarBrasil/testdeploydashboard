import { useEffect, useState } from 'react';
import styled from 'styled-components'
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function PrinterSettings() {
  const [printer, setPrinter] = useState({
    ip: '',
    port: ''
  });

  useEffect(() => {
    const storedPrinter = JSON.parse(localStorage.getItem('printer'));
    if (storedPrinter) {
      setPrinter(storedPrinter);
    }
  }, []);

  async function saveConfig() {
    localStorage.setItem('printer', JSON.stringify(printer))
    setShowSucess(true)
    setTimeout(() => {
      setShowSucess(false)
    }, 1000);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPrinter((prevPrinter) => ({
      ...prevPrinter,
      [name]: value
    }));
  };

  const [config, setConfig] = useState()
  useEffect(() => {
    localStorage.getItem('printer', JSON.stringify(printer));
    console.log('Valores salvos no localStorage:', JSON.stringify(printer));
    setConfig(JSON.stringify(printer))
  }, [printer]);

  const [showSucess, setShowSucess] = useState(false)

  return (
    <div style={{ width: '80%', marginLeft: '10%', display: 'flex', flexDirection: 'column', marginTop: '3%', }} >

      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', }} >
        <h1 style={{ color: 'black', fontSize: 25, fontWeight: 'bold', marginBottom: 20 }} >Configurações da Impressora</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row' }} >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <text style={{ backgroundColor: 'white', fontSize: 25, fontWeight: 'bold', marginBottom:10 }}> IP:</text>
          <text style={{ backgroundColor: 'white', fontSize: 25, fontWeight: 'bold', }}>PORTA:</text>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft:10 }}>
          <input
            style={{ backgroundColor: 'white', fontSize: 22, fontWeight: 'bold', borderWidth: 1,marginBottom:10 ,borderColor: 'grey', borderRadius: 5, marginLeft: 5, paddingLeft:5 }}
            type="text"
            name="ip"
            value={printer.ip}
            onChange={handleInputChange}
            placeholder={config ? JSON.parse(config).ip : ''}

          />
          <input
            style={{ backgroundColor: 'white', fontSize: 22, fontWeight: 'bold', borderWidth: 1, borderColor: 'grey', borderRadius: 5, marginLeft: 5, paddingLeft:5 }}
            type="text"
            name="port"
            value={printer.port}
            placeholder={config ? JSON.parse(config).port : ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div style={{ backgroundColor: 'white', padding: 5, boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%', }} >
          <Button onClick={saveConfig} >
            <text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Salvar configurações</text>
          </Button>
          <Alert style={{ marginTop: '5%', display: showSucess ? 'flex' : 'none', width: '70%' }} icon={<CheckIcon fontSize="inherit" />} severity="success">
            Configurações salvas
          </Alert>
        </div>
      </div>

    </div>
  );
}

const Button = styled.button`
    background-color: #074F92;
    transition: opacity 0.3s;
    height: 80px;
    width: 170px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: 'white';
    &:hover {
        opacity: 0.2;
    }

`