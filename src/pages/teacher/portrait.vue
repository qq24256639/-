<template>
  <page-module>
    <div>{{ teacherDetail }}</div>
  </page-module>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
  	computed: {
      ...mapGetters([
      	'teacherDetail'
      ])
    }
  }

</script>
<style>

</style>
