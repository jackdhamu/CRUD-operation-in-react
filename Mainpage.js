import React from 'react';
import { Layout} from 'antd';
import CommonHeader from './CommonHeader';
class MainPage extends React.Component { 

    render() { 
        
             return(   
               <Layout>
                    <CommonHeader page="mainpage"/>
                    <div className="page-header"> This is Home Page </div>
               </Layout> 
             );
      }
}
export default MainPage;