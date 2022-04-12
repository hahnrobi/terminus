<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-for="item in userShells" :key="item._id" :to='/shells/+item._id' router exact>
          <v-list-item-action>
            <v-badge icon="mdi-connection" color="green" overlap>
              <v-icon>mdi-console</v-icon>
            </v-badge>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.name" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-application</v-icon>
          </v-btn>
        </template>
        <span>Tooltip</span>
      </v-tooltip>

      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title" />

      <v-spacer />

      <div v-if="$auth.loggedIn">
        <v-menu
          v-model="userMenu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-x
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              <Avatar :avatar="userAvatar" />
              {{ $auth.user.name }}
            </v-btn>
          </template>
          <UserMenuCard @buttonClicked="userMenu = false" />
        </v-menu>
      </div>
      <div v-else>
        <v-btn text to="/auth/login">login</v-btn>
        <v-btn text to="/auth/register">register</v-btn>
      </div>

      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Avataaars from 'vuejs-avataaars'
export default {
  name: 'DefaultLayout',
  components: {
    Avataaars,
  },
  computed: {
    userAvatar() {
      if (this.$auth.user.avatar) {
        return JSON.parse(this.$auth.user.avatar)
      }
      return undefined
    },
    userShells() {
      return this.$store.getters.ownedShells
    },
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      userMenu: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
        {
          icon: 'mdi-battery',
          title: 'Teszt oldal',
          to: '/test',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  mounted() {
    if (this.$auth.user) {
      this.items.push({
        icon: 'mdi-console-line',
        title: 'Shells',
        to: '/manage/shells',
      })
      this.$store.dispatch('getOwnedShells')
    }
  },
}
</script>
<style lang="scss" scoped>
.user-avatar {
  width: 32px;
  margin-right: 1rem;
}
</style>