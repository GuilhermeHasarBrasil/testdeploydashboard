export async function sendMessage(message) {
    try {
        const response = await fetch('/api/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });
        const data = await response.json();
        console.log('Resposta da API:', data);
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }
}