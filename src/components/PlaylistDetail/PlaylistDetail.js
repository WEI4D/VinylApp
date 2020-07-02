import React, {Component, useState} from 'react';
import { connect } from "react-redux";
import "./playlist-detail.scss";
import classNames from "classnames";
import { playlistDetailStatusOffAction } from "../../actions/playlistDetailStatusAction";
import Header from "../Header/Header";
import Label from "../Label/Label";
import { getPlaylistDetail } from "../../service/api";
import { isEmpty } from "../utils";
import { BASE_URL, URL_CONFIG } from "../../service/serverAPI.config";

class PlaylistDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            song: [{
                cover: "",
            }]
        };
        this.PlaylistDetailRef = React.createRef();
    }

    async shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { playlistDetail,userInfo } = this.props;
        if ( nextProps.playlistDetail.trigger ) {
            this.PlaylistDetailRef.current.style.display = "grid";
            if( playlistDetail.playlistId !== nextProps.playlistDetail.playlistId ){
                const { detail } = await getPlaylistDetail({
                    playlistId: nextProps.playlistDetail.playlistId,
                    userId: userInfo.id
                });
                this.setState({
                    song: detail
                })
            }
        } else {
            setTimeout(() => {
                this.PlaylistDetailRef.current.style.display = "none";
            }, 600);
        }
        return true;
    }



    render() {
        const { playlistDetail,userInfo } = this.props,
              { song } = this.state,
              noPicURL = `${ URL_CONFIG.getImage }id=no_pic&format=jpg`;
        const userCover = { backgroundImage: `url(${ userInfo.avatar })` },
              playlistCover = { backgroundImage: `url(${ isEmpty(song[0].cover) ? noPicURL : song[0].cover })` };
        return (
            <div className={
                    classNames({
                        "playlist-detail": true,
                        "playlist-detail-move-in": playlistDetail.trigger,
                        "playlist-detail-move-out": !playlistDetail.trigger,
                    })
                 }
                 ref={ this.PlaylistDetailRef }
            >
                <Header action={ playlistDetailStatusOffAction }/>
                <div className="playlist-detail-info-wrapper">
                    <i className="playlist-cover" style={ playlistCover }></i>
                    <div className="playlist-info">
                        <div className="playlist-name">
                            <h1>陈奕迅情歌精选</h1>
                        </div>
                        <div className="playlist-user">
                            <div className="user-cover" style={ userCover }></div>
                            <span className="username"> { userInfo.name } </span>
                        </div>
                        <div className="playlist-word">
                            cookie数据始终在同源的http请求中携带(即使不需要)，即cookie在浏览器和服务器间来回传递
                            cookie数据还有路径（path）的概念，可以限制。cookie只属于某个路径下
                        </div>
                        <div className="editor">
                            编辑
                        </div>
                    </div>
                </div>
                <div className="playlist-detail-nav-bar">
                    歌曲
                </div>
                <div className="playlist-detail-list">
                    <Label song={ song }/>
                </div>
                <div className="mask"></div>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) =>{
    return {
        podcastStatus: state.userStatus.podcast,
        playlistDetail: state.playlistDetailStatus.playlistDetail,
        userInfo: state.userStatus.userInfo,
    };
};

export default connect(mapStateToProps)(PlaylistDetail);
