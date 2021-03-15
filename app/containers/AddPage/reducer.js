/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  DELETE_TASK,
  CHANGE_TODO,
  LOAD_DATA,
  LOADING_DATA,
  CREATE_TASK,
  SELECTED_TASK_BY_ID,
  DELETE_TASK_BY_ID,
  CHANGE_EDIT_TASK,
  UPDATE_TASK,
  DELETE_TASK_LOAD,
} from './constants';

// The initial state of the App
export const initialState = {
  todoList: '',
  todoArray: [],
  idSelected: null,
  editTaskName: '',
  idEdit: null,
  loading:false
};

/* eslint-disable default-case, no-param-reassign */
const addPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      // case DELETE_TASK:
      //   // draft.loading = true;
      //   draft.loading = false;
      //   draft.idSelected = action.id;
      //   break
      case DELETE_TASK_LOAD:
        draft.loading = true;
        console.log('test',draft.loading)

        break;
      case CHANGE_TODO:
        console.log(action.payload)
        draft.todoList = action.payload;
        break;
      case LOADING_DATA:
        draft.loading = true;
        break
      case LOAD_DATA:
        draft.loading = false;
        console.log(action.payload)
        draft.todoArray = action.payload;
        break;
      case DELETE_TASK_BY_ID:
        draft.loading = false;
        draft.idSelected = action.id;
        break;
      case SELECTED_TASK_BY_ID:
        // draft.loading = true;
        draft.idSelected = action.payload;
        console.log('test',draft.loading)
        break;
      case CHANGE_EDIT_TASK:
        draft.idEdit = action.data.idTask;
        draft.editTaskName = action.data.taskValue;
        break;
      case UPDATE_TASK:
        draft.loading = true;
       
        break;
      case CREATE_TASK:
        draft.loading = true;
        break;

    }
  });

export default addPageReducer;
