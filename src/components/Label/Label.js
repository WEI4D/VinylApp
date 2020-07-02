import React, {Component} from 'react';
import  {Icon,Skeleton } from "antd";
import { musicPlayStatusOnAction } from "../../actions/musicPlayStatusAction";
import { connect } from "react-redux";
import classNames from "classnames";
import "./label.scss";
import {BASE_URL, TEST_URL, URL_CONFIG} from "../../service/serverAPI.config";
import { listenedInfoOnAction } from "../../actions/listenedInfoAction";
import { singerStatusOnAction } from "../../actions/singerStatusAction";
// import { downloadAudio } from "../../service/api";
// const electron = window.require('electron');
// const { ipcRenderer } = electron;

function Box(props) {
    let { trigger,type,data } = props;
    if( type === "AddTo" ){
        return(
            <div className={
                classNames({
                    "add-to-drawer": trigger,
                    "add-to-drawer-disappear": !trigger
                })
            }>

            </div>
        )
    }
    if( type === "More" ){
        return(
            <div>

            </div>
        )
    }
}

class Label extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boxTrigger: false,
            loading: true
        }
    }

    callSinger=(artistId)=>{
        this.props.dispatch(singerStatusOnAction(artistId));
    };

    playSong=(songInfo,songList)=>{
        const { songId,songName,artistId,albumName,artist,albumMid,fileId,favorite, } = songInfo;
        let { listenedInfo } = this.props;
        let data = {
            id: songId,
            name: songName,
            artist: artist,
            artistId: artistId,
            album: albumName,
            duration: "",
            playlist: songList,
            albumMid: albumMid,
            fileId: fileId,
            cover: `${TEST_URL}/api/images?id=${ albumMid }&format=jpg`,
            src: `${TEST_URL}/api/audio?id=${ fileId }&format=m4a`,
            favorite: favorite === 1 ? true:false,
        };
        listenedInfo.push(data);
        this.props.dispatch(musicPlayStatusOnAction(data));
        this.props.dispatch(listenedInfoOnAction(listenedInfo));
        localStorage.setItem("listened",JSON.stringify(listenedInfo));
    };

    callBox=()=>{
        this.setState({
            boxTrigger: !this.state.boxTrigger
        })
    };

    downloadAudio=(info)=>{
        let a =document.createElement("a");
        let name = info.name;
        a.download = name;
        a.href = `${ BASE_URL }/api/download?fileId=${ info.fileId }&format=m4a`;
        a.click();
    };

    render() {
        const { musicPlayStatus,song } = this.props,
              { loading } = this.state;
        let data = [
            {
                id: 0,
                title: "播放队列",
            },
            {
                id: 1,
                title: "我喜欢",
            },
            {
                id: 2,
                title: "日系风",
            }
        ];
        return(
            song.map((v,k)=>{
                return (
                    <div key={ k } className="favorite-music-list-child">
                        <div className={
                            classNames({
                                "number-desc": true,
                                "playing": v.songId === musicPlayStatus.info.id
                            })
                        }>
                            { k+1 }
                        </div>
                        <div className={
                            classNames({
                                "song-name": true,
                                "song-name-playing": v.songId === musicPlayStatus.info.id
                            })
                        } data-name={ v.songName }>
                            <label className="operator-list">
                                <span onClick={ this.playSong.bind(this,v,song) }>
                                    <Icon type="customer-service" />
                                </span>
                                <span onClick={ this.callBox }>
                                    <Icon type="plus" />
                                </span>
                                {/*onClick={ this.downloadAudio.bind(this, v.fileId) }*/}
                                <span onClick={ this.downloadAudio.bind(this, v) } download={true}>
                                    <Icon type="download" />
                                </span>
                                <span>
                                    <Icon type="more" />
                                </span>
                                <Box trigger={ this.state.boxTrigger } type="AddTo" data={ data } />
                            </label>
                        </div>
                        <span className="duration" onClick={ this.callSinger.bind(this, v.artistId) }>
                            { v.artist }
                        </span>
                    </div>
                )
            })
        )
    }
}

const mapStateToProps = (state,ownProps) =>{
    return {
        lyricStatus: state.musicStatus.lyric,
        musicPlayStatus: state.musicPlayStatus.music,
        listenedInfo: state.listenedInfo.listened,
        favoriteSongInfo: state.favoriteSongInfo
    };
};

export default connect(mapStateToProps)(Label);
