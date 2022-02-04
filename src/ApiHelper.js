import Axios from "axios";
class ApiHelper {
    static  urlBase = 'http://localhost:3004/';
    static setHeader () {
        Axios.defaults.headers.common = {'Access-Control-Allow-Origin': '*'};
    }
    static setHeaderToken (token) {
        Axios.defaults.headers.common = {'Access-Control-Allow-Origin': '*','Authorization': `Bearer ${token}`};
    }

    static sendDataForm(data) {
        return  Axios({
            method: 'post',
            url: ApiHelper.urlBase+'scenarios',
            data:data
        });
    }


    static  getScenarios() {
        return  Axios({
            method: 'get',
            url: ApiHelper.urlBase+'scenarios',
        });
    }
    static  deleteScenario(data) {
        return  Axios({
            method: 'delete',
            url: ApiHelper.urlBase+'scenarios',
            data:data
        });
    }

}
export default ApiHelper
