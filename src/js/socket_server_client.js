var client = new WebSocket("ws://localhost:8080");

    client.onopen = function (socket) {
        console.log('client connected, listening...');
        
    }
    // client.on('ready', function (socket) {
    //     process.stdin.on('readable', () => {
    //         let chunk;
    //         while ((chunk = process.stdin.read()) !== null) {
    //             this.send(chunk);
    //         }
    //     });
    //     process.stdin.on('end', () => {
    //         process.stdout.send('end');
    //     });
    // });

    client.onmessage = function (data) {
        console.log('Server return data: ' + data);
        if (data.toString() === 'Will you connect to chat?[y/n]') {

        }
    }asdfd





    client.onclose = function () {
        console.log('Client socket disconnect. ');
        process.exit();
    }

    client.onerror = function (err) {
        console.error(JSON.stringify(err));
    }
