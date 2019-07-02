import React from 'react';
import { Link, Redirect} from 'react-router-dom';
import{ Layout,Button, Spin} from 'antd'; 
const {Content} = Layout;
const jwt = require('jsonwebtoken');
let user_details=sessionStorage.getItem('user');
let users;

class CommonHeader extends React.Component {
 
    state={
        redirect:false,
        main:"",
        profile:"",
        topics:"",
        loader:true,
    }
componentDidMount() {
    if(sessionStorage.getItem('user'))
        {
         users=jwt.verify(user_details, 'key_value');
         this.setState({loader:false});
        }
    if(this.props.page==='mainpage')
    {
        this.setState({main:'active'});
    }
    else if(this.props.page==='profile')
    {
        this.setState({profile:'active'});
    }
    else if(this.props.page==='topics')
    {
        this.setState({topics:'active'});
    }
    
}

    renderRedirect(){
        if(this.state.redirect)
        {
            return(<Redirect to="/" />);
        }
    }

    logOut(){
      localStorage.clear();
      this.setState({redirect:true});    
    }

render()
{
    
  

    if(this.state.loader) {
          return( <div className="spinner">
                    <Spin size="small" />
                 </div>
                );
    }
    else {
        
    return(
         (users) ? (
             <Content>
                  <div className="main-content">
                        <Link to='/Mainpage' className={this.state.main} >Home</Link> | <Link to="/Profile" className={this.state.profile}>Profile</Link> | <Link to="/Topics" className={this.state.topics}>Topics</Link> |  
             {this.renderRedirect()}
                        <Button onClick={()=>{this.logOut()}} type="link" >Logout</Button>
                  </div> 
              </Content>
            ) : (<Redirect to='/' />)
         
    );
    }
}
}
export default CommonHeader;