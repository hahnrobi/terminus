<template>
  <v-form v-model="valid">
    <v-text-field
      v-model="currentPassword"
      :append-icon="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="showCurrentPassword ? 'text' : 'password'"
      @click:append="showCurrentPassword = !showCurrentPassword"
      label="Current password"
      hide-details="auto"
      style="margin-bottom: 1rem"
      outlined
    ></v-text-field>
    <v-text-field
      v-model="newPassword"
      :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="showNewPassword ? 'text' : 'password'"
      hint="At least 5 characters"
      @click:append="showNewPassword = !showNewPassword"
      label="New password"
      hide-details="auto"
      style="margin-bottom: 1rem"
      outlined
    ></v-text-field>
    <v-text-field
      v-model="newPasswordRetype"
      :append-icon="showNewPasswordRetype ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="showNewPasswordRetype ? 'text' : 'password'"
      hint="At least 5 characters"
      @click:append="showNewPasswordRetype = !showNewPasswordRetype"
      label="New password again"
      style="margin-bottom: 1rem"
      hide-details="auto"
      outlined
    ></v-text-field>
    <v-btn @click="changePassword" color="primary" :disabled="isSubmitted || !valid"
      >Change password</v-btn
    >
    <v-snackbar v-model="snackbar">
      {{ responseMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-form>
</template>
<script>
export default {
  name: 'UserProfileChangePassword',
  data() {
    return {
      valid: false,
      currentPassword: '',
      newPassword: '',
      newPasswordRetype: '',
      responseMessage: '',
      snackbar: false,
      isSubmitted: false,
      showCurrentPassword: false,
      showNewPassword: false,
      ShowNewPasswordRetype: false,
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => (v && v.length >= 5) || 'Min 5 characters',
        emailMatch: () => `The email and password you entered don't match`,
      },
    }
  },
  methods: {
    async changePassword() {
      this.responseMessage = ''
      this.isSubmitted = true
      this.$axios
        .put('user/change-password', {
          currentpassword: this.currentPassword,
          newpassword: this.newPassword,
          newpassword_retype: this.newPasswordRetype,
        })
        .then(() => {
          this.isSubmitted = false
          this.responseMessage = 'Password changed.'
          this.snackbar = true;
          this.currentPassword = "";
          this.newPassword = "";
          this.newPasswordRetype = "";
        })
        .catch((err) => {
          this.snackbar = true
          this.isSubmitted = false
          this.responseMessage = err.response.data.message
        })
    },
  },
}
</script>