import React, {Component} from 'react';
import "./Vinyl.scss";
import { connect } from "react-redux";
import { favoriteStatusOnAction } from "../../actions/favoriteStatusAction";
import {recommendStatusOnAction} from "../../actions/recommendStatusAction";
import {hotSongStatusOnAction} from "../../actions/hotSongStatusAction";
import {hotCommentStatusOnAction} from "../../actions/hotCommentStatusAction";
import {isEmpty} from "../utils";
class Vinyl extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    callUserFavoriteMusicList =()=>{
        this.props.dispatch(favoriteStatusOnAction);
    };

    callDailyRecommend =()=>{
        this.props.dispatch(recommendStatusOnAction);
    };

    callHotSong=()=>{
        this.props.dispatch(hotSongStatusOnAction);
    };

    callHotComment=()=>{
        this.props.dispatch(hotCommentStatusOnAction);
    };

    render() {
        const { name } = this.props.userInfo;
        const { cover } = this.props;
        console.log("cover",cover);
        return (
            <div className="about-vinyl">
                <div className="favorite" style={{ backgroundImage: !isEmpty(`${ cover.RIGHT_FIRST }`) ? `url(${ cover.RIGHT_FIRST })`: `url(${ require("../../assets/images/favorite.jpg") })` }}>
                    <div className="wrapper">
                        <i className="favorite-cover"></i>
                        <p className="title" onClick={ this.callUserFavoriteMusicList }>{ name }喜欢的音乐</p>
                        <p className="info">in 2 hours</p>
                    </div>
                    <div className="blur-cover-favorite"></div>
                </div>
                <div className="recommend" style={{ background: !isEmpty(`${ cover.RIGHT_SECOND }`) ? `url(${ cover.RIGHT_SECOND })`: "linear-gradient(70deg,rgb(255, 99, 0),rgb(255, 29, 228))" }}>
                    <div className="wrapper">
                        <i className="recommend-cover" data-date={ new Date().getDate() }></i>
                        <p className="title" onClick={ this.callDailyRecommend }>每日推荐</p>
                        <p className="info">30 tracks</p>
                    </div>
                    <div className="blur-cover-recommend"></div>
                </div>
                <div className="recent"  style={{ backgroundImage: !isEmpty(`${ cover.RIGHT_THIRD }`) ? `url(${ cover.RIGHT_THIRD })`: `url(${ require("../../assets/images/recommend.jpg") })` }}>
                    <div className="wrapper">
                        <i className="recent-cover"></i>
                        <p className="title" onClick={ this.callHotSong }>最近热歌</p>
                        <p className="info">20 played</p>
                    </div>
                    <div className="blur-cover-recent"></div>
                </div>
                <div className="rating"  style={{ backgroundImage: !isEmpty(`${ cover.RIGHT_FOUR }`) ? `url(${ cover.RIGHT_FOUR })`: `url(${ require("../../assets/images/rating.jpg") })` }}>
                    <div className="wrapper" onClick={ this.callHotComment }>
                        <i className="rating-cover"></i>
                        <p className="title">最热评论</p>
                        <p className="info">You are the Apple of my eyes</p>
                    </div>
                    <div className="blur-cover-rating"></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return {
        userInfo: state.userStatus.userInfo,
    }
}
export default connect(mapStateToProps)(Vinyl);
