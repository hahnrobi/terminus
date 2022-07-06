import {defineStore} from 'pinia';
interface LayoutState {
    clipped: boolean,
    drawer: boolean,
    fixed: boolean,
    userMenu: boolean,
    miniVariant: boolean,
    right: boolean,
    rightDrawer: boolean,
}
export const useLayoutStore = defineStore('layout', {
    state: (): LayoutState => {
        return <LayoutState> {
        clipped: false,
        drawer: false,
        fixed: false,
        userMenu: false,
        miniVariant: false,
        right: true,
        rightDrawer: false
        };
    },
    actions: {
        updateLayoutParams(param: keyof LayoutState, value: any) {
                this[param] = value;
        }
    },
    getters: {
        state: (state) => state
    }
})