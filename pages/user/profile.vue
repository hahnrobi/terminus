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
          <v-card-text>
            <UserProfilePersonalDetails></UserProfilePersonalDetails>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item key="avatar">
        <v-card color="basil" flat>
          <v-card-text>
            <UserProfileAvatarEditor></UserProfileAvatarEditor>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item key="change-password">
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
  middleware: 'auth',
}
</script>