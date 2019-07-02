import React from 'react';
import { Layout , Table, Button, Input ,Spin ,Form,Skeleton } from 'antd';
import CommonHeader from './CommonHeader';
import swal from '@sweetalert/with-react';
import * as actionCreator from "./store/actions";
import {connect} from "react-redux";
let place,node;
let student;  
const Search = Input.Search;
let data=[];
const columns = [
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

class Topics extends React.Component { 
    state={
      items:[], 
      selectedRowKeys: [],
      data:[],
       name:"",
       avg:"",
     loader:true,
       key:"",
     skloading:true,
  }
  handleEmailChange =(e)=> {
    this.setState({name: e.target.value});
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }; 


componentDidMount()
{
  this.props.ApiCall();
}

componentWillReceiveProps(newprops) {
  if(newprops.DeleteStatus){
     node=document.getElementById(newprops.DeleteStatus.value);
    node.parentNode.parentNode.parentNode.parentNode.removeChild(node.parentNode.parentNode.parentNode);
  }
  if(newprops.updateDetails){
      node=document.getElementById(newprops.updateDetails.data.objectId);
    console.log(newprops.updateDetails.data);
    node.parentNode.parentNode.parentNode.children[1].innerHTML=newprops.updateDetails.data.name;
    node.parentNode.parentNode.parentNode.children[2].innerHTML=newprops.updateDetails.data.grade;
    node.parentNode.parentNode.parentNode.children[3].innerHTML=newprops.updateDetails.data.Curriculum;
  }
  this.setState({skloading:false});
  }
  
OnSearchKey(val) {
  this.props.Search(val); 
}

render(){ 

  place=this;
  const { selectedRowKeys } = this.state;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };    
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
        hideDefaultSelections: true,
        onSelection: this.onSelection,
      }

    
if(this.props.loader)
  {
    return(<div className="spinner">
              <Spin size="large"  spinning />
          </div>);
  }
  else{

    if(this.props.SearchRes) {
     data=[];
   (this.props.SearchRes.data).map( (details,index)=> {
        console.log(details);
        return(data.push({
          key: index,
          name: details.name,
          avg:details.grade,
          action: <div>
                      <Button className="edit-btn" id={details.objectId} 
                          value={JSON.stringify({name:details.name,avg:details.grade,cur:details.Curriculum,id:details.objectId,key:index})} 
                          onClick={ (e) =>{Updaterow(e.target.id,e.target.value);} } >Edit</Button>
                      <Button className="delete-btn" id={details.objectId} onClick={ (e) =>{Deleterow(e.target.id)}}>Delete</Button>
                  </div>,
          curriculam:details.Curriculum,
        })); 
    
      });
      
    } 
   else{
     if(this.props.details) 
     {
       data=[];
      (this.props.details).map( (details,index)=> {
       return( data.push({
          key: details.objectId,
          name: details.name,
           avg:details.grade,
          action: <div>
                      <Button className="edit-btn" id={details.objectId} 
                          value={JSON.stringify({name:details.name,avg:details.grade,cur:details.Curriculum,id:details.objectId,key:index})} 
                          onClick={ (e) =>Updaterow(e.target.id,e.target.value) }>Edit</Button>
                      <Button className="delete-btn" id={details.objectId} onClick={ (e) =>{Deleterow(e.target.id)} }>Delete</Button>
                  </div>,
          curriculam:details.Curriculum,
        })); 
      });
  }
}
  }

function Updaterow (e,name) {
    student=JSON.parse(name);
    console.log(student);
    swal(
  <div>
       <Form className="login-form">
        <Form.Item {...formItemLayout} label="Student Name">
          <Input id="stName" defaultValue={student.name} placeholder="Please input Student Name" />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Avarage Grade">
          <Input id="Avg" defaultValue={student.avg} placeholder="Please input avarage grade" />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Curriculam">
          <Input id="Cum" defaultValue={student.cur} placeholder="Please input Curriculam" />
        </Form.Item>
       </Form>
  </div>
).then((e)=>{
        if(e)
           { 
               var sname=document.getElementById("stName").value;
               var savg=document.getElementById("Avg").value;
               var scur=document.getElementById("Cum").value;
               var obj={
                 name:sname,
                 avg:savg,
                 cur:scur,
                 id:student.id
               }
               place.props.Updaterow(obj);  
               place.Setstate={skloader:true};
               console.log(place.state.skloader);
           }
    });   
  }
function Deleterow (e) {
      place.props.Del(e);
  }        
    
  return(
      <Layout>
      <CommonHeader page="topics" />
                 <div className="page-body">
                    <Search
                          placeholder="Removing search and results count filter"
                          onSearch={ (value) => {
                              this.OnSearchKey(value); 
                            } }
                          style={{ width: '90%'}}
                        />
                    <Button className='add-btn' href="/NewTopics" style={{padding:12 }}>Add</Button>
                    <hr /> 
                    <Skeleton loading={this.state.skloading}>
                        <Table rowSelection={rowSelection} columns={columns}  dataSource={data} />
                    </Skeleton>
                    <p className="results-show">Showing 1 to {this.props.details.length} of {this.props.details.length} entries</p>
                 </div>
          </Layout>            
          );
  }
}

const mapStateToProps = (state) =>{
  console.log(state);
  return{
  details:state.details,
  loader:state.loader,
  SearchRes:state.SearchRes,
  updateRow:state.updateRow,
  updateDetails:state.updateDetails,
  DeleteStatus:state.DeleteStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      Del: (val) => dispatch(actionCreator.DelRow(val)),
      ApiCall :()=> dispatch(actionCreator.ApiCall()),
      Updaterow:(val)=>dispatch(actionCreator.UpdateRow(val)),
      Search:(val)=>dispatch(actionCreator.Search(val)),
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Topics);
