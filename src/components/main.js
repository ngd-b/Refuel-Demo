/**
 * 无感支付加油演示DEMO
 */
import React,{useState,useEffect} from 'react';
import {Row,Col,Card,notification,Spin} from 'antd';
import {UpOutlined} from '@ant-design/icons';
import Texty from 'rc-texty';
import {Flex} from 'antd-mobile';
import _ from 'lodash';
import io from 'socket.io-client';

// 其他样式、组件
import './main.less';
import moment from 'moment';

notification.config({
    duration:6
});
// socket 数据通信
const socket = io('http://localhost:8088',{
    path:"/"
});

function MainPage(props){
    // 获取智能视频识别系统监测的数据信息
    const [showCarInfo,setShowCarInfo] = useState({});
    // 加完油，获取加油的数据信息
    const [refuelInfo,setRefuelInfo] = useState({});
    // 请求支付款项，
    const [totalCost,setTotalCost] = useState({});
    // 开票信息
    const [billingInfo,setBillingInfo] = useState({});
    // 初始化数据
    let timer = null;
    function delay(fn,duration=4000){
        timer = setTimeout(function(){
            fn();
        },duration);
    }
    useEffect(()=>{
        // 加油信息
        if(_.isString(showCarInfo.name)&&_.isEmpty(refuelInfo)){
            delay(()=>{
                setRefuelInfo({
                    oilMachine:"4",
                    oilGunNumber:"12",
                    constOil:50,
                    priceOil:7,
                    totalCost:7 * 50,
                    createTime:moment().format("YYYY-MM-DD HH:mm:ss"),
                    oilLabel:showCarInfo.oilLabel
                });
                setShowCarInfo(preVal=>{
                    return {
                        ...preVal,
                        rotate:180
                    }
                });
                notification.success({
                    message:"信息提示",
                    description:"加油完成，正在付款!"
                });
            });
        }
    },[showCarInfo]);
    useEffect(()=>{
        if(_.isEmpty(billingInfo)&&!_.isEmpty(totalCost)){
            let invoice = showCarInfo.invoice;
            let obj = _.isEmpty(invoice.headerType)?{
                headerType:"公司抬头",
                invoiceHeader:"江苏金晓电子信息股份有限公司",
                invoiceNumber:"9130200732453342",
                invoiceContent:"加油服务费用",
                invoiceAmount:refuelInfo.totalCost,
                receiveWay:"admin@aliy.com"
            }:{
                headerType:invoice.headerType,
                invoiceHeader:invoice.invoiceHeader,
                invoiceNumber:invoice.invoiceNumber,
                invoiceContent:invoice.invoiceContent,
                invoiceAmount:refuelInfo.totalCost,
                receiveWay:invoice.receiveWay
            }
            delay(()=>{
                setBillingInfo(obj);
                setTotalCost(preVal=>{
                    return {
                        ...preVal,
                        rotate:180
                    }
                });
            });
            delay(()=>{
                // 初始化清空数据
                setShowCarInfo({});
                setRefuelInfo({});
                setTotalCost({});
                setBillingInfo({});
            },8000);
        }
    },[totalCost]);
    useEffect(()=>{
        // 付款结果信息
        if(_.isEmpty(totalCost)&&!_.isEmpty(refuelInfo)){
            delay(()=>{
                setTotalCost({
                    cost:refuelInfo.totalCost,
                    payWay:"银联支付",
                    result:"付款成功",
                    id:"MH21562893134",
                    createTime:moment().format("YYYY-MM-DD HH:mm:ss")
                });
                setRefuelInfo(preVal=>{
                    return {
                        ...preVal,
                        rotate:180
                    }
                });
                notification.success({
                    message:"信息提示",
                    description:"完成支付，祝您一路平安!"
                });
            });
        }
    },[refuelInfo]);
    useEffect(()=>{
        // 识别来车信息
        socket.on("init",function(obj){
            console.log("receive-init:"+JSON.stringify(obj));
            delay(()=>{
                setShowCarInfo({
                    number:obj.carNum,
                    color:obj.carColor,
                    type:obj.carType
                });
                notification.success({
                    message:"信息提示",
                    description:"来车信息识别成功!"
                });
            });
        });
        // 车主注册信息
        socket.on("user",function(obj){
            console.log("receive-user:"+JSON.stringify(obj));
            // 有注册信息
            if(obj.result){
                obj = obj.data;
                delay(()=>{
                    setShowCarInfo(preVal=>{
                        return {...preVal,...{
                            name:obj.name,
                            id:obj._id,
                            integal:obj.integal,
                            oilLabel:obj.oilLabel,
                            invoice:obj.invoiceInfo||{}
                        }}
                    });
                    notification.success({
                        message:"信息提示",
                        description:"车主注册信息查询成功!"
                    });
                },8000);
            }else{
                notification.warning({
                    message:"信息提示",
                    description:"车主未注册，请现场工作人员协助!"
                });
            }
        });
    },[]);
    // 处理展开、收缩操作
    function handleExpand(flag,e){
        switch(flag){
            case "car":
                setShowCarInfo(preVal=>{
                    return {
                        ...preVal,
                        rotate:preVal.rotate===180?0:180
                    }
                });
            break;
            case "oil":
                setRefuelInfo(preVal=>{
                    return {
                        ...preVal,
                        rotate:preVal.rotate===180?0:180
                    }
                });
            break;
            case "billing":
                setTotalCost(preVal=>{
                    return {
                        ...preVal,
                        rotate:preVal.rotate===180?0:180
                    }
                });
            break;
            case "invoice":
                setBillingInfo(preVal=>{
                    return {
                        ...preVal,
                        rotate:preVal.rotate===180?0:180
                    }
                });
            break;
            default:
                console.log("不支持的事件操作!");
        }
    }
    return (<div id="main">
        {_.isEmpty(showCarInfo)?(
        <Row>
            <Col span={24}>
                <Texty interval={300} style={{marginTop:100,textAlign:"center",fontSize:48}}>无感加油支付</Texty>
            </Col>
        </Row>):(
        <Row>
            <Col span={24}>
                <Card title={<span>车辆信息</span>} extra={<UpOutlined onClick={(e)=>handleExpand("car",e)} rotate={showCarInfo.rotate} />}>
                    <div className="custom-card-body" style={{display:showCarInfo.rotate===180?"none":"block"}}>
                        <p>车辆识别信息</p>
                        <Flex className="listInfo">
                            <Flex.Item>车牌号：</Flex.Item>
                            <Flex.Item>{showCarInfo.number}</Flex.Item>
                        </Flex>
                        <Flex className="listInfo">
                            <Flex.Item>车身颜色：</Flex.Item>
                            <Flex.Item>{showCarInfo.color}</Flex.Item>
                        </Flex>
                        <div style={{display:_.isEmpty(showCarInfo)?"none":"block"}}>
                            {!_.isString(showCarInfo.name)?(<Spin tip="正在查询车辆注册信息" />):(<React.Fragment>
                                <p>车辆注册信息</p>
                                <Flex className="listInfo">
                                    <Flex.Item>姓名：</Flex.Item>
                                    <Flex.Item>{showCarInfo.name}</Flex.Item>
                                </Flex>
                                <Flex className="listInfo">
                                    <Flex.Item>油标号：</Flex.Item>
                                    <Flex.Item>{showCarInfo.oilLabel}</Flex.Item>
                                </Flex>
                                <Flex className="listInfo">
                                    <Flex.Item>积分：</Flex.Item>
                                    <Flex.Item>{showCarInfo.integal}</Flex.Item>
                                </Flex>
                                <Flex className="listInfo">
                                    <Flex.Item>会员卡号：</Flex.Item>
                                    <Flex.Item>{showCarInfo.id}</Flex.Item>
                                </Flex>
                            </React.Fragment>)}
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>)}
        <Row>
            <Col span={24}>
                <Card title={<span>加油信息</span>} extra={<UpOutlined onClick={(e)=>handleExpand("oil",e)} rotate={refuelInfo.rotate} />} style={{display:!_.isString(showCarInfo.name)?"none":"block"}}>
                    <div className="custom-card-body" style={{display:refuelInfo.rotate===180?"none":"block"}}>
                        {_.isEmpty(refuelInfo)?(<Spin tip="正在加油" />):(<React.Fragment>
                            <Flex className="listInfo">
                                <Flex.Item>油机编号：</Flex.Item>
                                <Flex.Item>{refuelInfo.oilMachine}</Flex.Item>
                            </Flex>
                            <Flex className="listInfo">
                                <Flex.Item>油枪编号：</Flex.Item>
                                <Flex.Item>{refuelInfo.oilGunNumber}</Flex.Item>
                            </Flex>
                            <Flex className="listInfo">
                                <Flex.Item>油标号：</Flex.Item>
                                <Flex.Item>{refuelInfo.oilLabel}</Flex.Item>
                            </Flex>
                            <Flex className="listInfo">
                                <Flex.Item>加油量：</Flex.Item>
                                <Flex.Item>{refuelInfo.constOil} &nbsp;L</Flex.Item>
                            </Flex>
                            <Flex className="listInfo">
                                <Flex.Item>单价：</Flex.Item>
                                <Flex.Item>{refuelInfo.priceOil} &nbsp;元/L</Flex.Item>
                            </Flex>
                            <Flex className="listInfo">
                                <Flex.Item>总费用：</Flex.Item>
                                <Flex.Item>{refuelInfo.totalCost} &nbsp;元</Flex.Item>
                            </Flex>
                            <Flex className="listInfo">
                                <Flex.Item>完成时间：</Flex.Item>
                                <Flex.Item>{refuelInfo.createTime}</Flex.Item>
                            </Flex>
                        </React.Fragment>)}
                    </div>
                    
                </Card>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Card title={<span>支付信息</span>} extra={<UpOutlined onClick={(e)=>handleExpand("billing",e)} rotate={totalCost.rotate} />} style={{display:_.isEmpty(refuelInfo)?"none":"block"}}>
                    <div className="custom-card-body" style={{display:totalCost.rotate===180?"none":"block"}}>
                        {_.isEmpty(totalCost)?(<Spin tip="付款中" />):(<React.Fragment>
                            <Flex className="listInfo">
                                <Flex.Item>付款金额：</Flex.Item>
                                <Flex.Item>{totalCost.cost}</Flex.Item>
                            </Flex>
                            <Flex className="listInfo">
                                <Flex.Item>付款方式：</Flex.Item>
                                <Flex.Item>{totalCost.payWay}</Flex.Item>
                            </Flex>
                            <Flex className="listInfo">
                                <Flex.Item>付款结果：</Flex.Item>
                                <Flex.Item>{totalCost.result}</Flex.Item>
                            </Flex>
                            <Flex className="listInfo">
                                <Flex.Item>回执编号：</Flex.Item>
                                <Flex.Item>{totalCost.id}</Flex.Item>
                            </Flex>
                            <Flex className="listInfo">
                                <Flex.Item>完成时间：</Flex.Item>
                                <Flex.Item>{totalCost.createTime}</Flex.Item>
                            </Flex>
                        </React.Fragment>)}
                    </div>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Card title={<span>开票信息</span>} extra={<UpOutlined onClick={(e)=>handleExpand("invoice",e)} rotate={billingInfo.rotate} />} style={{display:_.isEmpty(totalCost)?"none":"block"}}>
                    <div className="custom-card-body" style={{display:billingInfo.rotate===180?"none":"block"}}>
                        {_.isEmpty(billingInfo)?(<Spin tip="加载开票信息" />):(<React.Fragment>
                            <Flex className="listInfo">
                                <Flex.Item>抬头类型：</Flex.Item>
                                <Flex.Item>{billingInfo.headerType}</Flex.Item>
                            </Flex>
                            <Flex className="listInfo">
                                <Flex.Item>发票抬头：</Flex.Item>
                                <Flex.Item>{billingInfo.invoiceHeader}</Flex.Item>
                            </Flex>
                            <Flex className="listInfo">
                                <Flex.Item>发票税号：</Flex.Item>
                                <Flex.Item>{billingInfo.invoiceNumber}</Flex.Item>
                            </Flex>
                            <Flex className="listInfo">
                                <Flex.Item>发票内容：</Flex.Item>
                                <Flex.Item>{billingInfo.invoiceContent}</Flex.Item>
                            </Flex>
                            <Flex className="listInfo">
                                <Flex.Item>开票金额：</Flex.Item>
                                <Flex.Item>{billingInfo.invoiceAmount}</Flex.Item>
                            </Flex>
                            <Flex className="listInfo">
                                <Flex.Item>接收方式：</Flex.Item>
                                <Flex.Item>{billingInfo.receiveWay}</Flex.Item>
                            </Flex>
                        </React.Fragment>)}
                    </div>
                    
                </Card>
            </Col>
        </Row>
    </div>);
}

export default MainPage;