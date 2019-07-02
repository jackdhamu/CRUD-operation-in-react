import React from 'react';
import { Layout , List,Spin , Skeleton } from 'antd';
import CommonHeader from './CommonHeader';
import * as actionCreator from "./store/actions";
import {connect} from "react-redux";
import Topiclist from './Topiclist';
let data = [ ];

class Profile extends React.Component { 
    state={
      redirect:false,
      topic:"",
      skloader:true,
      pagerender:true
    }

componentDidMount() {
    this.props.ApiCall();
}
componentWillReceiveProps(newprops)
{
  if(this.state.skloader){
    this.setState({skloader:false}); 
    data=[];
    (newprops.details).map( (details,index)=> {
      var Catogory=details.Categories;
   return (data.push({
      key:index,
      name:Catogory,
    })); 
  }); 
  } 
}
navigate(cat) {
    const place=cat;
    this.setState({topic:place});
    this.props.Topiclist(cat);  
}  
test(){
  
  return true;
}

render(){ 
 
 if(this.props.loader&&!this.test)
   {
     return(<div className="spinner">
               <Spin size="large"  spinning />
           </div>);
   }
   else{

    if(this.props.topiclist) {
     return <Topiclist topic={this.state.topic}/>;
    }
   }
   
  return(
      <Layout>
      <CommonHeader page="profile" />
                 <div className="page-container" > 
                 <h1 className="top-title">Select a Category of Game</h1>
                 <Skeleton loading={this.state.skloader}>
                 <List className="List-view"
                     dataSource={data}
                     renderItem={item => (
                      <List.Item>
                        { <div id={item.name} onClick={(e)=>  { this.navigate(e.target.id);} }>{item.name}</div> }
                      </List.Item>
                    )}
                  /></Skeleton>
                 </div>
          </Layout>            
          );
  }
}

const mapStateToProps = (state) =>{
  return{
  details:state.details,
  loader:state.loader,
  topiclist:state.topiclist,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      ApiCall :()=> dispatch(actionCreator.ApiCall_Topics()),
      Topiclist:(val)=>dispatch(actionCreator.Topiclist(val))   
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Profile);
