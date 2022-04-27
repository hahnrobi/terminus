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
              v-model="selectedTheme"
              :items="availableThemes"
              label="Terminal theme"
              item-text="title"
              item-value="name"
              solo
              ></v-select>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text
            @click="$emit('buttonClicked'); $router.push({path: '/user/profile'})"
          >
            Account
          </v-btn>
          <v-btn
            color="error"
            text
            @click="$emit('buttonClicked'); $auth.logout()"
          >
            Log out
          </v-btn>
        </v-card-actions>
      </v-card>
</template>
<script>
import { themes } from '~/assets/terminal-themes';
export default {
    name: "UserMenuCard",
    mounted() {
      console.log(this.availableThemes);
    },
    computed: {
    userAvatar() {
      if(this.$auth.user.avatar) {
        return JSON.parse(this.$auth.user.avatar);
      }
      return undefined;
    },
    availableThemes() {
      return themes;
    },
    selectedTheme: {
    get () {
      return this.$store.getters.getTerminalTheme;
    },
    set (value) {
       this.$store.commit('SET_TERMINAL_THEME', value);
    }
  }
  },
}
</script>