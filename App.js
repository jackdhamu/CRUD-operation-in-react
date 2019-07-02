import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import SigninPage from './SigninPage';
import SignupPage from './SignupPage';
import ForgotPage from './ForgotPage';
import MainPage from './Mainpage';
import Profile from './Profile';
import Topics from './Topics';
import Topiclist from './Topiclist';
import NewTopics from './NewTopics';
import Comments from './Comments';
import { BrowserRouter, Route} from 'react-router-dom';

const Signin = () => {
        return(<SigninPage />);
    };
const Signup= () => {
        return(<SignupPage />);
    };
const Forgot = () => {
        return(<ForgotPage />);
    };
const Mainpage = () => {
    return(<MainPage />);
    };
           
const profile = () => {
    return(<Profile />);
    };
const topics = () => {
    return(<Topics />);
    };
 const topiclist = () => {
         return(<Topiclist />);
         };
const newtopics = () => {
    return(<NewTopics />);
    };
const comments = () => {
        return(<Comments />);
        };

const App=()=>{
        return ( 
                <div>
                      <BrowserRouter>
                        <div>
                            <Route path="/" exact component={Signin}/>
                            <Route path="/Signin" component={Signin} />
                            <Route path="/Signup" component={Signup}/>
                            <Route path="/Forgot" component={Forgot}/>
                            <Route path="/Mainpage" component={Mainpage}/>
                            <Route path="/Profile" component={profile}/>
                            <Route path="/Topics" component={topics}/>
                            <Route path="/Topiclist" component={topiclist}/>
                            <Route path="/NewTopics" component={newtopics}/>
                            <Route path="/Comments" component={comments}/>
                        </div>
                      </BrowserRouter>
               </div>
              );   
        }; 

export default App;
                                                                