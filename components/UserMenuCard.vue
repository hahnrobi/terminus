<template>
  <v-card>
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <Avatar :avatar="userAvatar" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ $auth.user.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ $auth.user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <v-list-item>
        <v-list-item-action>
          <v-select
            v-model="selectedTerminalTheme"
            :items="availableThemes"
            label="Terminal theme"
            item-text="title"
            item-value="name"
            :disabed="terminalThemeChangeSubmitted"
            outlined
          ></v-select>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        text
        @click="
          $emit('buttonClicked')
          $router.push({ path: '/user/profile' })
        "
      >
        Account
      </v-btn>
      <v-btn
        color="error"
        text
        @click="
          $emit('buttonClicked')
          $auth.logout()
        "
      >
        Log out
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { themes } from '~/assets/terminal-themes'
export default {
  name: 'UserMenuCard',
  data() {
    return {
      _terminalTheme: this.$auth.user.terminalTheme,
      terminalThemeChangeSubmitted: false,
    }
  },
  mounted() {
  },
  computed: {
    userAvatar() {
      if (this.$auth.user.avatar) {
        return JSON.parse(this.$auth.user.avatar)
      }
      return undefined
    },
    availableThemes() {
      return [{ name: null, title: 'Default' }, ...themes]
    },
    selectedTerminalTheme: {
      get() {
        return this.$data._terminalTheme ? this.$data._terminalTheme : null
      },
      set(value) {
        if (this.$data._terminalTheme && value === null) {
          this.$data._terminalTheme = ''
        } else {
          this.$data._terminalTheme = value
        }

        this.updateTerminalTheme();
      },
    },
  },
  methods: {
    async updateTerminalTheme() {
      this.terminalThemeChangeSubmitted = true
      this.$axios
        .put('user', {terminalTheme: this.$data._terminalTheme})
        .then(() => {
          this.terminalThemeChangeSubmitted = false
          this.$auth.fetchUser()
        })
        .catch((err) => {
          this.terminalThemeChangeSubmitted = false
        })
    },
  },
}
</script>