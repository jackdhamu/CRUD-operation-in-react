import React from 'react';
import { Layout, Card, Button, Form, Input, Divider } from 'antd';
import { Redirect } from "react-router-dom";
import Footermenu from './Footermenu';
import * as actionCreator from "./store/actions";
import {connect} from "react-redux";
const { Content } = Layout;

class Signin extends React.Component {
    state={
      emailValid:"",
      passValid:"",
    }  
 handleSubmit = e => {
          e.preventDefault();
          this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
                        this.props.Auth(values);
                        this.state={
                          loader:true,
                        }  
                          }
            else{
              this.state={
                emailValid:true,
                passValid:true
              }  
            }
                        });
                        this.setState({emailValid:!this.props.emailValid,passValid:!this.props.passValid});
                      };

    
  renderRedirect = () => {
    if (this.props.redirect) {
      return <Redirect to='/mainpage' />
    }
  };    

render() {
const { getFieldDecorator } = this.props.form;
        return(<Layout>
      <Content>
          <Card className="card-block">
            <div className="title">
                <h4>Welcome back</h4>
                <p>Please sign in to your account</p>
            </div>
            <Form layout="vertical" onSubmit={this.handleSubmit}>
            <label>Your Email Address</label>
            <Form.Item help = { this.state.emailValid ? "Invalid Email" : ""} >
              {getFieldDecorator('email', {
                rules: [
                  {
                    required:'true',message:'Please Input your Email',
                  },
                ],
              })(<Input type="email" name="email" placeholder="E-mail" />)}

            </Form.Item>
            <label>Password</label>
            <Form.Item  help = { this.state.passValid ? "Invalid Password" : "" } >
              
                 {getFieldDecorator('password', {
                rules: [
                  {
                    required:'true',message:'Please Input your Password',
                  },
                ],
              })(<Input type="password" name="password"  placeholder="Password" />)}


            </Form.Item>
                
            <Form.Item>
                <Button className="btn-primary" htmlType="submit" loading={this.state.loader}  block>
                  Login
                </Button>
              </Form.Item>
             <Divider>or</Divider>
                <Button href="./signup" type="link" block>
                  Signup
                </Button>
         {this.renderRedirect()}
          </Form>
          <p className="terms"><small><em>By clicking Log in you agree to our terms and conditions</em></small></p>
          <a className="bottom-link" href="/forgot">Forgotten password?</a>
          </Card>
          
      </Content>
      <Footermenu />
    </Layout>);
  
}
}

const mapStateToProps = (state) =>{
  //console.log(state);
  return{
    email:state.email,
    emailValid:state.emailValid,
    passValid:state.passValid,
    redirect:state.redirect,
    btnLoader:state.btnLoader
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      Auth: (email) => dispatch(actionCreator.AuthLogin(email)),
  }
}

const SigninPage = Form.create()(Signin)
export default connect(mapStateToProps,mapDispatchToProps)(SigninPage);

