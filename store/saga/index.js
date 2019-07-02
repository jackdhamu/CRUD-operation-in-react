import axios from 'axios';
import {takeLatest,put,all,fork} from "redux-saga/effects";
import swal from '@sweetalert/with-react';
var jwt = require('jsonwebtoken');
let authVal,temp2;
let baseurl="https://api.backendless.com/6528DEB0-1A33-6813-FF4A-EE6DB96AE100/9BC79422-3D70-8C41-FF64-685289070500/data";

function* LoginAsync(values) {
  console.log(values.value.email,values.value.password);
    let temp1,passValid=true,emailValid=true,redirect=false;
    let emailVerify="false",passVerify="false";
    yield axios.get(`${baseurl}/signin_page`)
    .then(res =>res.data)
    .then((data)=> { temp1= [...data] })
    .then(()=>{
     for(var i in temp1) {
        if(temp1[i].email===values.value.email) {
                   emailVerify="true";   
                }          
         if(temp1[i].password===values.value.password){
                    passVerify="true";     
       }  
    }
                });
          let details=yield axios.get(`${baseurl}/signin_page?where=email%3D'${values.value.email}'`);

          if(emailVerify==="false"){
                    emailValid=false;
                    console.log("email not works");
                             }
          else if(passVerify==="false"){
                    passValid=false;
                    console.log("pass not works");
                            }
          else{   
                 var token = jwt.sign({ user:details.data[0].Firstname }, 'key_value');
                 sessionStorage.setItem('user',token);
                 redirect=true;
                 emailValid=true;
                 passValid=true;
                }
   
    authVal={
         emailValid:emailValid,
         passValid:passValid,
         email:values.value.email,
         redirect:redirect,
         btnLoader:true,
    }
    yield put({type:"LOGIN_CHECK",value:authVal});
}

function* watchLogin() {
    yield takeLatest("LOGIN",LoginAsync);
}
  function* DeleteRowAsync(values) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete(`${baseurl}/Student_Details/${values.value}`)
          .then((res)=>{console.log(res.data); });
          
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
          
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    yield put({type:"DELETE_ROW",value:values});
}

  function* watchDeleteRow() {
    yield takeLatest("DELETE",DeleteRowAsync);
}

function* ApiCallAsync(values) {   
    yield axios.get(`${baseurl}/Student_Details`)
    .then(res =>res.data)
    .then((data)=> { temp2= [...data] }); 
    yield put({type:"APICALL_CHECK",value:temp2});     
}

  function* watchApiCall() {
    yield takeLatest("APICALL",ApiCallAsync);
}

function* ApiCall_TopicsAsync(values) {   
  yield axios.get(`${baseurl}/Categories`)
  .then(res =>res.data)
  .then((data)=> { temp2= [...data] }); 
  yield put({type:"APICALL_TOPICS_CHECK",value:temp2});     
}

function* watchApiCall_Topic() {
  yield takeLatest("APICALL_TOPICS",ApiCall_TopicsAsync);
}


function* UpdateAsync(values) {
  const res = yield axios.put(`${baseurl}/Student_Details/${values.value.id}`,
               {
                  name: values.value.name,
                  grade: values.value.avg,
                  Curriculum:values.value.cur,
              });
   yield put({type:"UPDATE_ROW",value:res});
}
  function* watchUpdate() {
    yield takeLatest("UPDATE",UpdateAsync);
}
function* TopiclistAsync(values) {
  const res = yield axios.get(`${baseurl}/Topics?where=Categories%3D'${values.value}'`);
   yield put({type:"TOPIC_LIST_DATA",value:res});
  
}
  function* watchTopiclist() {
    yield takeLatest("TOPIC_LIST",TopiclistAsync);
}

function* SearchAsync(values) {
  const res = yield axios.get(`${baseurl}/Student_Details?where=name%20LIKE%20%27${values.value}%25%27`);
   yield put({type:"SEARCH_DATA",value:res});
}
  function* watchSearch() {
    yield takeLatest("SEARCH",SearchAsync);
}
function* CommentsAsync(values) {
  const res = yield axios.get(`${baseurl}/Topics?where=Topics%3D'${values.value}'`);
   yield put({type:"COMMENTS_DATA",value:res});
}
  function* watchCommets() {
    yield takeLatest("COMMENTS",CommentsAsync);
}
function* Comment_SubmitAsync(values) {
  console.log(values.value);
  const res = yield axios.post(`${baseurl}/Rating`,values.value);
   yield put({type:"COMMENTS_SUBMIT_DATA",value:res});
}
  function* watchCommet_Submit() {
    yield takeLatest("COMMENTS_SUBMIT",Comment_SubmitAsync);
}

function* Comment_FetchAsync(values) {
  console.log(values.value);
  const res = yield axios.get(`${baseurl}/Rating?where=Topic%3D'${values.value}'`);
   yield put({type:"FETCH_COMMENTS_DATA",value:res});
}
  function* watchCommet_fetch() {
    yield takeLatest("FETCH_COMMENTS",Comment_FetchAsync);
}


export default function* root() {
    yield all([fork(watchLogin),fork(watchDeleteRow),fork(watchApiCall),fork(watchUpdate),fork(watchCommet_fetch),
      fork(watchSearch),fork(watchApiCall_Topic),fork(watchTopiclist),fork(watchCommets),fork(watchCommet_Submit)]);
  }

  
  