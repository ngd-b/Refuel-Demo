import React,{Suspense,lazy} from 'react';
import {render} from 'react-dom';
import {Spin} from 'antd';
import "antd/dist/antd.css";
import 'antd-mobile/dist/antd-mobile.css';

import './index.less';
import './request/user.js'
// 加载组件
const MainPage = lazy(()=>import("@component/main"));
function App(){
    // 控制状态
    return (<div>
        <Suspense fallback={<Spin tip="载入中..." />}>
            <MainPage />
        </Suspense>
    </div>);
}

render(<App /> , document.getElementById("app"));