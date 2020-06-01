<template>
  <v-app id="inspire">
<router-view/>
    <loader></loader>
     <v-snackbar
                v-model="$store.state.snackbar"
                :timeout="2000"
              >
                {{ 'Произошла ошибка: '+ $store.state.snackmessage }}
                <v-btn
                  color="blue"
                  text
                  @click="snackbar = false"
                >
                  Закрыть
                </v-btn>
              </v-snackbar>
  </v-app>
</template>

<script>
import Loader from './components/Loader'

export default {
  components: { Loader }
}
</script>
