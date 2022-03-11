<template>
  <v-form v-model="valid">
    <v-container>
      <v-card outlined>
        <v-card-title>Basic info</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Name"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="hostname"
            :rules="hostnameRules"
            label="Hostname"
            outlined
            required
          ></v-text-field>
        </v-card-text>
      </v-card>
      <v-card outlined style="margin-top: 1rem">
        <v-card-title>Authentication details</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            label="Username"
            outlined
            required
          ></v-text-field>
          <v-select
            :items="authentication_types"
            filled
            outlined
            label="Authentication type"
          ></v-select>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            outlined
            required
          ></v-text-field>
          <v-file-input label="Private key file" outlined dense></v-file-input>
        </v-card-text>
      </v-card>
      <v-btn depressed color="primary" style="margin-top: 1rem"> <v-progress-circular
      :size="20"
      indeterminate
      style="margin-right: 1rem"
    ></v-progress-circular>Save</v-btn>
    </v-container>
  </v-form>
</template>
<script>
export default {
  name: 'SingleShellMaganePage',
  data() {
    return {
        authentication_types: ['None', 'Password', 'Private key'],
    }
  },
  computed: {},
}
</script>