import { io } from 'socket.io-client';
class TerminalManager {
	sockets = [];
	constructor() {
		window.onbeforeunload = function () {
			this.sockets.foreach(socket => socket.disconnect());
		};
	}
	initNewConnection() {
		const socket = io(
			"http://localhost:2222",
			{
				"path": "/socket.io",
				"forceNew": true,
				"reconnectionAttempts": 3,
				"timeout": 2000}
		);
		this.sockets.push(socket);
		console.log(this.socket);
		return socket;
	}
}
export default (context, inject) => {
	inject('terminal', new TerminalManager());

}