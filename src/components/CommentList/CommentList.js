import React, {Component} from 'react';
import { timestampToDate } from "../utils";
import { CommentIcon, NiceIcon,TriangleCharIcon } from "../svg";
import { connect } from "react-redux";
import { commentDetailStatusOnAction } from "../../actions/commentDetailStatusAction";
import { commentDialogStatusOnAction } from "../../actions/commentDialogStatusAction";
import "./comment-list.scss";

class CommentList  extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    callCommentDetail=(comment)=>{
        this.props.dispatch(commentDetailStatusOnAction(comment));
    };

    onLike=(songId,userId,commentId)=>{

    };
    /**/
    onComment=(songId,userId,commentId,commentPid,topLevelCommentPid)=>{
        let data = {
            songId,
            userId,
            commentId,
            commentPid,
            topLevelCommentPid,
        };
        this.props.dispatch(commentDialogStatusOnAction(data));
    };

    render() {
        const { musicPlayStatus,userInfo,commentInfo,commentDetailStatus } = this.props;
        return (
            commentInfo.map((v,k)=>{
                return(
                    <div key={k} className="rating-list">
                        <div className="user-avatar">
                            <i style={{backgroundImage: `url(${v.avatar})`}}></i>
                        </div>
                        <div className="user-rating-wrapper">
                            <div className="user-name">
                                { v.name }
                                { v.replyUserName ?
                                    <span className="comment-detail-triangle-char-icon" data-reply={ v.replyUserName }>
                                        <TriangleCharIcon/>
                                    </span> : ""
                                }
                            </div>
                            <p className="user-rating">
                                { v.comment }
                            </p>
                            <div className="user-publish-info">
                                <div className="date">
                                    {
                                        timestampToDate(parseInt(v.publishTime))
                                    }
                                </div>
                                { v.replyUserName ? "": <span className="interaction-count" onClick={ this.callCommentDetail.bind(this,v) }>#查看互动</span> }
                                <div className="star-and-reply">
                                <span onClick={ this.onLike.bind(this,musicPlayStatus.info.id, userInfo.id, v.commentId) }>
                                    <NiceIcon/>  { v.likeCount ? v.likeCount:0 }
                                </span>
                                    <span onClick={ this.onComment.bind(this,musicPlayStatus.info.id,userInfo.id,v.commentId,v.commentPid,commentDetailStatus.comment.commentId) }>
                                    <CommentIcon/>
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }
}

const mapStateToProps = (state,ownProps) =>{

    return {
        ratingStatus: state.ratingStatus.rating,
        musicPlayStatus: state.musicPlayStatus.music,
        userInfo: state.userStatus.userInfo,
        commentDetailStatus: state.commentDetailStatus,
    };
};

export default connect(mapStateToProps)(CommentList);
