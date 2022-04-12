<template>
  <div class="user-shell-list">
    <h2>Your shell connections</h2>
    <div class="button-row">
      <v-btn depressed color="green" to="shells/new"
        ><v-icon dark>mdi-plus</v-icon>Add new
      </v-btn>
    </div>
    <v-card v-if="shells.length === 0">
      <v-card-text class="no-shells-message">
        <v-icon class="no-shell-icon"> mdi-console-network </v-icon>
        <p>
          It looks like you don't have any shells added to your account yet. Why
          not add one right now?
        </p>
        <v-btn depressed color="green" to="shells/new"
          ><v-icon dark>mdi-plus</v-icon>Add new
        </v-btn>
      </v-card-text>
    </v-card>
    <v-card
      v-for="shell in shells"
      :key="shell.id"
      outlined
      style="margin-bottom: 1rem"
    >
      <v-card-title>{{ shell.name }}</v-card-title>
      <v-card-subtitle
        >{{ shell.host
        }}<span v-if="shell.port">:{{ shell.port }}</span></v-card-subtitle
      >
      <v-card-text>
        <div v-if="shell.username">Username: {{ shell.username }}</div>
        <div v-if="shell.username">
          Authentication:
          <v-chip v-if="shell.password" color="blue" label outlined
            ><v-icon>mdi-lock</v-icon> Password</v-chip
          ><v-chip v-if="shell.privatekey" color="green" label outlined
            ><v-icon>mdi-key</v-icon> Private key</v-chip
          >
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="green" text v-bind:to="`/terminal/` + shell._id">
          <v-icon> mdi-connection </v-icon>
          Connect
        </v-btn>
        <v-btn text v-bind:to="`/manage/shells/` + shell._id"> Edit </v-btn>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="red"
              v-bind="attrs"
              v-on="on"
              @click="removeShell(shell._id)"
            >
              <v-icon> mdi-trash-can </v-icon>
            </v-btn>
          </template>
          <span>Delete</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </div>
</template>
<style lang="scss" scoped>
.button-row {
  display: flex;
  flex-direction: row;
  margin: 0.5rem 0;
}
.no-shells-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .no-shell-icon {
    display: block;
    padding-bottom: 2rem;
    font-size: 5rem;
  }
}
</style>
<script>
export default {
  name: 'ShellsPage',
  data() {
    return {}
  },
  computed: {
    shells() {
      return this.$store.getters.ownedShells
    },
  },
  methods: {
    removeShell(id) {
      this.$axios.delete('/shell/' + id).then(() => {
        this.$store.dispatch('getOwnedShells')
      })
    },
  },
  mounted() {
    this.$store.dispatch('getOwnedShells')
  },
}
</script>