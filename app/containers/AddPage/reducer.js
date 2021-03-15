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
  LOAD_DATA_APPEND,
  SELECTED_TASK_BY_ID,
  DELETE_TASK_BY_ID,
  CHANGE_EDIT_TASK,
  UPDATE_TASK,
  CREATE_TASK,
} from './constants';

// The initial state of the App
export const initialState = {
  todoList: '',
  todoArray: [],
  idSelected: null,
  editTaskName: '',
  idEdit: null,
};

/* eslint-disable default-case, no-param-reassign */
const addPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DELETE_TASK:
        // draft.loading = true;

        draft.idSelected = action.id;
      case CHANGE_TODO:
        draft.todoList = action.inputTodo;
        break;
      // case LOADING_DATA:
      //   draft.loading = true;
      //   draft.error = false;
      case LOAD_DATA:
        draft.loading = false;
        draft.todoArray = action.data;
        break;
      case DELETE_TASK_BY_ID:
        draft.loading = false;
        draft.idSelected = action.id;
        break;
      case SELECTED_TASK_BY_ID:
        draft.loading = true;
        draft.idSelected = action.id;
        break;
      case CHANGE_EDIT_TASK:
        draft.idEdit = action.data.idTask;
        draft.editTaskName = action.data.taskValue;
        break;
      case UPDATE_TASK:
        draft.loading = true;
        draft.error = false;


    }
  });

export default addPageReducer;
