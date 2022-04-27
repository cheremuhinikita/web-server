import { createServer } from "net";

const HOME_HEAD_REQUEST = 'GET / HTTP/1.1';

const handleConnection = async (socket) => {
    socket.on('error', (err) => {
        console.error(`err: ${err}`);
    });

    socket.on('data', async (chunk) => {
        const req = chunk.toString();
        const headRequest = req.split('\r\n')[0];

        if (headRequest === HOME_HEAD_REQUEST) {
            const respBody = JSON.stringify({
                msg: 'Hello world'
            })

            socket.write('HTTP/1.1 200 OK\r\n');
            socket.write(`Content-Length: ${respBody.length}\r\nContent-Type: application/json\r\n\r\n`);
            socket.write(respBody);
        } else {
            socket.write('HTTP/1.1 404 NOT FOUND\r\n');
        }

        socket.end()
    });
}

const tcpServer = createServer(handleConnection);

tcpServer.listen(8000);
