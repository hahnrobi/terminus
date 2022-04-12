<template>
  <div>
    <v-text-field
    v-model="currentPassword"
      label="Current password"
      hide-details="auto"
      type="password"
      outlined
    ></v-text-field>
    <v-text-field
    v-model="newPassword"
      label="New password"
      hide-details="auto"
      type="password"
      outlined
    ></v-text-field>
    <v-text-field
    v-model="newPasswordRetype"
      label="New password again"
      hide-details="auto"
      type="password"
      outlined
    ></v-text-field>
    <v-btn @click="changePassword" color="primary" :disabled="isSubmitted">Change password</v-btn>
        <v-snackbar v-model="snackbar">
      {{ responseMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  name: 'UserProfileChangePassword',
  data() {
    return {
    currentPassword: "",
    newPassword: "",
    newPasswordRetype: "",
    responseMessage: "",
    snackbar: false,
    isSubmitted: false
    };
  },
  methods: {
      async changePassword() {
      this.responseMessage = ''
      this.isSubmitted = true
      this.$axios
        .put('user/change-password', {currentpassword: this.currentPassword, newpassword: this.newPassword, newpassword_retype: this.newPasswordRetype})
        .then(() => {
          this.isSubmitted = false
          this.responseMessage = 'Password changed.'
          this.snackbar = true
        })
        .catch((err) => {
          this.snackbar = true
          this.isSubmitted = false
          this.responseMessage = err.response.data.message;
        })
    },
  }
}
</script>