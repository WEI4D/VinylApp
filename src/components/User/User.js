import React, {Component} from 'react';
import "./User.scss";
import Avatar from "../Avatar/Avatar";
import {connect} from "react-redux";
import classNames from 'classnames';
import { searchStatusSearchingAction } from "../../actions/searchStatusAction";
import { podcastStatusOnAction } from "../../actions/podcastStatusAction";
import { coverStatusOnAction } from "../../actions/coverStatusAction";
import { locationStatusOnAction } from "../../actions/locationStatusAction";
import { playlistStatusOnAction } from "../../actions/playlistStatusAction";
import {campStatusOnAction} from "../../actions/campStatusAction";
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    callSearch =()=>{
        this.props.dispatch(searchStatusSearchingAction);
    }

    callPodcast =()=>{
        this.props.dispatch(podcastStatusOnAction);
    }

    callCover =()=>{
        this.props.dispatch(coverStatusOnAction);
    }

    callLocal =()=>{
        this.props.dispatch(locationStatusOnAction);
    }

    callPlaylist =()=>{
        this.props.dispatch(playlistStatusOnAction);
    }

    callCamp=()=>{
        this.props.dispatch(campStatusOnAction);
    }

    componentDidMount() {

    }

    render() {
        const { userStatus } = this.props;
        return (
            <div className="user">
                <Avatar/>
                <div className={
                    classNames({
                    "music-function": true,
                    "music-function-move": userStatus
                })}>
                    <div className="search" onClick={ this.callSearch }>Search</div>
                    <div className="podcast" onClick={ this.callPodcast }>Podcast</div>
                    <div className="vinyl" onClick={ this.callCover }>Vinyl</div>
                    <div className="local-music" onClick={ this.callLocal }>Local</div>
                    <div className="playlist" onClick={ this.callPlaylist }>Playlist</div>
                    <div className="base" onClick={ this.callCamp }>Base</div>
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
        lyricStatus: state.userStatus.lyric
    };
};

export default connect(mapStateToProps)(User);
