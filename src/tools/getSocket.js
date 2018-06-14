import socketClient from 'socket.io-client'

const socket = socketClient("https://localhost:3002");
// const socket = socketClient("https://www.geekliubo.com:3001");

export default socket