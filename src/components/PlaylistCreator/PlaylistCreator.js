import React, { Component } from 'react';
import { AddCharIcon } from "../svg";
import { isEmpty } from "../utils";
import "./playlist-creator.scss";
import { connect } from "react-redux";
import { createPlaylistStatusOnAction } from "../../actions/createPlaylistStatusAction";

class PlaylistCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    callCreatePlaylist=()=>{
        this.props.dispatch(createPlaylistStatusOnAction);
    };

    render() {
        const { type,style } = this.props;
        return (
            <span className="playlist-creator" style={ isEmpty(style) ? {}:style }
                  onClick={ this.callCreatePlaylist }
            >
                <AddCharIcon/>
            </span>
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
        commentDetailInfo: state.commentDetailInfo.commentDetailInfo,
        createPlaylistStatus: state.createPlaylistStatus.create
    };
};

export default connect(mapStateToProps)(PlaylistCreator);
