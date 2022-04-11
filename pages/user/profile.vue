<template>
  <div>
    <h1>Manage your profile</h1>
    <v-tabs v-model="tab" color="basil" grow>
      <v-tab key="personaldata">Personal info</v-tab>
      <v-tab key="avatar">Avatar</v-tab>
      <v-tab key="change-password">Change password</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item key="personaldata">
        <v-card color="basil" flat>
          <v-card-text style="height: 2000px">
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item key="avatar">
        <v-card color="basil" flat>
          <v-card-text>
            <v-progress-circular
              v-if="!this.avatarInitialized"
              indeterminate
              color="primary"
            ></v-progress-circular>
            <AvatarEditor
              v-if="this.avatarInitialized"
              :avatar="this.avatar"
              @avatar="updateAvatar"
            />
            <v-btn
              :disabled="isAvatar"
              :loading="isSubmitted"
              @click="saveAvatar()"
              color="primary"
              >Save avatar</v-btn
            >
            <v-snackbar v-model="snackbar">
              {{ responseMessage }}
              <template v-slot:action="{ attrs }">
                <v-btn
                  color="primary"
                  text
                  v-bind="attrs"
                  @click="snackbar = false"
                >
                  Close
                </v-btn>
              </template>
            </v-snackbar>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item key="change-password">
        <v-card color="basil" flat>
          <v-card-text>
              <v-text-field
                  label="Current password"
                  hide-details="auto"
                  type="password"
                  outlined
                ></v-text-field>
                <v-text-field
                  label="New password"
                  hide-details="auto"
                  type="password"
                  outlined
                ></v-text-field>
                <v-text-field
                  label="New password again"
                  hide-details="auto"
                  type="password"
                  outlined
                ></v-text-field>
                <v-btn
                  color="primary"
                >Change password</v-btn>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import { Avataaar } from '../../models/avataaar'
export default {
  name: 'ProfilePage',
  computed: {
    isAvatar() {
      return this.avatar == null
    },
  },
  data() {
    return {
      avatar: new Avataaar(),
      avatarInitialized: false,
      isSubmitted: false,
      responseMessage: '',
      snackbar: false,
      tab: '',
    }
  },
  methods: {
    updateAvatar(avatar) {
      this.avatar = avatar
    },
    async saveAvatar() {
      this.responseMessage = ''
      this.isSubmitted = true
      this.$axios
        .put('user/avatar', this.avatar)
        .then(() => {
          this.isSubmitted = false
          this.responseMessage = 'Changes saved.'
          this.snackbar = true
          this.$auth.fetchUser()
        })
        .catch((err) => {
          this.isSubmitted = false
          this.responseMessage = err
        })
    },
  },
  middleware: 'auth',
  mounted() {
    if (this.$auth.user.avatar) {
      const parsedAvatar = JSON.parse(this.$auth.user.avatar)
      Object.assign(this.avatar, parsedAvatar)
    }
    this.avatarInitialized = true
  },
}
</script>