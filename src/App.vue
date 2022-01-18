<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  methods: {
    initApiService() {
      this.$apiService.setStaticFail((resData) => {
        if (this.$store.state.showLog) {
          console.log(resData);
        }
        // token過期
        if( resData === 10005 ){
          this.defaultState();
          this.$router.push('/login');
        }
      });

      this.$apiService.setStaticError((error, command) => {
        if (this.$store.state.showLog) {
          console.log(error, command);
        }
        if (command === 'logout') {
          this.defaultState();
        }
      });
    },
    defaultState() {
      localStorage.removeItem('token');
      localStorage.removeItem('account');
      localStorage.removeItem('id');
      localStorage.removeItem('name');
      this.$router.push('/login');
    },
  },
  created() {
    this.initApiService();
  }
}
</script>
