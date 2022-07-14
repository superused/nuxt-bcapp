<template>
  <v-row justify="center">
    <v-col
      cols="12"
      sm="10"
      md="8"
      lg="6"
    >
      <v-card ref="form">
        <v-card-text>
          <h1>{{Title}}</h1>
          <h2 align="right">(TotalSupply:{{TotalSupply}})</h2>
          <v-text-field 
            ref="fromAccount" 
            v-model="FromAccount" 
            label="fromAccount" 
            placeholder="fromAccount" 
            disabled
          >
           {{FromAccount}}
          </v-text-field>
          <p> tokenBalance : {{TokenBalance}}</p>
          <p> ethBalance : {{EthBalance}}</p>
          <v-text-field
            ref="secretKey"
            v-model="PassWord"
            label="secretKey"
            placeholder="secretKey"
          ></v-text-field>
          <v-text-field
            ref="sendValue"
            v-model="SendValue"
            :rules="[() => !!SendValue || 'This field is required']"
            :label="Symbol"
            placeholder="SendValue"
            type="number"
            required
          ></v-text-field>
          <v-autocomplete
            ref="toAccount"
            v-model="ToAccount"
            :rules="[() => !!ToAccount || 'This field is required']"
            :items="Accounts"
            label="ToAccount"
            placeholder="Select..."
            required
          ></v-autocomplete>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="send"
          >
            Send
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios"

export default {

   data() {
     return {
       Title:"",
       TotalSupply:"",
       FromAccount: "",
       EthBalance:0,
       TokenBalance: 0,
       PassWord:"",
       SendValue:1,
       Accounts: [],
       ToAccount: "",
       errorMessages: '',
       formHasErrors: false,
       Symbol: "",
     }
   },
   computed: {
     form () {
       return {
         title: this.Title,
         totalSupply: this.TotalSupply,
         fromAccount: this.Accounts,
         ethBalance: this.EthBalance,
         tokenBalance: this.TokenBalance,
         password: this.PassWord,
         sendValue: this.SendValue,
         toAccount: this.Accounts,
         symbol: this.Symbol,
       }
     },
   },
   methods: {
     resetForm () {
        this.PassWord = ""
        this.SendValue = 1
        this.ToAccount = ""

        this.getBalance(this.FromAccount)
        this.$refs.toAccount.reset();
     },
     async getBalance (account_data) {
        var params = new URLSearchParams();
        params.append('account_address', account_data);
        //送信者のトークン残高取得API実行
        axios.post('/api/getTokenBalanceOf',params)
        .then(response => {
            if (response.data) {
                if (response.data.error) {
                    alert('取得に失敗しました。')
                } else {
                    this.TokenBalance = response.data.result
                    this.FromAccount = account_data
                }
            }
        })
        //送信者のether残高取得API実行
        axios.get('/api/getEtherBalance',{
            params: {
                account_address: account_data
            }
        }).then(response => {
            if (response.data) {
                if (response.data.error) {
                    alert('取得に失敗しました。')
                } else {
                    this.EthBalance = response.data.result
                    this.FromAccount = account_data
                }
            }
        })
     },
     async send(){
        var params = new URLSearchParams();
        params.append('from', this.FromAccount);
        params.append('to', this.ToAccount);
        params.append('private_key', this.PassWord);
        params.append('value', this.SendValue);

      axios.post('/api/transferToken',params)
        .then(response => {
          if (response.data) {
            if (response.data.error) {
              alert('送信に失敗しました。')
            } else {
              alert('送信に成功しました。')
              //formの内容をリセットする
              this.resetForm()
            }
          }
        }).catch(error => {
            alert("送信時にエラーが発生しました。");
        })
     },
   },
   async mounted(){
        //from account情報が渡されていなかったらaccount listにリダイレクト
        if(!this.$route.params.id){
            this.$router.push({name:"accounts"})
            return
        }

        await this.getBalance(this.$route.params.id)

        axios.get('/api/totalSupply').then(response => {
            this.TotalSupply = response.data.result
        })
        axios.get('/api/name').then(response => {
            this.Title = response.data.result
        });
        axios.get('/api/getAccounts').then(response => {
            this.Accounts = response.data.result
        });
        axios.get('/api/symbol').then(response => {
            this.Symbol = 'sendValue('+response.data.result+')'
        });
   }
}

//awaitをむやみやたらに使わない
</script>
