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
    <v-divider></v-divider>
    <v-tooltip right v-for="item in userShells" :key="item._id">
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
export default {
  name: 'NavigationMenu',
  computed: {
    userShells() {
      return this.$store.getters.ownedShells
    },

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
    mounted() {
    if (this.$auth.user) {
      this.items.push({
        icon: 'mdi-console-line',
        title: 'Shells',
        to: '/manage/shells',
      })
      this.$store.dispatch('getOwnedShells')
    }
  }
}
</script>