import socketClient from 'socket.io-client'

const socket = socketClient("http://localhost:3001");
// const socket = socketClient("https://www.geekliubo.com:3001");

export default socket
