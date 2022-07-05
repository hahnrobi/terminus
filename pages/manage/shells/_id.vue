<template>
  <v-form v-model="valid">
    <v-progress-linear
      v-if="$fetchState.pending"
      indeterminate
    ></v-progress-linear>
    <v-container>
      <v-card outlined>
        <v-card-title>Basic info</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="shellObject.name"
            :rules="nameRules"
            label="Name"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="shellObject.host"
            :rules="hostnameRules"
            label="Hostname"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="shellObject.port"
            outlined
            required
            min="20"
            max="65535"
            label="Port"
            type="number"
          />
        </v-card-text>
      </v-card>
      <v-card outlined style="margin-top: 1rem">
        <v-card-title>Authentication details</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="shellObject.username"
            :rules="usernameRules"
            label="Username"
            outlined
            required
          ></v-text-field>
          <v-select
            v-model="shellObject.auth_type"
            :items="authentication_types"
            item-text="label"
            item-value="value"
            filled
            outlined
            label="Authentication type"
          ></v-select>
          <v-text-field
            v-if="shellObject.auth_type === 'password'"
            v-model="shellObject.password"
            :rules="passwordRules"
            label="Password"
            type="password"
            outlined
            required
          ></v-text-field>
          <v-file-input
            v-if="shellObject.auth_type === 'private_key'"
            v-model="private_key_file"
            label="Private key file"
            outlined
            dense
          ></v-file-input>
        </v-card-text>
      </v-card>
      <v-btn
        depressed
        color="primary"
        style="margin-top: 1rem"
        @click="sendForm()"
      >
        <v-progress-circular
          v-if="formSubmitted"
          :size="20"
          indeterminate
          style="margin-right: 1rem"
        ></v-progress-circular
        >Save</v-btn
      >
    </v-container>
  </v-form>
</template>
<script lang="typescript">
import { ShellModel } from '../../../models/shell'
export default {
  name: 'SingleShellMaganePage',
  data() {
    return {
      formSubmitted: false,
      shellObject: {},
      authentication_types: [
        {
          label: 'None',
          value: null,
        },
        {
          label: 'Password',
          value: 'password',
        },
        {
          label: 'Private key',
          value: 'private_key',
        },
      ],
    }
  },
  computed: {},
  async fetch() {
    await this.$axios
      .get('/shell/' + this.$route.params.id)
      .then((res) => {
        if (res.data) {
          this.shellObject = new ShellModel(res.data)
        }
      })
      .catch((reason) => (this.shellObject = new ShellModel(undefined)))
  },
  fetchOnServer: false,
  methods: {
    sendForm: function () {
      this.$data.formSubmitted = true;
      this.shellObject.validate();
      console.log(this.shellObject);
      if(this.shellObject.id) {
        this.$axios.put("/shell/" + this.shellObject.id, this.shellObject).then(() => {
          this.formSubmitted = false;
        });
      }else {
        this.$axios.post("/shell", this.shellObject).then(() => {
          this.formSubmitted = false;
        });
      }
      this.$store.dispatch('getOwnedShells');
    },
  },
}
</script>