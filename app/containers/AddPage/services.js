import { excute } from '../../utils/requestAxios';

const API = {
    getList: (param) => {

        return excute(
            'get',
            'task',
        ).then((res) => {
            return res;
        })
    },
    deleteList: (idTask) => {
        return excute('DELETE', `task/${idTask}`).then((res) => {
            return res;
        })
    },
    updateList: (idTask,infoTask) => {
        
        return excute(
            'PUT',
            `task/${idTask}`,
            {
                description: infoTask,
            }
        ).then((res) => {
        
            return res;
        })
    },
    addList: (todoList) => {

        return excute(
            'POST',
            'task',
            {
                description: todoList,
            }
        ).then((res) => {

            return res;
        })
    }
}
export default API