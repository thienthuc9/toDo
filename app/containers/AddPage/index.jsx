/* eslint-disable react/prop-types */
/*
 * FeaturePage
 *
 * List all the features
 */
import swal from 'sweetalert2'

import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
// import ReposListTodo from 'components/RepoListTodo';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { format } from 'date-fns';

import { Fab, InputLabel, MenuItem, Select, Tooltip } from '@material-ui/core';
// import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { useDispatch, useSelector } from 'react-redux';
import LoadingIndicator from '../../components/LoadingIndicator';

import {
  makeSelectData,
  makeSelectLoading,
  makeSelectError,
} from './selectors';
import { changeInputTodo, updateTask, loadingData, changeEditTask, deleteTask, createTask,deleteTaskLoad,selectedTaskId } from './actions';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },

  list: {
    padding: '0 220px 0 220px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    marginLeft: '20px'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

export function AddPage(props) {
  const key = 'todoListReducer';
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  //Load List
  useEffect(() => {
    props.loadDataDefault();
  }, []);

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [text, setText] = useState('');
  const [id, setId] = useState('');
  const [id2, setId2] = useState('');
  const [detail, setDetail] = useState({
    description: '',
    createdAt: ''
  });

  // set du lieu detail
  const handleOpenDetail = (de, cr) => {
    setDetail({
      ...detail,
      description: de,
      createdAt: cr
    })

    setOpen2(true);
  };
  //time
  const timeout = 500;
  // close modal
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  // xu li update
  const handleOpenEdit = (textInput, idTask) => {
    setText(textInput);
    setId(idTask);
    setOpen(true);
  };
  const handleChangeUpdateTask = e => {
    props.onChangeInputTask({ idTask: id, taskValue: e.target.value });
  };

  const handleChangeAddTask = e => {
    const payload = e.target.value
    props.inputAddToDo((payload))
  }
  const handleUpdateTask = () => {
    setOpen(false);
    props.submitUpdateTask()
  }
  const handleSetIdDelete = (id)=>{
    props.deleteList(id);
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // props.deleteList(id);
        // loadDataDefault();
        props.deleteConfirm()
      }
    })
  }

  // console.log(props.data)

  console.log(props.loading)
  return (
    <div className={classes.root}>
      <Grid container spacing={2}  >
        <Grid item xs={12}>
          <h3>TO DO LIST</h3>
        </Grid>
        <Grid item xs={12}>
          <TextField name='description' onChange={handleChangeAddTask} id="outlined-basic" label="Add List" variant="outlined" />
          <Tooltip className={classes.button} title="Add" aria-label="add">
            <Fab onClick={props.addList} type="button" color="primary">
              <AddIcon />
            </Fab>
          </Tooltip>
        </Grid>
        <Grid item xs={12}>

          <List className={classes.list}>
            {props.loading != true ? (
               props.data.map((List, index) => {
                return <ListItem key={index} role={undefined} dense button onClick={() => handleOpenDetail(List.description, List.createdAt)} >

                  <ListItemText primary={List.description} />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => { handleOpenEdit(List.description, List._id) }} aria-label="edit" color="primary">
                      <EditIcon ></EditIcon>
                    </IconButton>
                    <IconButton onClick={() => { handleSetIdDelete(List._id) }} aria-label="delete" color="default">
                      <DeleteIcon></DeleteIcon>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              })
            ) : (
               <List component={LoadingIndicator} />
            )

             
            }
             {/* <List component={LoadingIndicator} /> */}
          </List>





        </Grid>




      </Grid>
      {/* modal UPDATE */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <TextField defaultValue={text} onChange={handleChangeUpdateTask} id="outlined-basic" label="Edit List" variant="outlined" />
            <IconButton onClick={handleUpdateTask} type="submit" aria-label="save" color="primary">
              <SaveIcon></SaveIcon>
            </IconButton>
          </div>
        </Fade>
      </Modal>
      {/* modal DETAIL */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open2}
        onClose={handleClose2}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout }}


      >
        <Fade in={open2}>
          <div className={classes.paper}>
            <h2>Deatil</h2>
            <p>Name Work: {detail.description}</p>
            <p>Time Create: {detail.createdAt}</p>
          </div>
        </Fade>
      </Modal>
    </div>

  );
}

AddPage.propTypes = {
  addList: PropTypes.func,
  onChangeSelectedTask: PropTypes.func,
  loading: PropTypes.bool,
  inputTodo: PropTypes.string,
  onChangeInputTodo: PropTypes.func,
  onSubmitForm: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export function mapDispatchToProps(dispatch) {
  return {
    //goi action Delete
    deleteList: (payload) => dispatch(selectedTaskId(payload)),
    deleteConfirm :()=> dispatch(deleteTaskLoad()),
    // gui action luu input add vao reducer
    inputAddToDo: (payload) => dispatch(changeInputTodo(payload)),
    // goi action Create
    addList: () => {
      dispatch(createTask());
    },
    //gui action luu iput Edit vao reducer
    onChangeInputTask: (id, task) => dispatch(changeEditTask(id, task)),
    // goi action Edit
    submitUpdateTask: () => dispatch(updateTask()),
    // goi action load list
    loadDataDefault: () => {

      dispatch(loadingData())
    }

  };
}
const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  loading: makeSelectLoading()
  // error: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddPage);
