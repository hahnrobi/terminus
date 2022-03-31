<template>
  <div>
    <avataaars @avatar="logAvatar"></avataaars>
  </div>
</template>

<script>
import Avataaars from 'vuejs-avataaars'

export default {
  name: "Avatar",
  components: {
    Avataaars
  },
  methods: {
    logAvatar(avatar) {
      console.log(avatar);
    }
  }
}
</script>