import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import styled from 'styled-components'
import { sendMessage } from './sendMessage';

export default function Messages() {

  const [mensagem, setMensagem] = useState()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10, marginTop: 150 }}>
      <text style={{ color: 'black', fontSize: 20 }} >Insira a mensagem</text>
      <input
        style={{ width: '20%', backgroundColor: 'white', fontSize: 22, fontWeight: 'bold', borderWidth: 1, marginBottom: 10, borderColor: 'grey', borderRadius: 5, marginLeft: 5, paddingLeft: 5 }}
        type="text"
        name="ip"
        value={mensagem}
        onChange={(value) => setMensagem(value.target.value)}
      />
      <Button onClick={()=>sendMessage(mensagem)} >
        <text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Enviar mensagem</text>
      </Button>
      <Alert style={{ marginTop: '5%', display: 'none', width: '70%' }} icon={<CheckIcon fontSize="inherit" />} severity="success">
        Mensagem enviada!
      </Alert>
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