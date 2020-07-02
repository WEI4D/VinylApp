import React, {Component} from 'react';
import Login from "../Login/Login";
import Vinyl from "../Vinyl/Vinyl";
import './Home.scss';
import User from "../User/User";
import { connect } from "react-redux";
import { Route,Router,Switch } from 'react-router-dom';
import Search from "../Search/Search";
import Podcast from "../Podcast/Podcast";
import Cover from "../Cover/Cover";
import Lyric from "../Lyric/LyricC";
import Location from "../Location/Location";
import Music from "../Music/Music";
import Playlist from "../Playlist/Playlist";
import PodcastDetail from "../PodcastDetail/PodcastDetail";
import Favorite from "../Favorite/Favorite";
import Recommend from "../Recommend/Recommend";
import Header from "../Header/Header";
import Setting from "../Setting/Setting";
import RecognizeSong from "../RecognizeSong/RecognizeSong";
import Message from "../Message/Message";
import Register from "../Register/Register";
import UserDetail from "../UserDetail/UserDetail";
import Ratings from "../Ratings/Ratings";
import CommentDialog from "../CommentDialog/CommentDialog";
import CommentDetail from "../CommentDetail/CommentDetail";
import Singer from "../Singer/Singer";
import CreatePlaylist from "../CreatePlaylist/CreatePlaylist";
import PlaylistDetail from "../PlaylistDetail/PlaylistDetail";
import HotSong from "../HotSong/HotSong";
import HotComment from "../HotComment/HotComment";
import Camp from "../Camp/Camp";
import Guide from "../Guide/Guide";
import Camper from "../Camper/Camper";
import Share from "../Share/Share";
import {getUserSetting} from "../../service/api";
import {isEmpty} from "../utils";
import {settingInfoOffAction} from "../../actions/settingInfoAction";
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                "LEFT_COVER": "",
                "RIGHT_FIRST": "",
                "RIGHT_SECOND": "",
                "RIGHT_THIRD": "",
                "RIGHT_FOUR": ""
            }]
        };
    }



    // async componentDidMount() {
    //     const { userInfo } = this.props;
    //     if( isEmpty(userInfo.id) ){
    //         return;
    //     }else{
    //         const { data } = await getUserSetting({
    //             userId: userInfo.id,
    //         });
    //         this.setState({
    //             data
    //         })
    //     }
    // }

    async shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { userInfo } = nextProps;
        const { settingStatus,settingInfo } = this.props;
        if (nextProps.userStatus && !this.props.userStatus) {
            const { data } = await getUserSetting({
                userId: userInfo.id,
            });
            this.setState({
                data
            })
        }
        if (!nextProps.settingStatus.setting && settingStatus.setting) {
            const { data } = await getUserSetting({
                userId: userInfo.id,
            });
            this.setState({
                data
            })
        }
        return true;
    }

    render() {
        const history = require('history').createBrowserHistory();
        const { userStatus } = this.props;
        const { data } = this.state;
        console.log("this.state",this.state);
        return (
            <Router history={history}>
                <React.Fragment>
                    <div className="drag-wrapper"></div>
                    {/*<Header isLeft={ true }/>*/}
                    <div className="login-wrapper">
                        <div className="login-body">
                            { userStatus ? <User/> : <Login/> }
                        </div>
                        <div className="cover">
                            <div className="cover-img" style={{ backgroundImage: `url(${ data[0].LEFT_COVER })` }}></div>
                        </div>
                        <Vinyl cover={ data[0] }/>
                    </div>
                    <Guide/>
                    <Music/>
                    <Search/>
                    <Podcast/>
                    <Cover/>
                    <Lyric/>
                    <Location/>
                    <Playlist/>
                    <Camp/>
                    <Favorite/>
                    <PodcastDetail/>
                    <Recommend/>
                    <Setting/>
                    <RecognizeSong/>
                    <Message/>
                    <Register/>
                    <UserDetail/>
                    <Ratings/>
                    <CommentDialog/>
                    <CommentDetail/>
                    <Singer/>
                    <CreatePlaylist/>
                    <PlaylistDetail/>
                    <HotSong/>
                    <HotComment/>
                    <Camper/>
                    <Share/>
                </React.Fragment>
            </Router>
        )
    }
}
const mapStateToProps = (state,ownProps) =>{
    return {
        userStatus: state.userStatus.user,
        lyricStatus: state.musicStatus.lyric,
        coverStatus: state.userStatus.cover,
        searchStatus: state.userStatus.search,
        podcastStatus: state.userStatus.podcast,
        settingStatus: state.settingStatus,
        settingInfo: state.settingInfo,
        userInfo: state.userStatus.userInfo,
    };
}

export default connect(mapStateToProps)(Home);
