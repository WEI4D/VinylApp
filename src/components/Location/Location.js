import React, {Component} from 'react';
// import { Table, Divider, Tag } from 'antd';
import classNames from "classnames";
import { locationStatusOffAction } from "../../actions/locationStatusAction";
import Header from "../Header/Header";
import "./location.scss";
import { Router,Route,Link,Switch } from "react-router-dom";
import Local from "../Local/Local";
import Downloaded from "../Downloaded/Downloaded";
import {connect} from "react-redux";
import { localStatusOnAction } from "../../actions/localStatusAction";
import { downloadedStatusOnAction } from "../../actions/downloadedStatusAction";
import Downloading from "../Downloading/Downloading";
import { downloadingStatusOnAction } from "../../actions/downloadingStatusAction";
import History from "../History/History";
import { historyStatusOnAction } from "../../actions/historyStatusAction";
class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    callLocal =()=>{
        this.props.dispatch(localStatusOnAction);
    }

    callDownloaded =()=>{
        this.props.dispatch(downloadedStatusOnAction);
    }

    callDownloading =()=>{
        this.props.dispatch(downloadingStatusOnAction);
    }

    callHistory =()=>{
        this.props.dispatch(historyStatusOnAction);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.locationStatus){
            this.refs.LocationStyle.style.display = "block";
        }else{
            setTimeout(()=>{
                this.refs.LocationStyle.style.display = "none";
            },600);
        }
    }

    render() {
        const history = require('history').createBrowserHistory();
        const { locationStatus } = this.props;
        return (
            <Router history={ history }>
                <div ref="LocationStyle" className={
                    classNames({
                        "local": true,
                        "local-move-in": locationStatus,
                        "local-move-out": !locationStatus
                    })
                }>
                    <Header action={ locationStatusOffAction }/>
                    <div className="local-left-menu">
                        <ul className="menu-list">
                            <li onClick={ this.callLocal }>
                                LOCAL
                            </li>
                            <li onClick={ this.callDownloaded }>
                                ED
                            </li>
                            <li onClick={ this.callDownloading }>
                                ING
                            </li>
                            <li onClick={this.callHistory}>
                                HISTORY
                            </li>
                        </ul>
                        <div className="local-left-menu-mask"></div>
                    </div>
                    <div className={
                        classNames({
                            "right-local": true
                        })
                    }>
                        {/*<Local/>*/}
                        <Downloaded/>
                        <Downloading/>
                        <History/>
                    </div>
                </div>
            </Router>
        )
    }
}
const mapStateToProps = (state,ownProps) =>{
    return {
        locationStatus: state.userStatus.location.trigger
    };
}

export default connect(mapStateToProps)(Location);
