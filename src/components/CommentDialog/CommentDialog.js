import React, {Component, createRef} from 'react';
import classNames from "classnames";
import "./comment-dialog.scss";
import { connect } from "react-redux";
import { commentDialogStatusOffAction } from "../../actions/commentDialogStatusAction";
import { ExpressIcon } from "../svg";
import Express from "../Express/Express";
import {getSongRatings, postUserRating} from "../../service/api";
import { message } from "antd";
import { commentInfoAddAction } from "../../actions/commentInfoAction";
import {commentDetailInfoAddAction} from "../../actions/commentDetailInfoAction";


class CommentDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expressToolsTrigger: false,
            express: ""
        };
        this.textAreaRef = React.createRef();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.commentDialogStatus.commentDialog) {
            this.refs.CommentDialogStyle.style.display = "grid";
            return true;
        } else {
            setTimeout(() => {
                this.refs.CommentDialogStyle.style.display = "none";
            }, 600);
            return true;
        }
    }

    closeCommentDialog=()=>{
        this.props.dispatch(commentDialogStatusOffAction)
    };

    callExpressTools=()=>{
        let { expressToolsTrigger } = this.state;
        this.setState({
            expressToolsTrigger: !expressToolsTrigger
        })
    };

    postUserRating= async () => {
        const { songId,userId,commentId,commentPid,topLevelCommentPid } = this.props.commentDialogStatus.info;
        const { value } = this.textAreaRef.current;
        const data = {
            songId,
            userId,
            commentId,
            commentPid,
            comment: value,
            publish: Date.parse( new Date() ),
            topLevelCommentPid
        };
        const { code,comment,detail } = await postUserRating(data);
        if( code === 1 ){
            message.success("评论成功！",.5);
            if( typeof comment === "undefined" ){
                this.props.dispatch(commentDetailInfoAddAction(detail));
            }else{
                this.props.dispatch(commentInfoAddAction(comment));
            }
            setTimeout(()=>{
                this.props.dispatch(commentDialogStatusOffAction);
            }, 1000);
        }else{
            message.error("评论失败！");
        }
    };

    render() {
        const { commentDialogStatus } = this.props;
        const { expressToolsTrigger } = this.state;
        const defaultStyle = {
            color: 'gray'
        };
        return (
            <React.Fragment>
                <div ref="CommentDialogStyle"
                className={
                classNames({
                    "comment-dialog": true,
                    "comment-dialog-move-in": commentDialogStatus.commentDialog,
                    "comment-dialog-move-out": !commentDialogStatus.commentDialog
                })
            }>
                <div className="comment-dialog-wrapper">
                    <h1 className="title">添加评论</h1>
                    <span className="close" onClick={ this.closeCommentDialog }>X</span>
                    <div className="text-wrapper">
                        <textarea ref={ this.textAreaRef } />
                        <div className="text-operator">
                            <div className="express-tools" onClick={ this.callExpressTools }>
                                <ExpressIcon style={ defaultStyle }/>
                            </div>
                            <div className="publish-button">
                                <input value="发布" type="submit" onClick={ this.postUserRating }/>
                            </div>
                        </div>
                    </div>
                </div>
                <Express trigger={ expressToolsTrigger } chooseExpress={ (express)=>{
                    this.textAreaRef.current.value = this.textAreaRef.current.value + express;
                } }/>
            </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state,ownProps) =>{
    return {
        commentDialogStatus: state.commentDialogStatus,
        musicPlayStatus: state.musicPlayStatus.music,
    };
};

export default connect(mapStateToProps)(CommentDialog);
