import React, {Component} from 'react';
import {connect} from "react-redux";
import {TEST_URL} from "../../service/serverAPI.config";
import { musicPlayStatusOnAction } from "../../actions/musicPlayStatusAction";

class Listened extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    playSong=(songInfo,songList,key)=>{
        let data = {
            id: songInfo.id,
            name: songInfo.name,
            artist: songInfo.artist,
            album: songInfo.album,
            duration: "",
            playlist: songList,
            cover: songInfo.cover,
            src: `http://localhost:8080/api/audio?id=${songInfo.id}&format=mp3`,
            favorite: songInfo.favorite === 1 ? true:false,
            lyric: `${TEST_URL}/api/lyric?id=${songInfo.id}&format=lrc`
        };
        this.props.dispatch(musicPlayStatusOnAction(data));
    };

    render() {
        const { listened } = this.props.listenedInfo;
        return (
            <React.Fragment>
                {
                    listened.map((v,k)=>{
                        return(
                            <span key={k} style={{backgroundImage: `url(${v.cover})`}} onClick={ this.playSong.bind(this,v,v.playlist) }></span>
                        )
                    })
                }
            </React.Fragment>
        )
    }
}

const mapPropsToState=(state,ownProps)=>{
    return{
        favoriteStatus: state.favoriteStatus,
        moreFavoriteContentStatus: state.moreFavoriteContentStatus,
        userInfo: state.userStatus.userInfo,
        listenedInfo: state.listenedInfo
    }
};

export default connect(mapPropsToState)(Listened)
