<template>
    <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <Avatar style="width: 100%"/>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Username</v-list-item-title>
              <v-list-item-subtitle>example@example.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-switch
                v-model="message"
                color="purple"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-title>Enable messages</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-switch
                v-model="hints"
                color="purple"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-title>Enable hints</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text
            @click="$emit('buttonClicked')"
          >
            Account
          </v-btn>
          <v-btn
            color="error"
            text
            @click="$emit('buttonClicked'); $auth.logout()"
          >
            Log out
          </v-btn>
        </v-card-actions>
      </v-card>
</template>
<script>
export default {
    name: "UserMenuCard"
}
</script>