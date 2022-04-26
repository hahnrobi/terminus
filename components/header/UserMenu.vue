<template>
  <div v-if="$auth.loggedIn">
    <v-menu
      v-model="userMenu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          <Avatar class="user-avatar" />{{ $auth.user.email }}
        </v-btn>
      </template>
      <UserMenuCard @buttonClicked="userMenu = false" />
    </v-menu>
  </div>
  <div v-else>
    <v-btn text to="/auth/login">login</v-btn>
    <v-btn text to="/auth/register">register</v-btn>
  </div>
</template>


<script>
export default {
  name: 'UserMenu',
  data() {
    return {
      userMenu: false,
    }
  },
}
</script>