import _ from "lodash";

class Utils{
    static deepCloneObject(obj) {
        return  _.cloneDeep(obj);
    }
}

export default Utils
