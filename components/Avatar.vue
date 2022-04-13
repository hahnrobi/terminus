<template>
  <div>
    <avataaars v-if="this.avatar" class="user-avatar" 
            :clotheType="this.avatar.clotheType"
            :accessoriesType="this.avatar.accessoriesType"
            :clotheColor="this.avatar.clotheColor"
            :eyebrowType="this.avatar.eyebrowType"
            :eyeType="this.avatar.eyeType"
            :facialHairColor="this.avatar.facialHairColor"
            :facialHairType="this.avatar.facialHairType"
            :hairColor="this.avatar.hairColor"
            :graphicType="this.avatar.graphicType"
            :mouthType="this.avatar.mouthType"
            :skinColor="this.avatar.skinColor"
            :topType="this.avatar.topType"
            :topColor="this.avatar.topColor"
              />
  </div>
</template>
<style scoped>
.user-avatar {
  width: 1rem;
}
</style>
<script>
import Avataaars from 'vuejs-avataaars'

export default {
  name: "Avatar",
  components: {
    Avataaars
  },
  props: {
    avatar: null,
    rawJson: ""
  },
  mounted() {
    if(this.rawJson && !this.avatar) {
      this.avatar = JSON.parse(this.rawJson);
    }
    console.log(this.avatar);
  }
}
</script>