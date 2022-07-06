import { defineStore } from "pinia";

interface ShellsState {
    ownedShells: any[],
    $nuxt: any
}

export const useShellStore = defineStore('shells', {
    state: ():ShellsState => {
        return {
            ownedShells: [],
            $nuxt: undefined
        }
    },
    getters: {
        getOwnedShells: (state) => state.ownedShells,
        getOwnedShell: (state) => (shellId: string) => state.ownedShells.filter(_id => _id === shellId)
        //getOwnedShell: (state, shellId: string) => this.ownedShells.filter(_id === shellId)
    },
    actions: {
        async getOwnedShells() {
            if(this.$nuxt.$auth.$storage.getState('loggedIn')) {
            await this.$nuxt.$axios.get("/shell")
                .then((res:any) => {
                    this.ownedShells =  res.data;
                })
            }else {
               this.ownedShells = [];
            }
        },
}
})