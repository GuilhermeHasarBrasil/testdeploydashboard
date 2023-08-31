import net from 'net';

export const printZpl = async (zpl: string | Uint8Array, config: any) => {
  const IP = config.ip;
  const PORT = config.port;
  const socket = new net.Socket();

  return new Promise<void>((resolve, reject) => {
    socket.connect(PORT, IP, () => {
      socket.write(zpl);
      socket.end();
      resolve();
    });

    socket.on('error', (error) => {
      reject(error);
    });
  });
};
