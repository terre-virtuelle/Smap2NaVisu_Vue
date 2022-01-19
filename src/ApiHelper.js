import Axios from "axios";
class ApiHelper {
    static  urlBase = 'http://localhost:3000/';

    static setHeader () {
        Axios.defaults.headers.common = {'Access-Control-Allow-Origin': '*'};
    }
    static setHeaderToken (token) {
        Axios.defaults.headers.common = {'Access-Control-Allow-Origin': '*','Authorization': `Bearer ${token}`};
    }

    static sendDataForm(data) {
        return  Axios({
            method: 'post',
            url: ApiHelper.urlBase+'connectSocialMedia',
            data:data
        });
    }




}
export default ApiHelper
