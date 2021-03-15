/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  DELETE_TASK,
  CHANGE_TODO,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOAD_DATA,
  LOADING_DATA,
  DELETE_TASK_LOAD,
  SELECTED_TASK_BY_ID,
  UPDATE_TASK,
  CREATE_TASK,
  // DELETE_TASK_BY_ID,
  CHANGE_EDIT_TASK,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_TODO
 */
export function changeInputTodo(payload) {
  // console.log('test',inputTodo)
  return {
    type: CHANGE_TODO,
    payload,
   
  };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}
// payload
export function deleteTask(payload) {
  return {
    type: DELETE_TASK,
    payload
  };
}
export function deleteTaskLoad() {
  return {
    type: DELETE_TASK_LOAD,
    
  };
}


export function loadingData() {
  return {
    type: LOADING_DATA,
  };
}

export function loadData(payload) {
  return {
    type: LOAD_DATA,
    payload,
  };
}
export function createTask() {
  return {
    type: CREATE_TASK,
    
  };
}
// export function CreateLoad(input) {
//   return {
//     type: CREATE_TASK_LOAD
    
//   };
// }


/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}

// export function loadDataAppend(data) {
//   return {
//     type: LOAD_DATA_APPEND,
//     data,
//   };
// }

export function selectedTaskId(payload) {
  return {
    type: SELECTED_TASK_BY_ID,
    payload,
  };
}



export function updateTask() {
  return {
    type: UPDATE_TASK,
  };
}
export function changeEditTask(data, id) {
  console.log(data,id)
  return {
    type: CHANGE_EDIT_TASK,
    data,
    id,
  };
  
}
