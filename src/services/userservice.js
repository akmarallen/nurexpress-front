
import axios from 'axios';
import address from './address'

const loginURL = address+'/users/login';
const userListUrl = address+'/users/list';
const GET_ADDRESS = address+'/users/phone';
const RESET_ADDRESS = address+'/users/password/reset';

const userSectorAttach = address+'/users/update/sector';

const collectionURL = address+'/reports/collections';
const transationURL = address+'/transactions/list';

class UserService {


    async login(user){
        
        var postData = {
                email: user.username,
                password: user.password
            };

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8'
                }
            };

            return axios.post(loginURL, JSON.stringify(postData), config).then((response) => {

                user.username = response.data.UserLogin;
                user.token = response.headers['authorization'];
                user.name = response.data.UserName;
                user.role = response.data.UserRole;
                user.city = response.data.UserCity;
                user.userId = response.data.UserID;
                user.password = '';

                localStorage.setItem('currentUser', JSON.stringify(user));                    
            
            })
            .catch((e) => {
                throw e;
            })
    }


    logOut(){
        localStorage.removeItem('currentUser');
    }

    async getPostmanCollections(user, postman, date){

        var postData = {
            postman: postman,
            collectionDate: date,
        };

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
            
        return axios.post(collectionURL, JSON.stringify(postData), config).then((response) => {
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }


    async getPostmanTransactions(user, postman, date){

        var postData = {
            postman: postman,
            date1: date,
            date2: date,
        };

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
            
        return axios.post(transationURL, JSON.stringify(postData), config).then((response) => {
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }


    async getPostmans(user, city){

        var postData = {
            city: city,
        };

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
            
        return axios.post(userListUrl, JSON.stringify(postData), config).then((response) => {
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }


    async listPostmans(user){

        var postData = {
            city: user.city,
        };

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
            
        return axios.post(userListUrl, JSON.stringify(postData), config).then((response) => {
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }

    async listCityPostmans(user, city){

        var postData = {
            city: city,
        };

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
            
        return axios.post(userListUrl, JSON.stringify(postData), config).then((response) => {
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }

    async getUser(user, phoneNo){

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
        return axios.get(GET_ADDRESS+"/"+phoneNo, config).then((response) => {
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }


    async resetPassword(user, selectedUser){
        
        var postData = {
                userId: selectedUser.userId,
                password: "1",
                newpassword: "1",
            };

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };

            return axios.post(RESET_ADDRESS, JSON.stringify(postData), config).then((response) => {
                return response.data;
            })
            .catch((e) => {
                throw e;
            })
    }

    async attachSector(user, userId, sector){
        
        var postData = {
                userId: userId,
                sector: sector
            };

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };

            return axios.post(userSectorAttach, JSON.stringify(postData), config).then((response) => {
                return response.data;
            })
            .catch((e) => {
                throw e;
            })
    }


}

export default new UserService();