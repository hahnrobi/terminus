<template>
    <AvatarEditor @avatar="logAvatar" />
</template>
<script>
export default {
  name: "ProfilePage",
  methods: {
    logAvatar(avatar) {
      console.log(avatar);
    }
  }
}
</script>