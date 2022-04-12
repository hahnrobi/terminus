<template>
  <div>
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
        <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import { Avataaar } from '../../../models/avataaar'

export default {
  name: 'UserProfileAvatarEditor',
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
    }
  },
  methods: {
    updateAvatar(avatar) {
      this.avatar = avatar
    },
    async saveAvatar() {
      this.responseMessage = ''
      this.isSubmitted = true
      await this.$axios
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
  mounted() {
    if (this.$auth.user.avatar) {
      const parsedAvatar = JSON.parse(this.$auth.user.avatar)
      Object.assign(this.avatar, parsedAvatar)
    }
    this.avatarInitialized = true
  },
}
</script>