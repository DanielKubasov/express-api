import ws from 'ws';

export function wssHandler(socket: ws) {
    console.log('User connected to a socket.');

    socket.on('message', (msg: Buffer) => {
        console.log('The message: ', msg.toString());
    });

    socket.on('close', () => {
        console.log('User disconnected.');
    });
}
