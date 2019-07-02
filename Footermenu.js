import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
const { Footer } = Layout;

function Footermenu() {
   return(<Footer className="footer">
            <ul>
                <li>About Reactor</li>
                <li>Privacy</li>
                <li>Terms</li>
                <li>Help</li>
            </ul>
      
          </Footer>);
}
export default Footermenu;
