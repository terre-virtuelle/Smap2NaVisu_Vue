import Axios from "axios";

class ApiHelper {
    static  urlBase = 'http://localhost:3004/';

    static setHeader() {
        Axios.defaults.headers.common = {'Access-Control-Allow-Origin': '*'};
    }

    static sendDataForm(data) {
        return Axios({
            method: 'post',
            url: ApiHelper.urlBase + 'scenarios',
            data: data
        });
    }


    static getScenarios() {
        return Axios({
            method: 'get',
            url: ApiHelper.urlBase + 'scenarios',
        });
    }

    static updateScenario(data) {
        return Axios({
            method: 'put',
            url: ApiHelper.urlBase + 'scenarios',
            data: data
        });
    }

    static deleteScenario(data) {
        return Axios({
            method: 'delete',
            url: ApiHelper.urlBase + 'scenarios',
            data: data
        });
    }

    static exportScenario(data) {
        return Axios({
            method: 'post',
            url: ApiHelper.urlBase + 'scenariosExport',
            data: data
        });
    }

    static getScenariosFilesPaths(data) {
        return Axios({
            method: 'post',
            url: ApiHelper.urlBase + 'scenarioFilesPath',
            data: data
        });
    }

    static dlFile(filePath) {
        window.open(ApiHelper.urlBase + 'dlFile?path=' + filePath)
    }

}

export default ApiHelper
