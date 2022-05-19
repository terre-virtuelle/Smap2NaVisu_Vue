// this class will be used to reprensent the model of  a scenario in the front
import formBaseModel from "./assets/scenarioModel.json"

class ScenarioDm{
    constructor(datas = null) {
        if (datas){
         this.fileName = datas.fileName;
         this.title = datas.title;
         this.origin = datas.origin;
         this.date = datas.date;
         this.bbox = datas.bbox;
         this.description = datas.description;
         this.introduction = datas.introduction;
         this.questions = datas.questions;
        }else {
            this.title = '';
            this.origin = '';
            this.date = {};
            this.bbox = {};
            this.description = '';
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
            formBase.schema.title = this.title !== '' ? this.title : formBase.schema.title;

        return formBase;
    }


}

export default ScenarioDm
