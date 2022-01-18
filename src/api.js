import CryptoJS from 'crypto-js';

export default class api {
    constructor(axios, store) {
        this._axios = axios;
        this._store = store;
        this._aesKey = 'impEdfCJyeIpDtUO';
        this._iv = '0000000000000000';
    }

    setStaticFail(value) {
        this._staticFail = value;
    }

    setStaticError(value) {
        this._staticError = value;
    }

    getApiUrl() {
        return this._store.state.apiUrl;
    }

    id() {
        let id = '';
        if (localStorage.id) {
            id = localStorage.id;
        } else {
            id = '';
        }
        return Number(id);
    }

    token() {
        let token = '';
        if (localStorage.token) {
            token = localStorage.token;
        } else {
            token = '';
        }
        return token;
    }

    account() {
        let account = '';
        if (localStorage.account) {
            account = localStorage.account;
        } else {
            account = '';
        }
        return account;
    }

    encryptedData(body) {
        const key = CryptoJS.enc.Utf8.parse(this._aesKey);
        const ivKey = CryptoJS.enc.Utf8.parse(this._iv);
        if (body instanceof Object) {
            body = JSON.stringify(body)
        }

        return CryptoJS.AES.encrypt(body, key, {
            iv: ivKey,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString();
    }

    decryptedData(body) {
        const key = CryptoJS.enc.Utf8.parse(this._aesKey);
        const ivKey = CryptoJS.enc.Utf8.parse(this._iv);
        const decrypt = CryptoJS.AES.decrypt(body, key, {
            iv: ivKey,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }

    hashData(value){
        return CryptoJS.SHA256(value).toString();
    }

    // 廠商登入
    login(account,password){
        const api = this.getApiUrl() + '/firm/login';
        const data = {
            'account': account,
            'password': this.hashData(password)
        };
        return this.post('login', data, api);
    }

    // 廠商登出
    logout() {
        const api = this.getApiUrl() + '/firm/logout';
        const data = {
            'token': this.token()
        };
        return this.post('logout', data, api);
    }

    // 取得廠商資訊
    getInfo() {
        const api = this.getApiUrl() + '/firm/getinfo';
        const data = {
            'token': this.token()
        };
        return this.post('getInfo', data, api);
    }

    // url列表
    urlList(firmId) {
        const api = this.getApiUrl() + '/url/list';
        const data = {
            'token': this.token(),
            'firm_id': firmId
        };
        return this.post('urlList', data, api);
    }

    // url編輯
    urlEdit(gameId, serverUrl, roleUrl, depositUrl) {
        const api = this.getApiUrl() + '/url/edit';
        const data = {
            'token': this.token(),
            'game_id': gameId,
            'server_url': serverUrl,
            'role_url': roleUrl,
            'deposit_url': depositUrl
        };
        return this.post('urlEdit', data, api);
    }

    post(command, data = {}, api) {
        let body = '';
        if (this._store.state.isEncryption) {
            body = {data: this.encryptedData(data)};
        } else {
            body = {data:data};
        }

        if (this._store.state.showLog) {
            console.log(body);
            console.log(data);
        }

        return new Promise((resolve, reject) => {

            const config = {
                'withCredentials': true,
                'timeout': 70000,
                headers:{'content-type': 'text/plain; charset=utf-8'}
            }

            this._axios.post(api, JSON.stringify(body), config).then(res => {
                if (this._store.state.showLog) {
                    console.log('$http post 成功 回傳如下');
                    console.log('command = '+command);
                    console.log(res);
                }


                let resData = '';
                if (res.data.error_code === 0) {
                    if (res.data.data !== null){
                        // gash儲值api以外回傳data需解碼
                        if ( command !== 'depositGash'){
                            resData = this._store.state.isEncryption ? JSON.parse(this.decryptedData(res.data.data)) : res.data.data;
                        }else{
                            resData = res.data.data;
                        }
                    }else{
                        resData = '';
                    }
                    resolve(resData);
                } else {
                    if (this._staticFail) {
                        this._staticFail(res.data.error_code);
                    }
                    reject(res.data);
                }

            }).catch(error => {
                if (this._store.state.showLog) {
                    console.log('$http post 失敗 回傳如下');
                    console.log('command = ' + command);
                    console.log(error);
                }
                if (this._staticError) {
                    this._staticError(error, command);
                }
            })
        });
    }


}
