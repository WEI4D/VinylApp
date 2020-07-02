import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import "./hot-song.scss";
import Header from "../Header/Header";
import { hotSongStatusOffAction } from "../../actions/hotSongStatusAction";
import classNames from "classnames";
import { getUserFavoriteSongList } from "../../service/api";
import { Skeleton } from "antd";
import Label from "../Label/Label";

class HotSong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoriteSong: [],
            loading: true
        };
        this.HotSongRef = React.createRef();
    }

    async shouldComponentUpdate(nextProps, nextState, nextContext) {
        const userId = nextProps.userInfo.id;
        if( nextProps.hotSongStatus.hotSong && !this.props.hotSongStatus.hotSong ){
            setTimeout(()=>{
                this.HotSongRef.current.scrollTop = this.HotSongRef.current.scrollHeight;
            },800);
        }
        if( nextProps.hotSongStatus.hotSong && !this.props.hotSongStatus.hotSong ){
            this.HotSongRef.current.style.display = "grid";
            const { favoriteSong } = await getUserFavoriteSongList({
                userId,
                requestName: "GETFAVORITESONGLIST&GET"
            });
            this.setState({
                favoriteSong,
                loading: false
            });
        }else{
            setTimeout(()=>{
                this.HotSongRef.current.style.display = "none";
            },700);
        }
        return true;
    }

    render() {
        const { hotSong } = this.props.hotSongStatus,
              { loading } = this.state;
        return (
            <div ref={ this.HotSongRef } className={
                classNames({
                    "hot-song": true,
                    "hot-song-move-in": hotSong,
                    "hot-song-move-out": !hotSong,
                })
            }>
                <Header action={ hotSongStatusOffAction }/>
                {/*<div className="hot-song-cover"></div>*/}
                <div className="hot-song-cover">
                    <div className="hot-song-msg">
                        <div className={
                            classNames({
                                "hot-song-today": true,
                            })
                        }>
                            今日热门曲目，
                        </div>
                        <div className={
                            classNames({
                                "hot-song-count": true
                            })
                        }>
                            共50首...
                        </div>
                    </div>
                    <div className={
                        classNames({
                            "mask": true,
                            "blur": hotSong
                        })
                    }></div>
                </div>
                <div className="hot-song-wrapper">
                    <Skeleton loading={ loading } active={ true } paragraph={{rows:9}}>
                        <Label song={ this.state.favoriteSong }/>
                    </Skeleton>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state,ownProps)=>{
    return({
        hotSongStatus: state.hotSongStatus,
        userInfo: state.userStatus.userInfo,
    })
};

export default connect(mapStateToProps)(HotSong)
