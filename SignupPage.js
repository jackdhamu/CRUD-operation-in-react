import React from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import { Layout, Card, Button, Form, Input} from 'antd';
import Footermenu from './Footermenu';
const { Content } = Layout;
let emailVerify="false";
const FormItem = Form.Item;
let url="https://api.backendless.com/6528DEB0-1A33-6813-FF4A-EE6DB96AE100/9BC79422-3D70-8C41-FF64-685289070500/data/signin_page";
let temp1;
class Signup extends React.Component {
   constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state={
            items:[],
      }

      fetch(url)
        .then(res => res.json())
        .then(json => {this.setState({ items:json,})})
        .then(()=>{
             temp1=  (this.state.items).map(mail=>({mail:mail.email,pass:mail.password}));
      })
   }

  state = {
    confirmDirty: false,        
    redirect: false,
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/signin' />
    }
  }
  validateEmail = (rule, value, callback) => {
    const form = this.props.form;
     for(var i in temp1) {
        if(temp1[i].mail===form.getFieldValue('email')) {
                   emailVerify="true";
                   break;
                }
         else{
             emailVerify="false";
         }
     }
     if(emailVerify==="true")
         callback("That Email has been already registered.");
     else
         callback();
  }; 
      
  handleSubmit = e => {
    console.log("hello");
    e.preventDefault();  
    console.log("hascsa");
    this.props.form.validateFieldsAndScroll((err,values) => {
      console.log("hai");
      if (!err) {
        
        console.log('Received values of form: ', values);
        axios.post(url,values)
        .then(()=>
                  { 
                    console.log("success");
                    swal("Good job!", "You SignUp has beeen completed !", "success");
                    this.setState({ redirect: true });   
                    });
                      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if(form.getFieldValue('password')){
      if(value.length<6){
        callback("Password must be greater then 6.");
      }
    }
    else{
        callback();
    }
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return(<Layout>
      <Content>
          <Card className="card-block register">
            <div className="title">
                <h4>Register Now</h4>
                <p>Join a growing community.</p>
            </div>
            <Form layout="vertical" onSubmit={this.handleSubmit}>        
           <label>Name</label>
              <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                  {getFieldDecorator('Firstname', {
                    rules: [{ required: true, message: 'Please input your firstname!', whitespace: true }],
                  })(<Input name="Firstname" placeholder="First" />)}
             </Form.Item>
            <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}></span>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} >
                    {getFieldDecorator('Lastname', {
                    rules: [{ required: true, message: 'Please input your lastname!', whitespace: true }],
                  })(<Input name="Lastname" placeholder="Last" />)}
            </Form.Item>
            <label>Your current email address</label>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [
                 
                  {
                    required: true, message: 'Please input your Email!',
                  },
                  
                ],
              })(<Input name="email" placeholder="Email address" />)}
            </FormItem>
            <label>Choose your username</label>
            <FormItem>
             {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
              })(<Input name="username"  placeholder="Username" />)}
            </FormItem>
            <label>Create a password</label>
            <FormItem>
             {getFieldDecorator('password', {
                rules: [
                    {
                        required: true, message: 'Please input your password!',
                    },
                    {
                        validator: this.validateToNextPassword,
                    },
                      ],
                    })(<Input name="password" type="password" placeholder="Password" />)}
            </FormItem>
            <label>Conform your password</label>
            <FormItem>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input id="pass2" placeholder="Confirm password" type="password"/>)}
            </FormItem>
            <FormItem>   
                <Button className="btn-primary" type="primary" htmlType="submit" block>
                    Create Account
                </Button>
            </FormItem>
            {this.renderRedirect()}
          </Form>
          <p className="terms"><small><em>By clicking Log in you agree to our terms and conditions</em></small></p>
          <a className="bottom-link" href="/signin">Insteed of Login.</a>
          </Card>
          
      </Content>
      <Footermenu />
    </Layout>);
    }
}

var SignupPage = Form.create()(Signup)
export default SignupPage;