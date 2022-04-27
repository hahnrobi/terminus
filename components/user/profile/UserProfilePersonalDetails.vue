<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="user.name"
            label="Name"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="user.email"
            label="E-mail"
            disabled
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols=12>
            <v-select
              v-model="selectedTerminalTheme"
              :items="availableThemes"
              label="Terminal theme"
              item-text="title"
              item-value="name"
              outlined
              solo
              ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn color="primary" :disabled="isSubmitted" @click="saveData()">Save details</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" :color="isResponseError ? 'red accent-2' : ''">
      {{ responseMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn :color="isResponseError ? 'white' : 'primary'" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-form>
</template>
<script>
import { themes } from '~/assets/terminal-themes';

export default {
  name: 'UserProfilePersonalDetails',
  computed: {
    availableThemes() {
      return [
        {"name": null, "title": "Default"},
        ...themes
      ];
    },
    selectedTerminalTheme: {
      get() {
        return this.user?.terminalTheme ? this.user.terminalTheme : null;
      },
      set(value) {
        if(this.user.terminalTheme && value === null) {
          this.user.terminalTheme = "";  
        }else {
          this.user.terminalTheme = value;
        }
      }
    }
  },
  data() {
    console.log(JSON.parse(JSON.stringify(this.$auth.user)));
	  return {
		  responseMessage: "",
		  isSubmitted: false,
		  snackbar: false,
		  isResponseError: false,
		  user: JSON.parse(JSON.stringify(this.$auth.user))
	  }
  },
  methods: {
	  async saveData() {
      this.responseMessage = ''
      this.isSubmitted = true
	  this.isResponseError = false;
      this.$axios
        .put('user', this.user)
        .then(() => {
          this.isSubmitted = false
          this.responseMessage = 'Changes saved.'
          this.snackbar = true;
          this.$auth.fetchUser();
        })
        .catch((err) => {
          this.isSubmitted = false;
		  this.isResponseError = true;
          this.responseMessage = err.response.data.message;
          this.snackbar = true;
        })
	  },
    
  }
}
</script>