<template>
  <v-content>
      <v-container
        class="fill-height"
        fluid
      >
    <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Аутентификация</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <form>
                  <v-text-field
                    v-model="user.username"
                    :error-messages="emailErrors"
                    label="Логин"
                    required
                    prepend-icon="mdi-account"
                    @input="$v.user.username.$touch()"
                    @blur="$v.user.username.$touch()"
                  ></v-text-field>
                  <v-text-field
                    v-model="user.password"
                    :error-messages="passwordErrors"
                    label="Пароль"
                    prepend-icon="mdi-lock"
                    required
                    type="password"
                    @input="$v.user.password.$touch()"
                    @blur="$v.user.password.$touch()"
                  ></v-text-field>
                </form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="handleLogin" :error-messages="message" color="primary">Войти</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
           </v-container>
    </v-content>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import User from '../models/user'

export default {
  mixins: [validationMixin],
  validations: {
    user: {
      password: { required },
      username: { required }
    }
  },

  name: 'Login',
  data () {
    return {
      user: new User('', ''),
      loading: false,
      message: ''
    }
  },
  computed: {
    passwordErrors () {
      const errors = []
      if (!this.$v.user.password.$dirty) return errors
      !this.$v.user.password.required && errors.push('Введите пароль.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.user.username.$dirty) return errors
      !this.$v.user.username.required && errors.push('Введите логин')
      return errors
    },
    loggedIn () {
      return this.$store.state.auth.status.loggedIn
    }
  },
  created () {
    if (this.loggedIn) {
      this.$router.push('/')
    }
  },
  methods: {
    handleLogin () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      if (this.user.username && this.user.password) {
        this.$store.commit('loader', true)
        this.$store.dispatch('auth/login', this.user).then(
          () => {
            this.$store.commit('loader', false)
            this.$router.push('/')
          },
          error => {
            this.$store.commit('loader', false)
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString()
          }
        )
      }
    }
  }
}
</script>
