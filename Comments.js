import React from 'react';
import * as actionCreator from "./store/actions";
import {connect} from "react-redux";
import { Layout, Form,Card,Rate, Modal, Input,Spin, Skeleton } from 'antd';
const { TextArea } = Input;

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    state={
      rate:2,
    }
    rateChange = value => {
      this.setState({ rate:value });
    };
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Rating & Feedback"
          okText="Submit"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
          <div className="center">
                  <h2>Ratings</h2>
                  <Form.Item>
                  <i onClick={this.showModal}>
                  {getFieldDecorator('rate') (
                      <Rate DefaultValue={this.state.rate} onChange={this.rateChange} />)}
                      </i>
                    </Form.Item>
                  <p>(2 Ratings)</p>
                  <p>Click the above star to rate it.</p>   
              </div>
            <Form.Item label="Comments">
              {getFieldDecorator('description',{
                    rules: [{ required: true, message: 'Please input your comments!', whitespace: true }],
                  }) (<TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);


class Comments extends React.Component { 
    state = {
      visible: false,
      topic:"Topic",
      category:"Category",
      postby:"name",
      Description:"Game Description",
      users:"",
      commentsloader:true
    };
    componentDidMount() {
     this.props.Apicall(this.props.details);
     this.props.fetchCommets(this.props.details);
    }
    componentWillReceiveProps(newprops){
      this.setState({commentsloader:newprops.false});
      if(newprops.commentdetails){
        this.setState({
            topic:newprops.commentdetails[0].Topics,
            category:newprops.commentdetails[0].Categories,
            Description:newprops.commentdetails[0].Description,
          });
      } 
    }
    showModal = () => {
      this.setState({ visible: true });
    };
    handleCancel = () => {
      this.setState({ visible: false });
    };
    handleCreate = () => {
      const form = this.formRef.props.form;
      form.validateFields((err, values) => {
        if (!err) {
          var commentDetails={
               name:this.props.username,
               topic:this.props.details,
               comments:values.description,
               stars:values.rate
          }
          this.props.SubmitComments(commentDetails);
        form.resetFields();
        this.setState({ visible: false });
        }
        else{
          return;
        }
        
      });
    };
  
    saveFormRef = formRef => {
      this.formRef = formRef;
    };

render(){ 
  if(this.props.commentloader && !this.props.fetchDetails.data.length)
  {
    if(this.props.commentdetails){
      console.log(this.props.commentdetails);
      this.setState({topic:this.props.topiclist});
    }
    return(<div className="spinner">
              <Spin size="large"  spinning />
          </div>);
  }
  else{
    let membersToRender=this.props.fetchDetails.data;
  return(<Layout>
              <Card className="comments-card">
                  <h6>{this.state.category}</h6>
                  <h1>{this.state.topic}</h1>
                  <p className="comments">{this.state.Description}</p>
                  <p>posted by <span>Kandasamy</span> 14 Jan 2016, 6 pm.</p>
              </Card>
              <Card className="comments-card center">
                  <h2>Ratings</h2>
                    <i hres="#" onClick={this.showModal}>
                    <Rate  value={3} /></i>
                    <CollectionCreateForm
                      wrappedComponentRef={this.saveFormRef}
                      visible={this.state.visible}
                      onCancel={this.handleCancel}
                      onCreate={this.handleCreate}
                    />
                  <p>({this.props.fetchDetails.data.length} Ratings)</p>
                  <p>Click the above star to rate it.</p>   
              </Card>
              <Card title="Reviews" className="comments-card list">
               <Skeleton loading={this.state.commentsloader}>
              {   
                (this.props.fetchDetails.data.length)?(
                  membersToRender.map((details, index) => {
                    return  <Card key={index} className="card-row" type="flex">
                    <img src={require("./img/profile.png")} alt="profile" />
                    <div className="content">
                      <h3><span>{details.name}</span></h3>
                      <p>{details.comments}</p>
                      <h5 className="date">12 Jan 2016</h5>
                      <Rate allowClear={false} defaultValue={parseInt(details.stars)} />
                    </div>
                  </Card>
                  })
                
                ):(<div className="content result-none"><h3 className="center"><span>No Reviews Found</span></h3></div>)

                }
                </Skeleton>
              </Card>
        </Layout>);
  }
}
}

 const mapStateToProps = (state) =>{
   return{
    commentdetails:state.commentdetails,
    commentloader:state.commentloader,
    username:state.username,
    fetchDetails:state.fetchDetails,
    fetchloader:state.fetchloader,
    }
 }

 const mapDispatchToProps = (dispatch) => {
   return {
     Apicall: (val) => dispatch(actionCreator.Comments_Details(val)),
     SubmitComments: (val)=> dispatch(actionCreator.SubmitComments(val)),
     fetchCommets:(val)=>dispatch(actionCreator.fetchCommets(val))
   }
 }


export default connect(mapStateToProps,mapDispatchToProps)(Comments);
