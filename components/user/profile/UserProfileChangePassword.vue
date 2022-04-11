<template>
  <div>
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
    <v-btn color="primary">Change password</v-btn>
  </div>
</template>
<script>
export default {
  name: 'UserProfileChangePassword',
  //TODO: logic.
}
</script>