// this class will be used to reprensent the model of  a scenario in the front
import formBaseModel from "../src/assets/scenarioModel.json"

class ScenarioDm{
    constructor(datas = null) {
        if (datas){
         this.title = datas.title;
         this.origin = datas.origin;
         this.date = datas.date;
         this.bbox = datas.bbox;
         this.introduction = datas.introduction;
         this.questions = datas.questions;
        }else {
            this.title = '';
            this.origin = '';
            this.date = {};
            this.bbox = {};
            this.introduction = '';
            this.questions = [];
        }
    }
    getFormDisplay(){
        const formBase = formBaseModel;
        formBase.schema.properties = Object.entries(formBase.schema.properties).reduce((accumulator,[pk,pv]) => {
          pv.default = this[pk];
         accumulator[pk] = pv;
         return accumulator;
        },{})
        return formBase;
    }


}

export default ScenarioDm
