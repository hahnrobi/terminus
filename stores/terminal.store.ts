import { defineStore } from "pinia";
import { TerminalState } from "~/models/terminalState";


interface TerminalStoreState {
    currentTerminal: string,
    terminals:{
    id:string;
	restarting: boolean
	disconnected: boolean
	initializing: boolean
	connecting: boolean
	isError: boolean
	errorText: string
	host: string
	port: number
	user: string
    }[]
}
interface TerminalStateUpdate {
    id: string,
    param: keyof typeof TerminalState,
    value: any
}

export const useTerminalStore = defineStore('terminals', {
    state: (): TerminalStoreState => ({
        currentTerminal: "",
        terminals: []
      }),
    getters: {
        getTerminal: (state) => (id: string) => state.terminals.filter(term => term.id = id),
        getCurrentTerminal: (state) => state.terminals.find(term => term.id = state.currentTerminal),
    },
    actions: {
        addTerminal(terminal: TerminalState) {
            this.terminals.push(terminal);
        },
        updateTerminal({id, param, value}: TerminalStateUpdate) {
            const term = this.terminals.find(x => x.id == id);
            if(term && Object.keys(term).includes(param)) {
                term[param] = value;
            }
            //if(Object.keys(term).includes(param)){
              //  term[param] = value;
            //}
        },
        setCurrentTerminal(terminalId: string) {
            this.currentTerminal = terminalId;
        },
        removeTerminal(terminalId: string) {
            this.terminals = this.terminals.filter(_term => _term.id != terminalId);
        }
}
})