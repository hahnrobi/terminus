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
export default {
  name: 'UserProfilePersonalDetails',
  data() {
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
	  }
  }
}
</script>