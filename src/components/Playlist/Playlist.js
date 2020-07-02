import React, {Component} from 'react';
import classNames from "classnames";
import {connect} from "react-redux";
import "./playlist.scss";
import Header from "../Header/Header";
import { playlistStatusOffAction } from "../../actions/playlistStatusAction";
import { Tag } from "antd";
import { getPlaylist } from "../../service/api";
import {isEmpty} from "../utils";
import {URL_CONFIG} from "../../service/serverAPI.config";
import PlaylistCreator from "../PlaylistCreator/PlaylistCreator";
import { playlistDetailStatusOnAction } from "../../actions/playlistDetailStatusAction";

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myPlaylist: [],
            favoritePlaylist: [],
            commandPlaylist: [],
            trigger: true
        }
    }

    async shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(nextProps.playlistStatus && !isEmpty(nextProps.userInfo.id) ){
            this.refs.PlaylistStyle.style.display = "block";
            if( this.state.trigger ){
                const { result } = await getPlaylist({
                    userId: nextProps.userInfo.id,
                    requestName: "GETPLAYLIST&GET"
                });
                this.setState({
                    myPlaylist: result.myPlaylist,
                    favoritePlaylist: result.favoritePlaylist,
                    commandPlaylist: result.commandPlaylist,
                    trigger: false
                })
            }
        }else{
            setTimeout(()=>{
                this.refs.PlaylistStyle.style.display = "none";
            },600);
        }
        if( !nextProps.createPlaylistStatus&&this.props.createPlaylistStatus ){
            const { result } = await getPlaylist({
                userId: nextProps.userInfo.id,
                requestName: "GETPLAYLIST&GET"
            });
            this.setState({
                myPlaylist: result.myPlaylist
            })
        }
        return true;
    }

    callPlaylistDetail=(playlistId)=>{
        this.props.dispatch(playlistDetailStatusOnAction(playlistId));
    };

    render() {
        const { playlistStatus } = this.props;
        const { myPlaylist,favoritePlaylist,commandPlaylist } = this.state;
        return (
            <div ref="PlaylistStyle" className={
                classNames({
                    "playlist-index": true,
                    "playlist-right-block-move-in": playlistStatus,
                    "playlist-right-block-move-out": !playlistStatus
                })
            }>
                <Header action={ playlistStatusOffAction }/>
                <div className="playlist-wrapper">
                    <div className="playlist-personal">
                        <div className="playlist-personal-mask mask"></div>
                        <div className="info">
                            <h1 className="title">我的</h1>
                            <PlaylistCreator/>
                            <ul>
                                <PlaylistItem data={ myPlaylist } toPlaylistDetail={ this.callPlaylistDetail }/>
                            </ul>
                        </div>
                    </div>
                    <div className="playlist-favorite">
                        <div className="playlist-favorite-mask mask"></div>
                        <div className="info">
                            <h1 className="title">喜欢</h1>
                            <ul>
                                <PlaylistItem data={ favoritePlaylist } toPlaylistDetail={ this.callPlaylistDetail }/>
                            </ul>
                        </div>
                    </div>
                    <div className="playlist-official">
                        <div className="playlist-official-mask mask"></div>
                        <div className="info">
                            <h1 className="title">推荐</h1>
                            <ul>
                                <PlaylistItem data={ commandPlaylist } toPlaylistDetail={ this.callPlaylistDetail }/>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) =>{
    return {
        playlistStatus: state.userStatus.playlist,
        userInfo: state.userStatus.userInfo,
        createPlaylistStatus: state.createPlaylistStatus.create
    };
};

const PlaylistItem=(props)=>{
    const { data,toPlaylistDetail=function () {} } = props,
          tagList = ["salmon","#f50","#2db7f5","#87d068","#108ee9","magenta","volcano","orange"];
    console.log(toPlaylistDetail);
    const nodeList = data.map((v,k)=>{
        return(
            <li key={ k }>
                <div style={{"background-image": `url(${ v.cover }`}}
                     onClick={ toPlaylistDetail.bind(this, v.playlistId) }
                >
                    <div className="info-body">
                        <h2>{ v.name }</h2>
                        <div className="music-tag">
                            {
                                v.tag.split(",").map((v1,k1)=>{
                                    return(
                                        <Tag key={ k1 } color={ tagList[Math.floor(Math.random()*(tagList.length+1))] }>
                                            { v1 }
                                        </Tag>
                                    )
                                })
                            }
                        </div>
                        <p>
                            { v.about }
                        </p>
                    </div>
                </div>
            </li>
        )
    });
    return nodeList;
};

// const PlaylistCreator=(props)=>{
//     const { style,type, } = props;
// };

export default connect(mapStateToProps)(Playlist);
