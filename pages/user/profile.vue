<template>
    <div>
    <AvatarEditor @avatar="updateAvatar" />
    {{responseMessage}}
    <v-btn :disabled="isAvatar" :loading="isSubmitted" @click="saveAvatar()" color="primary">Save avatar</v-btn>
    </div>
</template>
<script>
export default {
  name: "ProfilePage",
  computed: {
      isAvatar() {
          return this.avatar == null;
      }
  },
  data() {
      return {
          avatar: null,
          isSubmitted: false,
          responseMessage: ""
      }
  },
  methods: {
    updateAvatar(avatar) {
      this.avatar = avatar;
    },
    async saveAvatar() {
        this.responseMessage = "";
        this.isSubmitted = true;
        this.$axios.put("user/avatar", this.avatar).then(() => {
          this.isSubmitted = false;
          this.responseMessage = "Changes saved."
          this.$auth.fetchUser();
        }).catch((err) => {this.isSubmitted = false; this.responseMessage = err});
    }
  }
}
</script>