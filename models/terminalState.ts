export class TerminalState {
	public id:string;
	public restarting: boolean = false;
	public initializing: boolean = false;
	public connecting: boolean = false;
	public isError: boolean = false;
	public errorText: string = "";
	public host: string = "";
	public port: number = 22;
	public user: string = "";
	constructor(id: string) {
		this.id = id;
	}
}