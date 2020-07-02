import React, {Component} from 'react';
import {connect} from "react-redux";
import Label from "../Label/Label";
import { getArtistChoiceSong } from "../../service/api";
import "./singer-choice.scss";
import { Skeleton } from "antd";

class SingerChoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: [],
            loading: true,
        };
    }

    async componentDidMount() {
        const localInfo = JSON.parse(localStorage.getItem("SingerChoiceInfo")) || [],
              { singerStatus,userInfo } = this.props,
              artistId = singerStatus.artistId,
              userId = userInfo.id;
        if( singerStatus.singer ){
            if( localInfo.length <= 0 || localInfo[0].artistId !== artistId ) {
                // console.log(localInfo.length <= 0, localInfo[0].artistId !== artistId)
                const { info } = await getArtistChoiceSong({
                    artistId,
                    userId,
                    limit: 10,
                    requestName: "GETARTISTCHOICESONG&GET"
                });
                this.setState({
                    info: info,
                    loading: false,
                });
                localStorage.setItem("SingerChoiceInfo",JSON.stringify(info));
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
            <div className="singer-choice">
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

export default connect(mapPropsToState)(SingerChoice)
