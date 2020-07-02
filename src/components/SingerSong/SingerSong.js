import React, {Component} from 'react';
import {connect} from "react-redux";
import "./singer-song.scss";
import Label from "../Label/Label";
import { getArtistSong } from "../../service/api";
import { Skeleton } from "antd";

class SingerSong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: [],
            loading: true
        }
    }

    // async shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     const { singerStatus } = this.props;
    //     const artistId = this.props.match.params.id || singerStatus.artistId;
    //     const userId = this.props.userInfo.id;
    //     if( this.state.trigger ){
    //         const { info } = await getArtistSong({
    //             artistId,
    //             userId,
    //             limit: 10,
    //             requestName: "GETARTISTCHOICESONG&GET"
    //         });
    //         this.setState({
    //             info,
    //             trigger: false
    //         })
    //     }
    // }

    async componentDidMount() {
        const localInfo = JSON.parse(localStorage.getItem("SingerSongInfo")) || [],
              { singerStatus } = this.props,
              artistId = singerStatus.artistId,
              userId = this.props.userInfo.id;
        if( singerStatus.singer ){
            if( localInfo.length <= 0 || (localInfo[0].artistId) !== artistId ){
                const { info } = await getArtistSong({
                    artistId,
                    userId,
                    limit: 50,
                    requestName: "GETARTISTCHOICESONG&GET"
                });
                this.setState({
                    info: info,
                    loading: false,
                });
                localStorage.setItem("SingerSongInfo",JSON.stringify(info));
            }else{
                this.setState({
                    info: localInfo,
                    loading: false,
                });
            }
        }
    }

    render() {
        const { info,loading } = this.state;
        return (
            <div className="singer-song">
                <Skeleton loading={ loading } active={ true } paragraph={{rows:9}}>
                    <Label song={ info }/>
                </Skeleton>
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

export default connect(mapPropsToState)(SingerSong)
