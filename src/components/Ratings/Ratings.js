import React, {Component} from 'react';
import classNames from "classnames";
import {connect} from "react-redux";
import "./ratings.scss";
import Header from "../Header/Header";
import { ratingStatusOffAction } from "../../actions/ratingStatusAction";
import { SmileIcon } from "../svg";
import { getSongRatings } from "../../service/api";
import { commentDialogStatusOnAction } from "../../actions/commentDialogStatusAction";
import { commentInfoAddAction } from "../../actions/commentInfoAction";
import CommentList from "../CommentList/CommentList";

class Ratings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger: true
        }
    }

    async shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { musicPlayStatus } = this.props;
        const { trigger } = this.state;
        if (nextProps.ratingStatus) {
            if( trigger ){
                const { comment } = await getSongRatings({
                    songId: musicPlayStatus.info.id
                });
                this.props.dispatch(commentInfoAddAction(comment));
                this.setState({
                    trigger: false
                })
            }
            if( musicPlayStatus.info.id !== nextProps.musicPlayStatus.info.id ){
                const { comment } = await getSongRatings({
                    songId: nextProps.musicPlayStatus.info.id
                });
                this.props.dispatch(commentInfoAddAction(comment));
            }
            this.refs.RatingStyle.style.display = "grid";
        } else {
            try {
                this.setState({
                    trigger: true
                })
            }catch (e) {

            }
            setTimeout(() => {
                this.refs.RatingStyle.style.display = "none";
            }, 600);
        }
        return true
    }

    toLike=(songId,userId,commentId)=>{

    };

    toComment=(songId,userId,commentId,commentPid,topLevelCommentPid)=>{
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
        const { ratingStatus,musicPlayStatus,userInfo,commentInfo } = this.props;
        const defaultStyle = {color: 'gray'},
              defaultCommentId = -1,
              defaultCommentPid = -1,
              defTopLevelCommentPid = -1;
        return (
            <div
                ref="RatingStyle"
                className={classNames({
                    "ratingC": true,
                    "rating-move-in": ratingStatus,
                    "rating-move-out": !ratingStatus
                })}
                style={{"backgroundImage": `url(${musicPlayStatus.info.cover})`}}
            >
                <Header action={ ratingStatusOffAction }/>
                <div className="title">
                    <div className="song">{ musicPlayStatus.info.name }</div>
                    <div className="singer">{ musicPlayStatus.info.artist }</div>
                </div>
                <div className="rating-wrapper">
                    <div className="rating-creator" onClick={
                        this.toComment.bind(
                            this,
                            musicPlayStatus.info.id,
                            userInfo.id,
                            defaultCommentId,
                            defaultCommentPid,
                            defTopLevelCommentPid
                        )
                    }>
                        <SmileIcon style={ defaultStyle }/>
                    </div>
                    <div className="rating-content">
                        <CommentList commentInfo={ commentInfo }/>
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
    };
};

export default connect(mapStateToProps)(Ratings);

// function CommentList(props) {
//     let { comment,info,onLike,toComment,baseData,callCommentDetail } = props;
//     return(
//         comment.map((v,k)=>{
//             return(
//                 <div key={k} className="rating-list">
//                     <div className="user-avatar">
//                         <i style={{backgroundImage: `url(${v.avatar})`}}></i>
//                     </div>
//                     <div className="user-rating-wrapper">
//                         <span className="user-name">{ v.name }</span>
//                         <p className="user-rating">
//                             { v.comment }
//                         </p>
//                         <div className="user-publish-info">
//                             <div className="date">
//                                 {
//                                     timestampToDate(parseInt(v.publishTime))
//                                 }
//                             </div>
//                             <span className="interaction-count" onClick={ callCommentDetail.bind(this,v) }>#{ 10 } 条互动</span>
//                             <div className="star-and-reply">
//                                 <span onClick={ onLike.bind(this,baseData.songId,baseData.userId,v.commentId) }>
//                                     <NiceIcon/>  { v.likeCount ? v.likeCount:0 }
//                                 </span>
//                                 <span onClick={ toComment.bind(this,baseData.songId,baseData.userId,v.commentId,v.commentPid,v.commentId) }>
//                                     <CommentIcon/>
//                                 </span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )
//         })
//     )
// }

