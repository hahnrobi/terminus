<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="layoutParams.drawer"
      :mini-variant="layoutParams.miniVariant"
      :clipped="layoutParams.clipped"
      fixed
      app
    >
      <NavigationMenu></NavigationMenu>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="layoutParams.clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="updateLayoutParams('drawer', !layoutParams.drawer)" />
      <v-btn icon @click.stop="updateLayoutParams('miniVariant', !layoutParams.miniVariant)">
        <v-icon>mdi-{{ `chevron-${layoutParams.miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="updateLayoutParams('clipped', !layoutParams.clipped)">
        <v-icon>mdi-application</v-icon>
      </v-btn>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="reconnectTerminal()">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </template>
        <span>Reconnect</span>
      </v-tooltip>

      <v-btn icon @click.stop="updateLayoutParams('fixed', !layoutParams.fixed)">
        <v-icon>mdi-minus</v-icon>
      </v-btn>

      <v-toolbar-title>{{getTerminals}}</v-toolbar-title>

      <v-spacer />
      <UserMenu></UserMenu>

      <v-btn icon @click.stop="updateLayoutParams('rightDrawer', !layoutParams.rightDrawer)">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
        <Nuxt />
    </v-main>
    <v-navigation-drawer v-model="layoutParams.rightDrawer" :right="layoutParams.right" temporary fixed>
      <v-list>
        <v-list-item @click.native="updateLayoutParams('right', !layoutParams.right)">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!layoutParams.fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

import NavigationMenu from '~/components/header/NavigationMenu.vue'
import UserMenu from '~/components/header/UserMenu.vue'
export default {
  name: 'DefaultLayout',
  components: {
    NavigationMenu,
    UserMenu
  },
  computed: {
    ...mapGetters(['getCurrentTerminal', 'getTerminals']),
   layoutParams() {
     return this.$store.getters.getLayoutParams;
   }
  },
  data() {
    return {};
  },
  methods: {
    updateLayoutParams(param, value) {
      this.layoutParams[param] = value;
      console.log(param, value);
      this.$store.commit('UPDATE_LAYOUT_PARAMS', {param: param, value: value});
    },
    reconnectTerminal() {
      console.log("RECONNECT");
      this.$store.commit("UPDATE_TERMINAL_STATE", {id: this.$route.params.id, param: 'restarting', value: true});
    }
  },
  async mounted() {
    console.log(await this.layoutParams);
  }
}
</script>
