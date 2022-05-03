<template>
  <v-list>
    <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
      <v-list-item-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title v-text="item.title" />
      </v-list-item-content>
    </v-list-item>
    <v-list-item to="/manage/shells" v-if="this.$auth.user" router exact>
      <v-list-item-action>
        <v-icon>mdi-console-line</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title >Shells</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-tooltip right v-for="item in ownedShells" :key="item._id">
      <template v-slot:activator="{ on, attrs }">
        <v-list-item
          :to="/shells/ + item._id"
          v-bind="attrs"
          v-on="on"
          router
          exact
        >
          <v-list-item-action>
            <v-badge icon="mdi-connection" color="green" overlap>
              <v-icon>mdi-console</v-icon>
            </v-badge>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.name" />
          </v-list-item-content>
        </v-list-item>
      </template>
      <span
        ><b>{{ item.name }}</b
        ><br />{{ item.host }}:{{ item.port }}<br />User:
        {{ item.username }}</span
      >
    </v-tooltip>
  </v-list>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NavigationMenu',
  computed: {
    ...mapGetters(['ownedShells'])
  },
  data() {
    return {
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
    }
  },
  methods: {
    checkUserItems() {
        this.$store.dispatch('getOwnedShells');
      }
    },
  mounted() {
    this.checkUserItems()
    console.log(this.$auth.$storage)
    this.$auth.$storage.watchState('loggedIn', () => {
      this.checkUserItems()
    })
    this.$auth.$storage.watchState('loggedOut', () => {
      this.checkUserItems()
    })
  },
}
</script>