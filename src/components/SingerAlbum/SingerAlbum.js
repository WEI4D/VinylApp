import React, {Component} from 'react';
import { Skeleton } from "antd";
import Label from "../SingerSong/SingerSong";
import {connect} from "react-redux";

class SingerAlbum extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="singer-album">
                {/*<Skeleton loading={ loading } active={ true } paragraph={{rows:9}}>*/}
                    {/*<Label song={ info }/>*/}
                {/*</Skeleton>*/}
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
        favoriteSongInfo: state.favoriteSongInfo,
        singerStatus: state.singerStatus,
    }
};

export default connect(mapPropsToState)(SingerAlbum)
