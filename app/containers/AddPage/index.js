/* eslint-disable react/prop-types */
/*
 * FeaturePage
 *
 * List all the features
 */
import React, { memo, useEffect,useState } from 'react';
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
import {
  makeSelectData,
  makeSelectLoading,
  makeSelectError,
} from './selectors';
import { ChangeInputTodo, updateTask, loadingData,changeEditTask,Delete,Create } from './actions';
import reducer from './reducer';
import saga from './saga';
import * as moment from 'moment';

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
      // border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
  }
}));

export function AddPage({
  onChangeInputTask,
  deleteList,
  InputAddToDo,
  addList,
  loadDataDefault,
  data,
  submitUpdateTask
}) {
  const {format} = require('date-fns');
  const key = 'todoListReducer';
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  //Load List
  useEffect(() => {
    loadDataDefault();
  }, []);

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [text, setText] = useState('');
  const [id, setId] = useState('');
  const [detail,setDetail] = useState({
    description:'',
    createdAt:''
  });
// set du lieu detail
    const handleOpenDetail = (de,cr) => {
       console.log(de,cr)
        setDetail({
          ...detail,
          description:de,
          createdAt:cr
        })
       
        setOpen2(true);
    };
 
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
    console.log(textInput,idTask)
  };
  const handleChangeUpdateTask = e => {
    onChangeInputTask({ idTask: id, taskValue: e.target.value });
  };
  const handleUpdateTask=()=>{
    setOpen(false);
    submitUpdateTask()
  }
  return (
    <div className={classes.root}>
            <Grid container spacing={2}  >
                <Grid item xs={12}>
                    <h3>TO DO LIST</h3>
                </Grid>
                <Grid item xs={12}>
                    <TextField name='description' onChange={InputAddToDo} id="outlined-basic" label="Add List" variant="outlined" />
                    <Tooltip className={classes.button} title="Add" aria-label="add">
                        <Fab onClick={addList}  type="button" color="primary">
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </Grid>
                <Grid item xs={12}>
                    <List className={classes.list}>
                      {
                        data.map((List,index)=>{
                         return <ListItem key={index} role={undefined} dense button onClick={()=>handleOpenDetail(List.description,List.createdAt)} >
                      
                          <ListItemText primary={List.description} />
                          <ListItemSecondaryAction>
                          <IconButton aria-label="edit" color="primary">
                                  <EditIcon onClick={()=>{handleOpenEdit(List.description,List._id)}}></EditIcon>
                              </IconButton>
                              <IconButton onClick={()=>{deleteList(List._id)}} aria-label="delete" color="default">
                                  <DeleteIcon></DeleteIcon>
                              </IconButton>
                          </ListItemSecondaryAction>
                      </ListItem>
                        })
                      }
                        

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
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <TextField defaultValue={text} onChange={handleChangeUpdateTask} id="outlined-basic" label="Edit List" variant="outlined" />
                        <IconButton  onClick={handleUpdateTask} type="submit" aria-label="save" color="primary">
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
                BackdropProps={{
                    timeout: 500,
                }}
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
  addList:PropTypes.func,
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
    deleteList :(id)=> dispatch(Delete(id)),
    // gui action luu input add vao reducer
    InputAddToDo: evt => dispatch(ChangeInputTodo(evt.target.value)),
    // goi action Create
    addList: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(Create());
    },
    //gui action luu iput Edit vao reducer
    onChangeInputTask: evt => dispatch(changeEditTask(evt)),
     // goi action Edit
     submitUpdateTask:()=> dispatch(updateTask()),
    // goi action load list
    loadDataDefault: () => dispatch(loadingData())
   
  };
}
const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  // loading: makeSelectLoading(),
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
