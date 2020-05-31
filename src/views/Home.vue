<template>
 <v-content>
    <v-container>
      <appHeader></appHeader>
    <v-data-table
      :headers="headers"
      :items="this.$store.state.financeRequests.items"
      sort-by="calories"
      class="elevation-1"
      no-data-text="Нет данных"
      hide-default-footer
    >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Мои заявки</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Новая заявка</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.purpose" :label="headers[1].text"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field type="number" v-model.number="editedItem.monthCount" :label="headers[2].text"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field type="number" v-model.number="editedItem.interestRate" :label="headers[3].text"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field type="number" v-model.number="editedItem.amount" :label="headers[4].text"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Отменить</v-btn>
              <v-btn color="green darken-1" text @click="save">Сохранить</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
  </v-container>
    </v-content>
</template>

<script>
import appHeader from '../components/Header'

export default {
  components: {
    appHeader
  },
  data: () => ({
    dialog: false,
    page: 1,
    pageCount: 0,
    itemsPerPage: 15,
    headers: [
      {
        text: 'Номер заявки',
        align: 'start',
        sortable: false,
        value: 'publicNumber'
      },
      { text: 'Цель', value: 'purpose' },
      { text: 'Срок (месяцев)', value: 'monthCount' },
      { text: 'Процентная ставка', value: 'interestRate' },
      { text: 'Сумма', value: 'amount' },
      { text: 'Действия', value: 'actions', sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      id: null,
      publicNumber: '',
      purpose: '',
      monthCount: 0,
      interestRate: 0,
      amount: 0
    },
    defaultItem: {
      id: null,
      publicNumber: '',
      purpose: '',
      monthCount: 0,
      interestRate: 0,
      amount: 0
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Новая заявка' : 'Редактировать заявку'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.$store.commit('loader', true)
      this.$store.dispatch('financeRequests/fetchItems').then(() => this.$store.commit('loader', false))
    },

    editItem (item) {
      this.editedIndex = this.$store.state.financeRequests.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      var confirmation = confirm('Вы уверены, что хотите удалить этот элемент?')
      if (confirmation) {
        this.$store.commit('loader', true)
        this.$store.dispatch('financeRequests/deleteItem', item).then(
          () => {
            this.$store.commit('loader', false)
          }
        )
      }
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      this.$store.commit('loader', true)
      this.$store.dispatch('financeRequests/postItem', this.editedItem).then(
        () => {
          this.$store.commit('loader', false)
        }
      )
      this.close()
    }
  }
}
</script>
