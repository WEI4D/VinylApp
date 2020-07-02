import React, {Component} from 'react';
import classNames from "classnames";
import Header from "../Header/Header";
import { connect } from "react-redux";
import "./podcastdDetail.scss";
import { Icon } from "antd";
import { podcastDetailStatusOffAction } from "../../actions/podcastDetailStatusAction";
import { getPodcastInfo } from "../../service/api";
import axios from 'axios';
import {TEST_URL, URL_CONFIG} from "../../service/serverAPI.config";
import {musicPlayStatusOnAction} from "../../actions/musicPlayStatusAction";
import { listenedInfoOnAction } from "../../actions/listenedInfoAction";
import { compareSongList,isEmpty } from "../utils";
import { favoriteSongInfoAddAction } from "../../actions/favoriteSongInfoAction";

function SongListNode(props){
    let { songlist } = props;
    return(
        songlist.map((v,k)=>{
            return(
                <div className={
                    classNames({
                        "podcast-detail-list-info": true,
                    })
                }>
                    <li className="num ">
                        <span>{ k+1 >= 10 ? k+1 : `0${ k+1 }` }</span>
                        <span className={
                            classNames({
                                "icon-heart iconfont heart": true,
                                "music-wave-first": k === 0,
                                "music-wave-second": k === 1,
                            })
                            }>
                        </span>
                    </li>
                    <div className="podcast-detail-list-music">
                        <p className="song-name">{ v.songName === "" ? <a href="https://www.ditto.ink">https://www.ditto.ink</a>: v.songName}</p>
                        <div className="play-component">
                                        <span onClick={ props.playsong.bind(this,v,songlist) }>
                                            <Icon type="caret-right" />
                                        </span>
                            <span>
                                            <Icon type="plus" />
                                        </span>
                            <span>
                                            <Icon type="download" />
                                        </span>
                            <span>
                                            <Icon type="more" />
                                        </span>
                        </div>
                        <span className="song-artist">{ v.artist === "" ? "WEID" : v.artist }</span>
                        <div className="album-name">
                            { v.albumName }
                        </div>
                    </div>
                </div>
            )
        })
    )
}

class PodcastDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songlist: [],
            count: 0
        }
    }

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

    async componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.podcastDetailStatus.trigger) {
            const { count } = this.state;
            const userId = this.props.userInfo.id;
            this.refs.PodcastDetailStyle.style.display = "block";
            const podcastId = nextProps.podcastDetailStatus.target.id;
            const localData = JSON.parse(localStorage.getItem(podcastId.toString()))||[];

            if( localData.length <= 0 ){
                const { songlist } = await getPodcastInfo({
                    userId,
                    podcastId,
                    requestName: "GETPODCASTINFO&GET",
                });
                this.setState({
                    songlist
                });
                localStorage.setItem(podcastId.toString(), JSON.stringify(songlist));
            }else{
                this.setState({
                    songlist: localData
                })
            }
        } else {
            setTimeout(() => {
                this.refs.PodcastDetailStyle.style.display = "none";
            }, 600);
        }
    }

    addOrDelToFavorite=(songId,key)=>{
        let { songlist } = this.state;
        let { favoriteSongList } = this.props.favoriteSongInfo;
        let isFavorite,
            target = [];
        songlist[key].favorite = !songlist[key].favorite;
        isFavorite = songlist[key].favorite;

        console.log(songlist);

        this.setState({
            songlist
        });

        if( isFavorite ){
            target = compareSongList( favoriteSongList,songlist[key],true )
        }else{
            target = compareSongList( favoriteSongList,songlist[key],false )
        }

        let debounceAxios = this.debounce(this.addOrDelToUserFavoriteListAxios,1000);
        this.props.dispatch(favoriteSongInfoAddAction(target));
        debounceAxios(songId,isFavorite);
    };
    playSong=(songInfo,songList,key)=>{
        let { listenedInfo } = this.props;
        console.log("Favorite", songInfo.favorite, songInfo.favorite === 1 ? true:false);
        let data = {
            id: songInfo.songId,
            name: songInfo.songName,
            artist: songInfo.artist,
            artistId: songInfo.artistId,
            album: songInfo.albumName,
            duration: "",
            playlist: songList,
            cover: `${TEST_URL}/api/images?id=${ songInfo.albumMid }&format=jpg`,
            src: `http://localhost:8080/api/audio?id=${ songInfo.fileId }&format=m4a`,
            favorite: songInfo.favorite,
            fileId: songInfo.fileId,
            albumMid: songInfo.albumMid
        };
        listenedInfo.push(data);
        this.props.dispatch(musicPlayStatusOnAction(data));
        this.props.dispatch(listenedInfoOnAction(listenedInfo));
        localStorage.setItem("listened",JSON.stringify(listenedInfo));
    };

    render() {
        const { name } = this.props.podcastDetailStatus.target;
        const podcastDetailStatus = this.props.podcastDetailStatus.trigger;
        const { songlist } = this.state;
        return (
            <div ref="PodcastDetailStyle" className={
                classNames({
                    "podcast-detail": true,
                    "podcast-detail-move-in": podcastDetailStatus,
                    "podcast-detail-move-out": !podcastDetailStatus,
                })
            }>
                <Header action={ podcastDetailStatusOffAction }/>
                <div className="podcast-detail-wrapper">
                    <div className="left-top">
                        <div className="left-top-mask" data-name={ name }></div>
                    </div>
                    <div className="rotation-chart">
                        <div className="rotation-chart-wrapper ad-left">
                        </div>
                        <div className="rotation-chart-wrapper ad-right">
                        </div>
                    </div>
                    <div className="podcast-detail-list">
                        <div className="podcast-detail-list-desc">
                            <SongListNode songlist={ songlist } addOrDel={ this.addOrDelToFavorite } playsong={ this.playSong }/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state,ownProps)=>{
    return {
        podcastDetailStatus: state.podcastDetailStatus.podcastDetail,
        userInfo: state.userStatus.userInfo,
        listenedInfo: state.listenedInfo.listened,
        favoriteSongInfo: state.favoriteSongInfo
    }
};

export default connect(mapStateToProps)(PodcastDetail);
