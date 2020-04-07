import React,{Suspense,lazy} from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import {Spin} from 'antd';
import "antd/dist/antd.css";
import 'antd-mobile/dist/antd-mobile.css';

import './index.less';
import './request/user.js';
// 加载组件
const MainPage = lazy(()=>import("@component/main"));
const Test = lazy(()=>import('@component/test'));
function App(){
    // 控制状态
    return (<div>
        <Router>
            <Suspense fallback={<Spin tip="载入中..." />}>
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route path="/test" component={Test} />
                </Switch>
            </Suspense>  
        </Router>
    </div>);
}   

render(<App />, document.getElementById("app"));