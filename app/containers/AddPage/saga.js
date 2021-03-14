/**
 * Gets the repositories of the user from Github
 */
import swal from 'sweetalert2'
import services from './services'

import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  DELETE_TASK,
  LOAD_REPOS,
  LOADING_DATA,
  SELECTED_TASK_BY_ID,
  UPDATE_TASK,
} from 'containers/AddPage/constants';
import { repoLoadingError, loadData } from 'containers/AddPage/actions';
import axios from 'axios';

import {
  makeSelectAddPage,
  makeSelectGetTaskById,
  makeSelectTaskIdEdit,
  makeSelectTaskEdit,
} from './selectors';
import { CREATE_TASK } from './constants';
import { getList, DeleteList, addList, updateList } from '../../utils/requestToDoList'
import { da } from 'date-fns/locale';
/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOADING_DATA, loadDataRespo);
  yield takeLatest(CREATE_TASK, createTask);
  yield takeLatest(DELETE_TASK, deleteTaskById);
  yield takeLatest(UPDATE_TASK, updateTaskById);
}
/**
 * Github repos request/response handler
 */
export function* createTask() {
  const todoList = yield select(makeSelectAddPage());

  try {
    yield call(services.addList, todoList);
    if(todoList === ''){
      swal.fire(
        'ERROR',
        '',
        'warning'
      )
    }else{
      swal.fire(
        '',
        `Thêm Thành Công`,
        'success'
    )
    }
 
    yield call(loadDataRespo);

    // yield put(loadData(requestURL.data.data));
    // yield put(loadData(requestURL.data.data));
  } catch (err) {
  
    yield put(repoLoadingError(err));

  }
}


export function* loadDataRespo() {
  try {

    const requestURL = yield call(services.getList)
    yield put(loadData(requestURL.data.data));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export function* deleteTaskById() {
  const idTask = yield select(makeSelectGetTaskById());

  try {

    yield call(services.deleteList, idTask);
    swal.fire(
      '',
      `Xóa Thành Công`,
      'success'
    )
    yield call(loadDataRespo)
  } catch (err) {
    console.log(err)
    yield put(repoLoadingError(err));
  }
}

export function* updateTaskById() {
  const idTaskEdit = yield select(makeSelectTaskIdEdit());
  const taskDes = yield select(makeSelectTaskEdit());

  try {
    yield call(updateList, idTaskEdit, taskDes);
    swal.fire(
      '',
      `Update Thành Công`,
      'success'
  )
    yield call(loadDataRespo)

  } catch (err) {
    console.log(err)
    yield put(repoLoadingError(err));
  }
}
