import { createServer } from "net";

const HOME_REQUEST_HEAD = "GET / HTTP/1.1";

const handleConnection = (socket) => {
    socket.on("error", (err) => {
        console.error(`err: ${err}`);
    });

    socket.on("data", async (chunk) => {
        const req = chunk.toString();
        const reqHead = req.split("\r\n")[0];

        if (reqHead === HOME_REQUEST_HEAD) {
            const respBody = JSON.stringify({
                msg: "Hello world",
            });

            socket.write("HTTP/1.1 200 OK\r\n");
            socket.write(
                `Content-Length: ${respBody.length}\r\nContent-Type: application/json\r\n\r\n`
            );
            socket.write(respBody);
        } else {
            socket.write("HTTP/1.1 404 NOT FOUND\r\n");
        }

        socket.end();
    });
};

const tcpServer = createServer(handleConnection);

tcpServer.listen(8000);
