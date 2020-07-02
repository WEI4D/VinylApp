import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import "./hot-comment.scss";
import classNames from "classnames";
import Header from "../Header/Header";
import {hotCommentStatusOffAction} from "../../actions/hotCommentStatusAction";
import {NiceColorIcon, NiceIcon} from "../svg";

class HotComment extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.HotCommentRef = React.createRef();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { hotComment } = this.props.hotCommentStatus;
        if( !hotComment && nextProps.hotCommentStatus.hotComment  ){
            this.HotCommentRef.current.style.display = "grid";
        }else{
            setTimeout(()=>{
                this.HotCommentRef.current.style.display = "none";
            },700);
        }
        return true;
    }

    render() {
        const { hotComment } = this.props.hotCommentStatus;
        return (
            <div ref={ this.HotCommentRef } className={
                classNames({
                    "hot-comment": true,
                    "hot-comment-move-in": hotComment,
                    "hot-comment-move-out": !hotComment,
                })
            }>
                <Header action={ hotCommentStatusOffAction }/>
                <div className="comment-wrapper">
                    <div className="title">
                        最热评论
                    </div>
                    <div className="comment-set">
                        <div className="comment-child">
                            <div className="cover-wrapper" >
                                <i></i>
                                <span>前端仔</span>
                            </div>
                            <div className="comment-content">
                                怪不得甜面包咸面包都被封了，原来本尊是辣面包
                            </div>
                            <div className="icon-set">
                                <span>
                                    <NiceColorIcon/> Nice!
                                </span>
                            </div>
                        </div>
                        <div className="comment-child">
                            <div className="cover-wrapper" >
                                <i></i>
                                <span>曹植</span>
                            </div>
                            <div className="comment-content">
                                湘娥拊琴瑟，秦女吹笙竽。
                            </div>
                            <div className="icon-set">
                                <span>
                                    <NiceIcon/> Nice!
                                </span>
                            </div>
                        </div>
                        <div className="comment-child">
                            <div className="cover-wrapper" >
                                <i></i>
                                <span>谢朓</span>
                            </div>
                            <div className="comment-content">
                                献纳云台表，功名良可收。
                            </div>
                        </div>
                        <div className="comment-child">
                            <div className="cover-wrapper" >
                                <i></i>
                                <span>许浑</span>
                            </div>
                            <div className="comment-content">
                                英雄一去豪华尽，惟有青山似洛中。
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state,ownProps)=>{
    return({
        hotSongStatus: state.hotSongStatus,
        userInfo: state.userStatus.userInfo,
        hotCommentStatus: state.hotCommentStatus,
    })
};

export default connect(mapStateToProps)(HotComment)
