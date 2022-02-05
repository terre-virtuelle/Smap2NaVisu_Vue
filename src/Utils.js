import _ from "lodash";

class Utils{
    static deepCloneObject(obj) {
        return  _.cloneDeep(obj);
    }
    static deepMergeObject(obj1,obj2) {
        return  _.merge(obj1,obj2);
    }
}

export default Utils
