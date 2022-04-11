<template>
  <div>
    <h1>Manage your profile</h1>
    <v-tabs v-model="tab" color="basil" @change="this.handleTabChange" grow>
      <v-tab href="#personal" key="personal">Personal info</v-tab>
      <v-tab href="#avatar" key="avatar">Avatar</v-tab>
      <v-tab href="#change-password" key="change-password">Change password</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item id="personal" key="personal">
        <v-card color="basil" flat>
          <v-card-text>
            <UserProfilePersonalDetails></UserProfilePersonalDetails>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item id="avatar" key="avatar">
        <v-card color="basil" flat>
          <v-card-text>
            <UserProfileAvatarEditor></UserProfileAvatarEditor>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item id="change-password" key="change-password">
        <v-card color="basil" flat>
          <v-card-text>
            <UserProfileChangePassword></UserProfileChangePassword>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
export default {
  name: 'ProfilePage',
  data() {
    return {
      tab: '',
    }
  },
  methods: {
    handleTabChange(tab) {
      this.$router.push({hash: "#" + tab});
      return;
    }
  },
  middleware: 'auth',
  mounted() {
    this.tab = this.$route.hash.substring(1);
  }
}
</script>