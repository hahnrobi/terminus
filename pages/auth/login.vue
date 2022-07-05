<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
        <v-text-field
            v-model="loginInfo.email"
            label="E-mail"
            :rules="[rules.required]"
            outlined
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="loginInfo.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-2"
            label="Visible"
            hint="At least 8 characters"
            class="input-group--focused"
            @click:append="showPassword = !showPassword"
            outlined
            required
          ></v-text-field>
        </v-col>
      </v-row>
            <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-btn text @click="login(loginInfo)" :disabled="!valid">
              Submit
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import Vue from 'vue'
export default ({
    data() {
        return {
            loginInfo: {
                email: "",
                password: ""
            },
            showPassword: false,
            rules: {
            required: (value) => !!value || 'Required.',
            min: (v) => v && v.length >= 2 || 'Min 2 characters',
            emailMatch: () => (`The email and password you entered don't match`),
            },
        };
    },
    methods: {
        login(loginInfo) {
            this.$auth.loginWith('local', {
                data: {
                    email: loginInfo.email,
                    password: loginInfo.password
                }
            })
            console.log(loginInfo);
        }
    }
})
</script>
<style lang="scss" scoped>

</style>