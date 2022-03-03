<template>
    <client-only><Terminal /></client-only>
</template>
<script>
export default {
    layout: 'terminal',
    components: {
    Terminal: () => {if(process.client){return import('../components/Terminal.vue')}},
  },
}
</script>