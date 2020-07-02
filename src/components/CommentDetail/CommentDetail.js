import React, {Component} from 'react';
import classNames from "classnames";
import "./comment-detail.scss";
import { connect } from "react-redux";
import {commentDetailStatusOffAction, commentDetailStatusOnAction} from "../../actions/commentDetailStatusAction";
import { getUserRatingsDetail } from "../../service/api";
import CommentList from "../CommentList/CommentList";
import {commentDetailInfoAddAction} from "../../actions/commentDetailInfoAction";

class CommentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.commentDetailRef = React.createRef();
    }

    closeCommentDetail=()=>{
        this.props.dispatch(commentDetailStatusOffAction)
    };

    async shouldComponentUpdate(nextProps, nextState, nextContext) {
        const CommentDetailStyle = this.commentDetailRef.current;
        console.log(nextProps.commentDetailStatus);
        if (nextProps.commentDetailStatus.commentDetail) {
            CommentDetailStyle.style.display = "grid";
            console.log("test", nextProps);
            if( this.props.commentDetailStatus.comment.commentId !== nextProps.commentDetailStatus.comment.commentId ){
                const { detail } = await getUserRatingsDetail({
                    commentId: nextProps.commentDetailStatus.comment.commentId,
                });
                this.props.dispatch(commentDetailInfoAddAction(detail));
            }
            return true;
        } else {
            setTimeout(() => {
                CommentDetailStyle.style.display = "none";
            }, 600);
            return true;
        }
    }

    render() {
        const { musicPlayStatus,commentDetailStatus,commentDetailInfo } = this.props;
        const defaultBgStyle= { backgroundImage: `url(${musicPlayStatus.info.cover})` };
        console.log(commentDetailInfo);
        return (
            <div
                ref = { this.commentDetailRef }
                className={
                classNames({
                    "comment-detail": true,
                    "comment-detail-move-in": commentDetailStatus.commentDetail,
                    "comment-detail-move-out": !commentDetailStatus.commentDetail
                })
            }>
                <div className="comment-detail-wrapper" >
                    <div className="close-comment-detail" onClick={ this.closeCommentDetail }>X</div>
                    <div className="comment-detail-list-wrapper">
                        <div className="comment-detail-top-level">
                            <CommentList commentInfo={ [ commentDetailStatus.comment ] }/>
                        </div>
                        <div className="comment-detail-list">
                            <CommentList commentInfo={ commentDetailInfo }/>
                        </div>
                    </div>
                </div>
                <div className="mask"></div>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) =>{
    return {
        ratingStatus: state.ratingStatus.rating,
        musicPlayStatus: state.musicPlayStatus.music,
        userInfo: state.userStatus.userInfo,
        commentInfo: state.commentInfo.commentInfo,
        commentDetailStatus: state.commentDetailStatus,
        commentDetailInfo: state.commentDetailInfo.commentDetailInfo
    };
};

export default connect(mapStateToProps)(CommentDetail);
