<template>
      <div class="hello">
    <div v-for='shell in shells' :key='shell.id'>
        <h3>Host name: </h3> {{ shell.host }}
    </div>
    <h2>Essential Links</h2>
  </div>
</template>
<script>
export default {
    name: "ShellsPage",
    data() {
        return {};
    },
    computed: {
        shells() {
            return this.$store.getters.ownedShells;
        }
    },
    mounted() {
        this.$store.dispatch("getOwnedShells");
    }

}
</script>