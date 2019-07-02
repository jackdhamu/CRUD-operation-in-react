const jwt = require('jsonwebtoken');
let user_details=sessionStorage.getItem('user');
let auth={user:""};
if(user_details){
  auth=jwt.verify(user_details, 'key_value');
}

const initialState ={
    loader:true,
    redirect:false,
    columns:[],
    updateRow:false,
    btnLoader:false,
    topiclist:false,
    commentloader:true,
    username:auth.user,
    submitStatus:false,
    fetchDetails:false,
    fetchloader:true,
    fetchDetails:{data:{length:0}},
    emailValid:false,
    passValid:false,
    DeleteStatus:""
};
const column = [
    {
      title: 'Student Name',
      dataIndex: 'name',
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Avarage Grade',
      dataIndex: 'avg',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.avg - b.avg,
    },
    {
      title: 'Curriculam / Occupation',
      dataIndex: 'curriculam',
      filterMultiple: false,
      onFilter: (value, record) => record.address.indexOf(value) === 0,
      sorter: (a, b) => a.curriculam.length - b.curriculam.length,
      sortDirections: ['descend', 'ascend'],
    },
     {
      title: 'Actions',
      dataIndex: 'action',
      defaultSortOrder: 'descend',
      
    },
  ];

const reducer = (state=initialState, action) =>{
    const newState ={...state};
    switch(action.type){
        case "LOGIN_CHECK" : return {
                            ...state,
                            email:action.value.email,
                            emailValid:action.value.emailValid,
                            passValid:action.value.passValid,
                            redirect:action.value.redirect,
                            btnLoader:action.value.btnLoader
                        };
        case "COMMENTS_DATA" : return {
                          ...state,
                          commentdetails:action.value.data,
                          commentloader:false,
                      };
        case "COMMENTS_SUBMIT_DATA" : return {
                        ...state,
                        submitStatus:true,
                    };
        case "DELETE_ROW" : return {
                            ...state,
                            DeleteStatus:action.value,
                        };
        case "SEARCH_DATA" : return {
                          ...state,
                          SearchRes:action.value,
                      };
        case "UPDATE_ROW" :  return {
                          ...state,
                          updateRow:false,
                          updateDetails:action.value,
                      };
        case "APICALL_CHECK" : return {
                            ...state,
                            details:action.value,
                            loader:false,
                            colunms:column,
                        };
        case "TOPIC_LIST_DATA" : return {
                          ...state,
                          topiclist:action.value,
                      };
        case "APICALL_TOPICS_CHECK" : return {
                          ...state,
                          details:action.value,
                          loader:false,
                          topiclist:false
                      };
          case "FETCH_COMMENTS_DATA" : return {
                        ...state,
                        fetchDetails:action.value,
                        fetchloader:false
                    };
                                   
         case "LOADING" : newState.loading=true;
                          break;
        default: break;
    }
    
    return newState;
};

export default reducer;
