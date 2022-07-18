<template>
  <v-simple-table>
  <template v-slot:default>
    <thead>
      <tr>
        <th class="text-left">Account List</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="account in accounts">
        <td>
          <router-link :to="{ name: 'send', params: { id: account }}">{{ account }}</router-link>
        </td>
      </tr>
    </tbody>
  </template>
  </v-simple-table>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AccountPage',
  data() {
    return {
      accounts: [],
    }
  },
  created() {
    // アカウント情報取得
    this.getAccounts()
  },
  methods: {
    async getAccounts() {
      try {
        const response = await axios.get('/api/getAccounts')
        this.accounts = response.data.result
      } catch(e) {
        alert('アカウント取得時にエラーが発生しました')
        // TOPページへ戻る
        this.$router.push({name: 'top'})
      }
    }
  }
}
</script>
