<template>
  <div class="login">
    <div class="form">
      <h1>Login</h1>
      <div class="mb-4">
        <input class="input" :class="{'border-red-500':accountError}" type="text" placeholder="Account" v-model="account">
      </div>
      <div class="mb-4">
        <input class="input" :class="{'border-red-500':passwordError}" type="password" placeholder="Password" v-model="password">
      </div>
      <button @click="login">Submit</button>
    </div>
  </div>
</template>

<script>
import {errorCode} from '@/config/error.js';

export default {
  name: "Login",
  data() {
    return {
      account: '',
      password: '',
      accountError: false,
      passwordError: false
    }
  },
  methods: {
    login() {
      /*
      測試用
      localStorage.setItem('token', 'tokentokentokentoken');
      this.getInfo();
      this.$router.push('/url-list');*/


      if(this.account === ''){
        this.accountError = true;
        return false;
      }else{
        this.accountError = false;
      }

      if(this.password === ''){
        this.passwordError = true;
        return false;
      }else{
        this.accountError = false;
      }

      // this.$apiService.login(this.account, this.password).then((res) => {
      //   if (this.$store.state.showLog) {
      //     console.log(res);
      //   }
      //   alert('登入成功');
      //   localStorage.setItem('token', res.token);
      //   this.getInfo();
      //   this.$router.push('/url-list');
      //
      // }).catch((err) => {
      //   if (this.$store.state.showLog) {
      //     console.log(err);
      //   }
      //
      //   // 錯誤提醒
      //   alert(errorCode[err.error_code]);
      //
      // })

        /// 跳轉
        localStorage.setItem('token', 'test');
        this.$router.push('/url-list');
    },
    getInfo(){
      this.$apiService.getInfo().then((res) => {
        if (this.$store.state.showLog) {
          console.log(res);
        }

        localStorage.setItem('account', res.account);
        localStorage.setItem('id', res.id);
        localStorage.setItem('name', res.name);

      }).catch((err) => {
        if (this.$store.state.showLog) {
          console.log(err);
        }

      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  @apply mt-20 flex justify-center items-center;
  & .form {
    @apply shadow-xl p-10 bg-white;
    & h1 {
      @apply text-4xl font-black mb-4;
    }

    & .input {
      @apply border border-gray-400 appearance-none rounded w-full p-3;
      transition: border 0.2s ease-in-out;
      min-width: 280px;

      &:focus {
        @apply border-indigo-600 outline-none;
      }

      &:active {
        @apply border-indigo-600 outline-none;
      }
    }

    & button {
      @apply bg-indigo-600 text-white font-bold py-3 px-6 rounded transition-all duration-200;
      &:hover{
        @apply bg-indigo-700;
      }
    }

  }
}
</style>
