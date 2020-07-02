import React, { Component } from 'react';
import { connect } from "react-redux";
import "./guide.scss";
import { registerStatusOnAction } from "../../actions/registerStatusAction";
import { NextStepIcon } from "../svg";
import {guideStatusOffAction, guideStatusOnAction} from "../../actions/guideStatusAction";
import classNames from "classnames";

class Guide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words:[
                "您好",
                "这里是Vinyl音乐圈",
                "在这里你可以自由的收听你喜欢的音乐",
                "Vinyl将支持您自定义音乐界面",
                "每日音乐推荐",
                "优质歌单推荐",
                "你可以对音乐畅所欲言",
                "快来注册一个账号吧！",
                "感谢您选择Vinyl"],
            currWord: "您好",
            arrowTrigger: ""
        };
        this.GuideRef = React.createRef();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { guideStatus } = this.props;
        if( guideStatus && !nextProps.guideStatus ){
            this.GuideRef.current.style.display = "grid";
        }else{
            setTimeout(() => {
                this.GuideRef.current.style.display = "none";
            }, 600);
        }
        return true;
    }

    componentDidMount() {
        let { words } = this.state;
        let isFirstLoading = true;
        try {
            isFirstLoading = JSON.parse(localStorage.getItem("IS_FIRST_LOADING"));
        }catch (e) {
            isFirstLoading = true
        }
        for( let i = 0; i < words.length;i++){
            setTimeout(()=>{
                this.setState({
                    currWord: words[i]
                })
            },3000*i);
        }
        if( isFirstLoading || isFirstLoading == undefined){
            this.props.dispatch(guideStatusOnAction);
            setTimeout(()=>{
                this.props.dispatch(registerStatusOnAction);
                this.setState({
                    arrowTrigger: <NextStepIcon/>
                })
            },3000*(words.length-1.5));
            localStorage.setItem("IS_FIRST_LOADING", false);
        }
        console.log("isFirstLoading", isFirstLoading == undefined)
    }

    callHome=()=>{
        this.props.dispatch(guideStatusOffAction)
    };

    render() {
        const { currWord,arrowTrigger } = this.state,
              { guideStatus } = this.props;
        return (
            <div ref={ this.GuideRef } className={
                classNames({
                    "guide": true,
                    "guide-move-in": guideStatus,
                    "guide-move-out": !guideStatus
                })
            }>
                <div className="title" >
                    { currWord }
                </div>
                <div className="mask"></div>
                <div className="next" onClick={ this.callHome }>
                    { arrowTrigger }
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state,ownProps) =>{
    return {
        userStatus: state.userStatus.user,
        userInfo: state.userStatus.userInfo,
        searchStatus: state.userStatus.search,
        podcastStatus: state.userStatus.podcast,
        coverStatus: state.userStatus.cover,
        lyricStatus: state.userStatus.lyric,
        guideStatus: state.guideStatus.guide
    };
};

export default connect(mapStateToProps)(Guide);
