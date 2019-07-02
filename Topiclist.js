import React from 'react';
import { Layout , List, Skeleton} from 'antd';
import * as actionCreator from "./store/actions"; 
import {connect} from "react-redux";
import Comments from "./Comments";
let data = [ ];

class Topiclist extends React.Component { 
    state={
      details:"",
      detailspass:"",
      pagerender:true,
      skloading:true
    }

componentDidMount() {
  this.props.ApiCall(this.props.topic);
}
navigate(val) {
  this.setState({detailspass:val});
}

componentWillReceiveProps() { 
  if(this.state.pagerender){
    data=[];
      if(!this.props.topiclist.data.length){
        data.push({
          key:Math.random(),
          name: "No Topics Found",
        })
      }
  (this.props.topiclist.data).map( (details,index)=> { 
    return (data.push({
      key:index,
      name: details.Topics,
    })); 
  });
  this.setState({skloading:false});
  }
}
render(){ 
  if(this.state.detailspass) {
    return <Comments details={this.state.detailspass}/>;
   }
  return(
      <Layout>
                 <div className="page-container topics" > 
                 <h1 className="top-title">Select a Topics of Game</h1>
                 <Skeleton loading={this.state.skloading}>
                 <List className="List-view"
                     dataSource={data}
                     renderItem={item => (
                      <List.Item>
                        { 
                           ({item})?(<div id={item.name} onClick={(e)=> {this.navigate(e.target.id);} }>{item.name}</div>):(<div>No Data Found</div>)
                         }
                      </List.Item>
                    )}
                  />
                  </Skeleton>
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
      ApiCall :(val)=> dispatch(actionCreator.Topiclist(val)),
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Topiclist);
