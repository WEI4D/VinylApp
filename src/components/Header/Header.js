import React, {Component} from 'react';
import {Icon} from "antd";
import {connect} from "react-redux";
import "./header.scss";
import classNames from "classnames";
import { isEmpty } from "../utils";
import { settingStatusOnAction } from "../../actions/settingStatusAction";
import { recognizeSongStatusOnAction } from "../../actions/recognizeSongStatusAction";
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secondLevelTrigger: false,
        }
    }
    close =(action)=>{
        this.props.dispatch(action);
    };
    callSecondLevelDir=()=>{
        this.setState({
            secondLevelTrigger: !this.state.secondLevelTrigger
        })
    };
    callRecognizeComponent=()=>{
        this.props.dispatch(recognizeSongStatusOnAction);
        this.setState({
            secondLevelTrigger: false
        })
    };
    callLinkByLocalBrowser=()=>{

    };
    callSettingComponent=()=>{
        this.props.dispatch(settingStatusOnAction);
        this.setState({
            secondLevelTrigger: false
        })
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if( nextState.secondLevelTrigger ){
            this.refs.MoreMenuStyle.style.display = "grid";
        }else{
            this.refs.MoreMenuStyle.style.display = "none";
        }
        return true
    }

    render() {
        const { action,isLeft,isRight } = this.props;
        const { secondLevelTrigger } = this.state;
        return (
            <header>
                    <span className={
                        classNames({
                            "back": true,
                            "is-left": !isEmpty(isLeft)&&isLeft ? true : false,
                        })
                    } onClick={ this.close.bind(this,action) }>
                        <Icon type="left" style={{color:"white",fontSize:"20px"}}/>
                    </span>
                    <span className={
                        classNames({
                            "more": true,
                            "is-right": !isEmpty(isRight)&&isRight ? true : false,
                        })
                    } onClick={this.callSecondLevelDir}>
                        <Icon type="more" style={{color:"white",fontSize:"20px"}}/>
                    </span>
                    <div ref="MoreMenuStyle"  className={
                        classNames({
                            "more-content": true,
                            "more-content-move-in": secondLevelTrigger,
                            "more-content-move-out": !secondLevelTrigger,
                        })
                    }>
                        <li onClick={ this.callRecognizeComponent }>🎙️ 听歌识曲</li>
                        <li>🙋‍ 帮助</li>
                        <li onClick={ this.callSettingComponent }>⚙ 设置</li>
                        <li onClick={ this.callLinkByLocalBrowser }>🏆 关于我们</li>
                        <li>✖ 退出Vinyl</li>
                        <li>↩ 切换账号</li>
                    </div>
            </header>
        )
    }
}

const mapStateToProps = (state,ownProps) =>{
    return {
        podcastStatus: state.userStatus.podcast,
    };
}

export default connect(mapStateToProps)(Header);
