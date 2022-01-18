<template>
  <div class="urlList">
    <button class="logout" @click="logout">Logout</button>
    <table>
      <thead>
      <tr class="title">
        <th>帳號名稱</th>
        <th>ip 白名單</th>
        <th>角色接口</th>
        <th>補單接口</th>
        <th>編輯</th>
      </tr>
      </thead>
      <tbody>
      <tr class="item" v-for="item of list" :key="item.game_id">
        <td class="content">
          <span
              class="mobile-gameName">帳號名稱</span>
          {{ item.game_name }}
        </td>
        <td class="content">
          <span class="mobile-gameName">ip 白名單ip</span>
          <span class="url" v-show="!item.show">{{ item.server_url }}</span>
          <input type="text" v-show="item.show" v-model="serverUrl">
        </td>
        <td class="content">
          <span class="mobile-gameName">角色接口</span>
          <span class="url" v-show="!item.show">{{ item.role_url }}</span>
          <input type="text" v-show="item.show" v-model="roleUrl">
        </td>
        <td class="content">
          <span class="mobile-gameName">補單接口</span>
          <span class="url" v-show="!item.show">{{ item.deposit_url }}</span>
          <input type="text" v-show="item.show" v-model="depositUrl">
        </td>
        <td class="content">
          <span class="mobile-gameName">編輯</span>
          <button class="edit" v-show="!item.show" @click="edit(item)">編輯</button>
          <button class="edit mr-2" v-show="item.show" @click="urlEdit(item)">確認修改</button>
          <button class="edit" v-show="item.show" @click="close(item)">取消</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "UrlList",
  data() {
    return {
      list: [],
      isInput: false,
      serverUrl: '',
      roleUrl: '',
      depositUrl: ''
    }
  },
  computed: {
    firmId() {
      if (localStorage.id) {
        return Number(localStorage.id);
      } else {
        return 0;
      }
    }
  },
  methods: {
    edit(item) {
      if (this.isInput === true) {
        alert('請先完成當前編輯');
      } else {
        this.isInput = true;
        this.serverUrl = item.server_url;
        this.roleUrl = item.role_url;
        this.depositUrl = item.deposit_url;
        item.show = true;
      }
    },
    urlEdit(item) {
      this.isInput = false;
      if (confirm('確定送出？')) {
        item.server_url = this.serverUrl;
        item.role_url = this.roleUrl;
        item.deposit_url = this.depositUrl;
        item.show = false;
        this.$apiService.urlEdit(item.game_id, this.serverUrl, this.roleUrl, this.depositUrl).then((res) => {
          if (this.$store.state.showLog) {
            console.log(res);
          }
          alert('修改完成！');

        }).catch((err) => {
          if (this.$store.state.showLog) {
            console.log(err);
          }
        })
      }
    },
    getUrlList() {
      this.$apiService.urlList(this.firmId).then((res) => {
        if (this.$store.state.showLog) {
          console.log(res);
        }
        if (res.list) {
          for (let i = 0; i < res.list.length; i++) {
            this.list.push({
              game_id: res.list[i].game_id,
              game_name: res.list[i].game_name,
              server_url: res.list[i].server_url,
              role_url: res.list[i].role_url,
              deposit_url: res.list[i].deposit_url,
              show: false,
            });
          }
        }
      }).catch((err) => {
        if (this.$store.state.showLog) {
          console.log(err);
        }

        this.logout();

      })

    },
    close(item) {
      this.isInput = false;
      item.show = false;
    },
    logout() {
      this.$apiService.logout().then((res) => {
        if (this.$store.state.showLog) {
          console.log(res);
        }

        localStorage.removeItem('token');
        localStorage.removeItem('account');
        localStorage.removeItem('id');
        localStorage.removeItem('name');

        this.$router.push('/login');

      }).catch((err) => {
        if (this.$store.state.showLog) {
          console.log(err);
        }

        localStorage.removeItem('token');
        localStorage.removeItem('account');
        localStorage.removeItem('id');
        localStorage.removeItem('name');

        this.$router.push('/login');

      })

    },
  },
  mounted() {
    this.getUrlList();
  }
}
</script>

<style lang="scss" scoped>
.urlList {
  @apply w-11/12 mx-auto mt-20;

  & .logout {
    @apply float-right mb-6;
    @apply bg-gray-600 text-white font-bold py-2 px-4 rounded transition-all duration-200;
    &:hover {
      @apply bg-gray-700;
    }
  }

  & table {
    @apply border-collapse w-full;
    & tr.title {
      & th {
        @apply p-3 font-bold uppercase bg-gray-300 text-gray-600 border border-gray-300 table-cell;
      }
    }

    & tr.item {
      @apply bg-white table-row flex-row flex-no-wrap mb-0;
      &:hover {
        @apply bg-gray-100;
      }

      & td.content {
        @apply w-auto p-3 text-gray-800 text-center border border-b table-cell static;

        & span.mobile-gameName {
          @apply hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase;
        }

        & span.url {
          word-wrap: break-word;
          word-break: break-all;
        }

        & input {
          @apply border border-gray-400 appearance-none rounded w-full p-3;
          transition: border 0.2s ease-in-out;

          &:focus {
            @apply border-indigo-600 outline-none;
          }

          &:active {
            @apply border-indigo-600 outline-none;
          }
        }

        & .edit {
          @apply text-blue-400 underline;
          &:hover {
            @apply text-blue-600;
          }
        }
      }
    }
  }

}

@media (max-width: 1024px) {
  .urlList {
    & table {
      & tr.title {
        & th {
          @apply hidden;
        }
      }

      & tr.item {
        @apply flex flex-row flex-wrap mb-10;
        & td.content {
          @apply w-full relative flex justify-center items-center pt-10;
          & span.mobile-gameName {
            @apply block w-full;
          }

          & input {
            @apply text-center;
          }
        }
      }
    }

  }
}

</style>
