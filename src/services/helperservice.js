
import axios from 'axios';
import address from './address'
const EXPENSE_URL = address+'/expense';
const CUSTOMER_URL = address+'/customers/corporate/list';
const TRANSACTION_URL = address+'/transactions';
const REPORT_URL = address+'/reports';
const SECTOR_URL = address+'/sectors';
const CUSTOMERS_URL = address+'/customers';



class HelperService {


    async saveExpense(user, expense){
        
        var postData = {
                city: expense.expenseCity,
                amount: expense.expenseAmount,
                expenseDate: expense.expenseDate,
                explanation: expense.expenseExplanation,
                enteredUser: user.username,
            };

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json',
                'Authorization': user.token
                }
            };

        return axios.post(EXPENSE_URL+"/save", JSON.stringify(postData), config).then((response) => {
            return response;
        })
        .catch((e) => {
            throw e;
        })
    }

 
   
    async listExpenses(user, city, date1, date2){

        var postData = {
            city: city,
            beginDate: date1,
            endDate: date2,
        };

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
        return axios.post(EXPENSE_URL+"/list", JSON.stringify(postData), config).then((response) => {
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }

    async saveTransaction(user, postman, amount, date){

        var postData = {
            postman: postman,
            amount: amount,
            expenseDate: date,
            enteredUser: user.username
        };

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
        return axios.post(TRANSACTION_URL+"/save", JSON.stringify(postData), config).then((response) => {
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }

    async updateTransaction(user, transaction){

        var postData = {
            transactionId: transaction.transactionId,
            postman: transaction.postman,
            amount: transaction.amount,
            expenseDate: transaction.expenseDate,
            enteredUser: user.username
        };

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
        return axios.post(TRANSACTION_URL+"/update", JSON.stringify(postData), config).then((response) => {
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }

    async listTransactions(user, postman, date1, date2){

        var postData = {
            postman: postman,
            date1: date1,
            date2: date2,
        };

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
        return axios.post(TRANSACTION_URL+"/list", JSON.stringify(postData), config).then((response) => {
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }

    async listCustomers(user, city, company){

        var postData = {
            city: city,
            company: company,
            address: "",
        };

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
        return axios.post(CUSTOMER_URL, JSON.stringify(postData), config).then((response) => {
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }


    async getData(user){

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
        return axios.get(REPORT_URL+"/delivery/report", config).then((response) => {
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }


    async listRegionData(user, city, date1, date2){

        var postData = {
            regionName: city,
            beginDate: date1,
            endDate: date2,
        };


        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
        return axios.post(REPORT_URL+"/region/report", JSON.stringify(postData), config).then((response) => {            
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }


    async saveSector(user, sectorId, sectorName, sectorCity){

        var postData = {
            sectorId: sectorId,
            sector: sectorName,
            city: sectorCity
        };

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
        return axios.post(SECTOR_URL+"/save", JSON.stringify(postData), config).then((response) => {
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }

    async listSectors(user, city){

        var postData = {
            city: city,
            sector: " ",
        };

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
        return axios.post(SECTOR_URL+"/list", JSON.stringify(postData), config).then((response) => {
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }


    async getPostmanReport(user, postman, date1, date2){

        var postData = {
            postman: postman,
            collectionDate1: date1,
            collectionDate2: date2,
        };

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
        return axios.post(REPORT_URL+"/postman/report", JSON.stringify(postData), config).then((response) => {            
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }
    

    async getSenderCustomer(user, phone){

        var postData = {
            phone: phone,
            city: "",
            company: "",
            customerId: "",
            address: "",
            responsiblePerson: "",
        };

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
        return axios.post(CUSTOMERS_URL+"/retail/list", JSON.stringify(postData), config).then((response) => {            
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }
    

    async listOrders(user, filter){

        var postData = {
            sector: filter.acceptedPerson+"%",
            origin: filter.senderCity+"%",
            phone: filter.phone+"%",
            destination: filter.receiverCity+"%",
            entryDate1: filter.entryDateBegin,
            entryDate2: filter.entryDateEnd,
            status: "%",
        };


        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
        return axios.post(address+"/order/list", JSON.stringify(postData), config).then((response) => {            
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }

    async saveOrder(user, item){

        var postData = {
            senderName: item.senderName,
            senderCompany: item.senderCompany,
            senderCity: item.senderCity,
            senderPhone: item.senderPhone,
            senderAddress: item.senderAddress,
            receiverName: item.receiverName,
            receiverCompany: item.receiverCompany,
            receiverCity: item.receiverCity,
            receiverPhone: item.receiverPhone,
            receiverAddress: item.receiverAddress,
            assignedSector: item.assignedSector,
            explanation: item.explanation,
            user: user.username,
        };

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
        return axios.post(address+"/order/save", JSON.stringify(postData), config).then((response) => {            
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }

    async updateOrder(user, item){

        var postData = {
            senderName: item.senderName,
            senderCompany: item.senderCompany,
            senderCity: item.senderCity,
            senderPhone: item.senderPhone,
            senderAddress: item.senderAddress,
            receiverName: item.receiverName,
            receiverCompany: item.receiverCompany,
            receiverCity: item.receiverCity,
            receiverPhone: item.receiverPhone,
            receiverAddress: item.receiverAddress,
            assignedSector: item.assignedSector,
            explanation: item.explanation,
            orderId: item.orderId,
            user: user.username,
        };

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
        return axios.post(address+"/order/update", JSON.stringify(postData), config).then((response) => {            
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }

    async getDailyReport(user, selectedDate, senderCity, receiverCity){

        var postData = {
            collectionDate: selectedDate,
            senderCity: senderCity+"%",
            receiverCity: receiverCity+"%",
        };

        var config = {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json;charset=UTF-8', 
                'Accept':'application/json;charset=UTF-8',
                'Authorization': user.token
                }
            };
        return axios.post(address+"/reports/daily", JSON.stringify(postData), config).then((response) => {            
            return response.data;
        })
        .catch((e) => {
            throw e;
        })
    }
}

export default new HelperService();