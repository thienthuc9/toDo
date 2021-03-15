import { getList, deleteList,updateList,addList } from '../../utils/requestToDoList';

const API = {
    getList: (param) => {

        return getList(param).then((res) => {
            return res;
        })
    },
    deleteList: (param) => {

        return deleteList(param).then((res) => {

            return res;
        })
    },
    updateList: (param,task) => {
        
        return updateList(param,task).then((res) => {
        
            return res;
        })
    },
    addList: (param) => {

        return addList(param).then((res) => {

            return res;
        })
    }
}
export default API