<template>
  <v-app id="inspire">
      <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <router-view/>
      </v-container>
    </v-content>
    <loader></loader>
  </v-app>
</template>

<script>
import Loader from './components/Loader'

export default {
  components: { Loader }
}
</script>
