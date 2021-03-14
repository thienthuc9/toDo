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
    updateList: (param) => {
        
        return updateList(param).then((res) => {
            // console.log(res)
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