import React from 'react';
import { Layout, Card, Button, Form, Input } from 'antd';
import Footermenu from './Footermenu';
const { Content } = Layout;

class Forgot extends React.Component {
     constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
   }
     state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
    
    handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
     render() {
        const { getFieldDecorator } = this.props.form;

   return(<Layout>
      <Content>
          <Card className="card-block">
            <div className="title">
                <h4>Reset Password</h4>
            </div>
            <Form layout="vertical" onSubmit={this.handleSubmit}>
            <label>E-mail</label>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true, message: 'Please input your E-mail!',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item>
            <Button className="btn-primary" type="primary" htmlType="submit" block>
              Login
            </Button>
           </Form.Item>
          </Form>
          <p className="terms"><small><em>By clicking Log in you agree to our terms and conditions</em></small></p>
          <a className="bottom-link" href="/signin">Login instead.</a>
          </Card>
          
      </Content>
      <Footermenu />
    </Layout>);
}
}
const ForgotPage = Form.create()(Forgot)
export default ForgotPage;

