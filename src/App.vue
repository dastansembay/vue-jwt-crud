<template>
  <v-app id="inspire">
<router-view/>
    <loader></loader>
  </v-app>
</template>

<script>
import Loader from './components/Loader'

export default {
  components: { Loader }
}
</script>
