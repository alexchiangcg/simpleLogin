<template>
    <div>
        <el-button type="danger" @click="logout">登出</el-button>
        <el-button @click="createAccount">新增帳號</el-button>

        <el-table
            :data="tableData"
            style="width: 100%; margin-top: 40px">
            <el-table-column label="帳號" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.account }}</span>
                </template>
            </el-table-column>
            <el-table-column label="token" width="180">
                <template slot-scope="scope">
                    <el-tag size="medium">{{ scope.row.token }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="白名單ip" width="300">
                <template slot-scope="scope">
                    <div style="display: flex; flex-wrap: wrap; flex-direction: row; margin-bottom: 10px"
                         v-for="(ip, index) of scope.row.white_ips" :key="'white_ips_' +index">
                        <div style="margin-right: 20px">{{ `${ip}` }}</div>
                        <el-button size="mini" type="danger" @click="handleDeleteIp(scope.row, ip)">
                            删除
                        </el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleAddWhiteIp(scope.row)">
                        新增白名單
                    </el-button>
                    <el-button size="mini" type="danger" @click="handleAccount(scope.row)">
                        {{ scope.row.is_open ? '關閉帳號' : '開啟帳號' }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: "UrlList",
    data() {
        return {
            tableData: [
                {
                    account: 'sdsds',
                    token: 'dwsdwe343',
                    white_ips: ['192.168.2.2', '192.168.2.3'],
                    is_open: true
                }, {
                    account: 'dadfwelkfjkl',
                    token: '4235yhrth',
                    white_ips: ['192.168.3.2', '192.181.2.3'],
                    is_open: true
                }, {
                    account: 'daelkfdjklaef',
                    token: 'w;flwekr;295',
                    white_ips: ['192.4.3.2', '1.2.2.3'],
                    is_open: true
                }]
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        getList() {
            // todo getList from api
        },
        createAccount() {
            // todo createAccount
            this.$prompt('请输入帳號', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(({value}) => {
                const i = Math.floor(Math.random() * 9999)
                this.tableData.push({
                    account: value,
                    token: `token ${i}`,
                    white_ips: [],
                    is_open: true
                });
            }).catch(() => {
            });
        },
        handleDeleteIp(row, ip) {
            // todo delete ip
            console.log(row)
            console.log(ip)
            console.log(row.white_ips.indexOf(ip))
            row.white_ips.splice(row.white_ips.indexOf(ip), 1)
        },
        handleAddWhiteIp(row) {
            // todo add ip
            console.log(row)
            this.$prompt('请输入ip', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(({value}) => {
                row.white_ips.push(value)
            }).catch(() => {
            });
        },
        handleAccount(row) {
            // todo close account
            console.log(row)
            row.is_open = !row.is_open
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
    }
}
</script>

<style lang="scss" scoped>

</style>
