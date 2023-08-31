import { printZpl } from "../../impressao/printModule";

const imprimirHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { zpl } = req.body;
    const { config } = req.body;

    try {
      await printZpl(zpl, config);
      res.status(200).json({ message: 'ZPL enviado com sucesso' });
    } catch (error) {
      console.error('Erro ao imprimir:', error);
      res.status(500).json({ error: 'Erro ao imprimir' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
};

export default imprimirHandler;
