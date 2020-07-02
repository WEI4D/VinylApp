import React, {Component} from 'react';
import classNames from "classnames";
import "./favorite.scss";
import Header from "../Header/Header";
import { favoriteStatusOffAction } from "../../actions/favoriteStatusAction";
import { connect } from "react-redux"
import { getUserFavoriteSongList } from "../../service/api";
import { moreFavoriteContentStatusOnAction,moreFavoriteContentStatusOffAction } from "../../actions/moreFavoriteContentStatusAction";
import Label from "../Label/Label";
import { TEST_URL } from "../../service/serverAPI.config";
import { musicPlayStatusOnAction } from "../../actions/musicPlayStatusAction";
import { favoriteSongInfoAddAction } from "../../actions/favoriteSongInfoAction";
import { Skeleton } from "antd"

function Recommend(props) {
    let arrLen = props.data.length;
    let targetArr = props.data;
    if( arrLen <= 0 ){
        return(
            <p className="no-data">
                暂无数据
            </p>
        )
    }
    if ( arrLen > 4 ) {
        targetArr = targetArr.slice(arrLen-4,arrLen);
    }
    return(
        targetArr.map((v,k)=>{
            return(
                <span key={k} onClick={ props.playsong.bind(this,v,v.playlist) }  style={{backgroundImage:`url(${v.cover})`}}></span>
            )
        })
    )
}

class Favorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger: false,
            favoriteSong: [],
            listened: [],
            count: 0,
            loading: true
        }
    }

    callMoreFavoriteContent=()=>{
        const { trigger } = this.state;
        if( trigger ){
            this.props.dispatch(moreFavoriteContentStatusOffAction);
        }else{
            this.props.dispatch(moreFavoriteContentStatusOnAction);
        }
        this.setState({
            trigger: !trigger
        })
    };

    async shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.favoriteStatus.favorite) {
            this.refs.FavoriteStyle.style.display = "grid";
            const userId = nextProps.userInfo.id;
            if( this.state.count <= 0 ){
                const { favoriteSong } = await getUserFavoriteSongList({
                    userId,
                    requestName: "GETFAVORITESONGLIST&GET"
                });
                this.setState({
                    count: 1,
                    loading: false
                });
                this.props.dispatch(favoriteSongInfoAddAction(favoriteSong))
            }
        } else {
            setTimeout(() => {
                this.refs.FavoriteStyle.style.display = "none";
            }, 600);
        }
    }

    playSong=(songInfo,songList,key)=>{
        console.log(300,songInfo,songList);
        let data = {
            id: songInfo.id,
            name: songInfo.name,
            artist: songInfo.artist,
            artistId: songInfo.artistId,
            album: songInfo.album,
            duration: "",
            playlist: songList,
            cover: `${TEST_URL}/api/images?id=${ songInfo.albumMid }&format=jpg`,
            src: `http://localhost:8080/api/audio?id=${ songInfo.fileId }&format=m4a`,
            favorite: songInfo.favorite === 1 ? true:false,
            fileId: songInfo.fileId,
            albumMid: songInfo.albumMid
        };
        this.props.dispatch(musicPlayStatusOnAction(data));
    };

    render() {
        const { favorite } = this.props.favoriteStatus;
        const { moreFavoriteContent } = this.props.moreFavoriteContentStatus;
        const { listened } = this.props.listenedInfo;
        const { favoriteSongList } = this.props.favoriteSongInfo;
        return (
            <div ref="FavoriteStyle" className={
                classNames({
                    "favorite-com": true,
                    "favorite-com-move-in": favorite,
                    "favorite-com-move-out": !favorite,
                })
            }>
                <Header action={ favoriteStatusOffAction }/>
                <div className="favorite-com-cover"></div>
                <div className="favorite-com-combine-cover"></div>
                <div className="favorite-playing-music-info">
                    {/*<div className="music-info-base album">爱在西元前</div>*/}
                    {/*<div className="music-info-base artist">周杰伦</div>*/}
                </div>
                <div className="favorite-com-history-and-similar">
                    <div className="history-listen">
                        <p>历史收听</p>
                        <div className="history-list">
                            <Recommend data={ listened } playsong={ this.playSong }/>
                        </div>
                    </div>
                    <div className="similar-listen">
                        <p>相似歌手</p>
                        <div className="similar-list">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
                <div className={
                    classNames({
                        "favorite-music-content": true,
                        "favorite-music-content-more": moreFavoriteContent,
                        "favorite-music-content-less": !moreFavoriteContent,
                    })
                }>
                    <div className="favorite-search">
                        <input onDoubleClick={ this.callMoreFavoriteContent } type="text" placeholder="SEARCH"/>
                    </div>
                    <div className="duration">
                        歌手
                    </div>
                    <div className="favorite-music-list">
                        <Skeleton loading={ this.state.loading } active={ true } paragraph={{rows:9}}>
                            <Label song={ favoriteSongList }/>
                        </Skeleton>
                    </div>
                </div>
            </div>
        )
    }
}

const mapPropsToState=(state,ownProps)=>{
    return{
        favoriteStatus: state.favoriteStatus,
        moreFavoriteContentStatus: state.moreFavoriteContentStatus,
        userInfo: state.userStatus.userInfo,
        listenedInfo: state.listenedInfo,
        musicPlayStatus: state.musicPlayStatus.music,
        favoriteSongInfo: state.favoriteSongInfo
    }
};

export default connect(mapPropsToState)(Favorite)
