import React, {Component} from 'react';
import "./music.scss";
import {connect} from "react-redux";
import { lyricStatusOnAction } from "../../actions/lyricStatusAction";
import { musicPlayStatusOnAction,musicPlayStatusOffAction } from "../../actions/musicPlayStatusAction";
import { listenedInfoOnAction } from "../../actions/listenedInfoAction";
import { HeartIcon,PlayIcon,PauseIcon,PreIcon,NextIcon } from "../svg";
import { TEST_URL, URL_CONFIG } from "../../service/serverAPI.config";
import axios from "axios";
import { compareSongList } from "../utils";
import { favoriteSongInfoAddAction,favoriteSongInfoDelAction } from "../../actions/favoriteSongInfoAction";
import { ratingStatusOnAction } from "../../actions/ratingStatusAction";
import { singerStatusOnAction } from "../../actions/singerStatusAction";
import { Link } from "react-router-dom";

class Music extends Component {
    constructor(props) {
        super(props);
        this.state = {
            play: false,
            percent: 0,
        };
    }

    callLyric=()=>{
        this.props.dispatch(lyricStatusOnAction);
    };

    callRating=()=>{
        this.props.dispatch(ratingStatusOnAction);
    };

    callSinger=(artistId)=>{
        this.props.dispatch(singerStatusOnAction(artistId));
    };

    computedProgressPercent=(audioClass)=>{
        const { duration,currentTime } = audioClass;
        let percent = 0;
        if( duration > 0 && currentTime > 0 ){
            percent = currentTime/duration;
        }
        return percent*100;
    };

    playSong=(data)=>{
        window.audioClass.play();
        this.props.dispatch(musicPlayStatusOnAction(data));
    };

    pauseSong=(data)=>{
        window.audioClass.pause();
        this.props.dispatch(musicPlayStatusOffAction(data));
    };

    nextSong=()=>{
        const { info } = this.props.musicPlayStatus;
        let playListLength = info.playlist.length;
        let playlist = info.playlist;
        let nextSong = {};
        let { listenedInfo } = this.props;

        if( playListLength <= 0 ) {
            window.audioClass.src = `${TEST_URL}/api/audio?id=15&format=mp3`;
            window.audioClass.load();
            window.audioClass.play();
        }else{
            for( let i = 0;i < playListLength;i++ ){

                if( info.id === playlist[i].songId ){

                    if( i === playListLength - 1 ){
                        nextSong = {
                            id: playlist[0].songId,
                            name: playlist[0].songName,
                            artist: playlist[0].artist,
                            artistId: playlist[0].artistId,
                            album: playlist[0].albumName,
                            duration: "",
                            playlist: playlist,
                            albumMid: playlist[0].albumMid,
                            fileId: playlist[0].fileId,
                            cover: `${TEST_URL}/api/images?id=${ playlist[0].albumMid }&format=jpg`,
                            src: `${TEST_URL}/api/audio?id=${ playlist[0].fileId }&format=m4a`,
                            favorite: playlist[0].favorite,
                        };
                        listenedInfo.push(info);
                        this.props.dispatch(musicPlayStatusOnAction(nextSong));
                        this.props.dispatch(listenedInfoOnAction(listenedInfo));
                        localStorage.setItem("listened",JSON.stringify(listenedInfo));
                        return;

                    }else{
                        console.log(playlist)

                        nextSong = {
                            id: playlist[i+1].songId,
                            name: playlist[i+1].songName,
                            artist: playlist[i+1].artist,
                            artistId: playlist[i+1].artistId,
                            album: playlist[i+1].albumName,
                            duration: "",
                            playlist: playlist,
                            albumMid: playlist[i+1].albumMid,
                            fileId: playlist[i+1].fileId,
                            cover: `${TEST_URL}/api/images?id=${ playlist[i+1].albumMid }&format=jpg`,
                            src: `${TEST_URL}/api/audio?id=${ playlist[i+1].fileId }&format=m4a`,
                            favorite: playlist[i+1].favorite,
                        };
                        listenedInfo.push(info);
                        this.props.dispatch(musicPlayStatusOnAction(nextSong));
                        this.props.dispatch(listenedInfoOnAction(listenedInfo));
                        return;
                    }
                }
            }

        }
    };

    preSong=()=>{
        const { info } = this.props.musicPlayStatus;
        let playListLength = info.playlist.length;
        let playlist = info.playlist;
        let preSong = {};

        if( playListLength <= 0 ) {
            window.audioClass.src = `${TEST_URL}/api/audio?id=15&format=m4a`;
            window.audioClass.load();
            window.audioClass.play();
        }else{

            for( let i = 0;i < playListLength;i++ ){

                if( info.id === playlist[i].songId ){

                    if( i === 0 ){
                        let lastSong = playListLength - 1;
                        preSong = {
                            id: playlist[lastSong].songId,
                            name: playlist[lastSong].songName,
                            artist: playlist[lastSong].artist,
                            artistId: playlist[lastSong].artistId,
                            album: playlist[lastSong].albumName,
                            duration: "",
                            playlist: playlist,
                            albumMid: playlist[lastSong].albumMid,
                            fileId: playlist[lastSong].fileId,
                            cover: `${TEST_URL}/api/images?id=${ playlist[lastSong].albumMid }&format=jpg`,
                            src: `${TEST_URL}/api/audio?id=${ playlist[lastSong].fileId }&format=m4a`,
                            favorite: playlist[i+1].favorite,
                        };

                        this.props.dispatch(musicPlayStatusOnAction(preSong));
                        return;

                    }else{
                        let targetSong = i - 1;
                        preSong = {
                            id: playlist[targetSong].songId,
                            name: playlist[targetSong].songName,
                            artist: playlist[targetSong].artist,
                            artistId: playlist[targetSong].artistId,
                            album: playlist[targetSong].albumName,
                            duration: "",
                            playlist: playlist,
                            albumMid: playlist[targetSong].albumMid,
                            fileId: playlist[targetSong].fileId,
                            cover: `${TEST_URL}/api/images?id=${ playlist[targetSong].albumMid }&format=jpg`,
                            src: `${TEST_URL}/api/audio?id=${ playlist[targetSong].fileId }&format=m4a`,
                            favorite: playlist[targetSong].favorite,
                        };

                        this.props.dispatch(musicPlayStatusOnAction(preSong));

                        return;
                    }
                }
            }

        }
    };

    debounce=(fn,delay=500)=>{
        return (...rest)=>{
            let args = rest;
            if ( this.state.timerId ) { clearTimeout(this.state.timerId); }
            this.state.timerId = setTimeout(()=>{
                fn.apply(this,args);
            },delay);
        }
    };

    addOrDelToUserFavoriteListAxios=(songId,isFavorite)=>{
        const userId = this.props.userInfo.id;
        axios.post(URL_CONFIG.addOrDelToUserFavoriteList,{
            userId,
            songId,
            isFavorite
        }).then((res)=>{
            if(res.code === 1) console.log("Add or Delete to Favorite List Done!");
        });
    };

    addOrDelToFavorite=(songId)=>{
        let isFavorite = false;
        const { info } = this.props.musicPlayStatus;
        const { favoriteSongList } = this.props.favoriteSongInfo;
        let data = info;
        let target;
        data.favorite = !data.favorite;
        isFavorite = data.favorite;
        if( !data.favorite ){
            target = compareSongList(favoriteSongList, data, false);
            this.props.dispatch(favoriteSongInfoDelAction(target));
        }else{
            /*to like*/
            target = compareSongList(favoriteSongList, data, true);
            this.props.dispatch(favoriteSongInfoAddAction(target));
        }

        let debounceAxios = this.debounce(this.addOrDelToUserFavoriteListAxios,1000);
        debounceAxios(songId,isFavorite);
    };

    componentDidMount() {

        window.audioClass.addEventListener("ended",()=>{

            this.nextSong();

        });

        window.audioClass.addEventListener("timeupdate",()=>{
            this.setState({
                percent: this.computedProgressPercent(window.audioClass)
            })
        });


    }

    render() {
        const defaultStyle={
            color: 'gray'
        };
        const { musicPlayStatus } = this.props;
        return (
            <div className="music">
                <div className="music-bar" style={
                    {
                        width: `${this.state.percent}%`
                    }
                }>
                    {/*这是音乐进度条*/}
                </div>
                <div className="music-bar-channel">
                    {/*这是音乐进度槽*/}
                </div>
                <div className="music-bg-blur">
                    <div className="music-info">
                        <i className="cover" style={{backgroundImage: `url(${ musicPlayStatus.info.cover })`}}></i>
                        <div className="information">
                            <span className="song-name">
                                { musicPlayStatus.info.name }
                            </span>
                            <span className="artist-name" onClick={ this.callSinger.bind(this,musicPlayStatus.info.artistId) }>
                                { musicPlayStatus.info.artist }
                            </span>
                            {/*<Link className="artist-name" onClick={ this.callSinger.bind(this,musicPlayStatus.info.artistId) }>*/}
                                {/*{ musicPlayStatus.info.artist }*/}
                            {/*</Link>*/}
                        </div>
                    </div>
                    <div className="music-lrc-comments">
                        <span onClick={ this.callLyric }>LRC</span>
                        <span onClick={ this.callRating }>35.5K COMMENTS</span>
                    </div>
                    <div className="music-favorite-model">
                        <span className="favorite" onClick={ this.addOrDelToFavorite.bind(this,musicPlayStatus.info.id) }>
                            <HeartIcon style={ musicPlayStatus.info.favorite ? { color: 'hotpink' } : { color: 'black' } } />
                        </span>
                        <span className="model"></span>
                    </div>
                    <div className="music-fun">
                        <span className="pre" onClick={ this.preSong }>
                            {
                                <PreIcon style={ defaultStyle }/>
                            }
                        </span>
                        <span className="play" onClick=
                            {
                                musicPlayStatus.trigger
                                ?
                                this.pauseSong.bind( this, musicPlayStatus.info )
                                :
                                this.playSong.bind( this, musicPlayStatus.info )
                        }>
                            {
                                musicPlayStatus.trigger
                                ?
                                <PauseIcon style={ defaultStyle } />
                                :
                                <PlayIcon style={ defaultStyle } />
                            }
                        </span>
                        <span className="next" onClick={ this.nextSong.bind(this, musicPlayStatus.info) }>
                            {
                                <NextIcon style={ defaultStyle }/>
                            }
                        </span>
                    </div>
                </div>
                <audio
                        ref={(element)=>window.audioClass = element }
                        src={ musicPlayStatus.info.src }
                        type="audio/mpeg"
                        autoPlay={ true }
                        preload="auto"
                >
                </audio>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) =>{
    return {
        lyricStatus: state.musicStatus.lyric,
        musicPlayStatus: state.musicPlayStatus.music,
        userInfo: state.userStatus.userInfo,
        listenedInfo: state.listenedInfo.listened,
        favoriteSongInfo: state.favoriteSongInfo
    };
}

export default connect(mapStateToProps)(Music);
