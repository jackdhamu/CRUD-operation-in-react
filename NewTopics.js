import React from 'react';
import { Layout, Card, Button, Form, Input } from 'antd';
import axios from 'axios';
import swal from 'sweetalert';
import Footermenu from './Footermenu';
const { Content } = Layout;
let url="https://api.backendless.com/6528DEB0-1A33-6813-FF4A-EE6DB96AE100/9BC79422-3D70-8C41-FF64-685289070500/data/Student_Details";

class NewTopic extends React.Component {
     constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
   }
     state = {
    confirmDirty: false,
    autoCompleteResult: [],
    name:"",
    avg:"",
    cur:"",
  };
    
    handleSubmit = e => {

    e.preventDefault();  
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        axios.post(url,values)
        .then(()=>
                  { 
                    console.log("success");
                    swal("Good job!", "Details Entry has been Succes!", "success");  
                    });
                      }
    this.props.form.resetFields();
        
    });
  };
     render() {
        const { getFieldDecorator } = this.props.form;

   return(<Layout>
      <Content>
          <Card className="card-block new-topics">
            <div className="title">
                <h4>New Details</h4>
            </div>
            <Form layout="vertical" onSubmit={this.handleSubmit}>
            <label>Name:</label>
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true, message: 'Please Enter the name!',
                  },
                ],
              })(<Input  />)}
            </Form.Item>
             <label>Avarage Grades</label>
            <Form.Item>
              {getFieldDecorator('grade', {
                rules: [
                  {
                    required: true, message: 'Please Enter the Grade!',
                  },
                ],
              })(<Input  />)}
            </Form.Item>
             <label>Curriculam</label>
                 
            <Form.Item>
              {getFieldDecorator('Curriculum', {
                rules: [
                  {
                    required: true, message: 'Please Enter the Curriculum!',
                  },
                ],
              })(<Input  />)}
            </Form.Item>
         
          <Form.Item>
            <Button className="btn-secondary" type="primary" htmlType="submit" style={{margin:0}} block>
              Submit
            </Button>
          </Form.Item>
          </Form>
          <a className="bottom-link" href="/topics">Back.</a>
          </Card>
          
      </Content>
      <Footermenu />
    </Layout>);
}
}
const NewTopics = Form.create()(NewTopic)
export default NewTopics;

