<template>
    <v-app-bar app flat color='green' dark>
      <v-toolbar-title>Финансирование</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="currentUser">
        Здравствуйте, {{ currentUser.username }}
        <v-divider class="mx-4" vertical></v-divider>
        <v-btn text @click.prevent="logOut">
          <v-icon>mdi-logout</v-icon> Выход
        </v-btn>
        <v-divider vertical></v-divider>
      </div>
    </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    currentUser () {
      return this.$store.state.auth.user
    }
  },

  methods: {
    logOut () {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>
