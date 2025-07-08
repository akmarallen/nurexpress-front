
import axios from 'axios';
import address from './address'
const API_URL = address+'/delivery';
const API_URL_PURE = address;

//const API_URL = 'http://localhost:8080/intranet-nova/users';
//const loginURL = 'http://localhost:8080/intranet-nova/users/login';


class DeliveryService {


    async updateDelivery(user, delivery){

        var postData = {
            deliveryId: delivery.deliveryId,
            senderName: delivery.senderName,
            senderCompany: delivery.senderCompany,
            senderCity: delivery.senderCity,
            senderPhone: delivery.senderPhone,
            senderAddress: delivery.senderAddress,
            receiverName: delivery.receiverName,
            receiverCompany: delivery.receiverCompany,
            receiverCity: delivery.receiverCity,
            receiverPhone: delivery.receiverPhone,
            receiverAddress: delivery.receiverAddress,
            receiver: delivery.receiver,
            buyType: delivery.buyType,
            deliveryCount: delivery.deliveryCount,
            deliveryCost: delivery.deliveryCost,
            deliveryiCost: delivery.deliveryiCost,
            deliveryType: delivery.deliveryType,
            deliveryExplanation: delivery.deliveryExplanation,
            paymentType: delivery.paymentType,
            paidAmount: delivery.paidAmount,
            
            user: user.username
        };

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
        return axios.post(API_URL+"/update", JSON.stringify(postData), config).then((response) => {
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }

    async listDeliveries(user, filter, updated){

        var postData = {
            entryDate: filter.entryDateBegin,
            entryDateBegin: filter.entryDateBegin,
            entryDateEnd: filter.entryDateEnd,
            senderCity: filter.senderCity+"%",
            receiverCity: filter.receiverCity+"%",
            phone: filter.phone+"%",
            assignedSector: "%",
            name: "%"+filter.companyOrName+"%",
            acceptedPerson: filter.acceptedPerson+"%",
            address: "%",
            status: "%",
            paymentType: "%",
            updated: updated,
        };


        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
        return axios.post(API_URL+"/list", JSON.stringify(postData), config).then((response) => {
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }
    

    async listPostmanAcceptedDeliveries(user, filter){

        var postData = {
            entryDate: filter.entryDateBegin,
            senderCity: filter.senderCity,
            phone: "%",
            acceptedPerson: filter.acceptedPerson,
        };


        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
        return axios.post(API_URL_PURE+"/parcel/list/postman/accepted", JSON.stringify(postData), config).then((response) => {
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }
    

    async listDebtedDeliveries(user, filter){

        var postData = {
            beginDate: filter.entryDateBegin,
            endDate: filter.entryDateEnd,
            belongingUser: '',
            senderCity: filter.senderCity+"%",
            receiverCity: "%",
            senderPhone: "%"+filter.phone+"%",
            senderCompany: "%"+filter.companyOrName+"%",
        };


        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
        return axios.post(API_URL+"/list/debt", JSON.stringify(postData), config).then((response) => {
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }


    async listBankDeliveries(user, filter){

        var postData = {
            beginDate: filter.entryDateBegin,
            endDate: filter.entryDateEnd,
            belongingUser: '',
            senderCity: filter.senderCity+"%",
            receiverCity: "%",
            senderPhone: filter.phone+"%",
            senderCompany: filter.companyOrName+"%",
        };


        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
        return axios.post(API_URL+"/list/bank", JSON.stringify(postData), config).then((response) => {
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }
    

    async payeDebted(user, deliveryId){
        
        var postData = {
                deliveryId: deliveryId,
                payingUser: user.username,
            };

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json',
                'Authorization': user.token
                }
            };

        return axios.post(API_URL+"/payCost/multi", JSON.stringify(postData), config).then((response) => {
            return response;
        })
        .catch((e) => {
            throw e;
        })
    }

    
    async listDeliveryLogs(user, deliveryId){

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
        return axios.get(API_URL+"/list/log/"+deliveryId, config).then((response) => {
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }
}

export default new DeliveryService();