import React, {Component} from 'react';
import "./camp.scss";
import { connect } from "react-redux";
import classNames from "classnames";
import Header from "../Header/Header";
import { campStatusOffAction } from "../../actions/campStatusAction";
import { FollowIcon, NiceIcon, PlayIcon, SendIcon} from "../svg";
import { camperStatusOnAction } from "../../actions/camperStatusAction";
import { getCampNewsList } from "../../service/api";
import {TEST_URL} from "../../service/serverAPI.config";
import {musicPlayStatusOnAction} from "../../actions/musicPlayStatusAction";


class Camp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
        this.CampRef = React.createRef();
    }

    async shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { campStatus,camperStatus } = this.props;
        if ( nextProps.campStatus.camp && !campStatus.camp ) {
            this.CampRef.current.style.display = "grid";
            const {list} = await getCampNewsList({});
            this.setState({
                list
            })
        } else {
            setTimeout(() => {
                this.CampRef.current.style.display = "none";
            }, 6000);
        }
        if( !nextProps.camperStatus.camper && camperStatus.camper ){
            const {list} = await getCampNewsList({});
            this.setState({
                list
            })
        }
        return true;
    }

    callCamper=()=>{
        this.props.dispatch(camperStatusOnAction({}))
    };

    playSong=(data)=>{
        console.log(data)
        window.audioClass.play();
        data.duration = "";
        data.playlist = [];
        data.cover = `${ TEST_URL }/api/images?id=${ data.albumMid }&format=jpg`;
        data.src = `${ TEST_URL }/api/audio?id=${ data.fileId }&format=m4a`;
        data.favorite = false;
        this.props.dispatch(musicPlayStatusOnAction(data));
    };

    render() {
        const { campStatus } = this.props,
              { list } = this.state;
        const note = list.map((v,k)=>{
            return(
                <div key={ v.campId } className="music-note">
                    <span
                        className="camp-user-cover"
                        style={{ backgroundImage: `url(${v.cover})` }}
                        onClick={ this.playSong.bind(this, v) }
                    ></span>
                    <div className="camp-word">{ v.word }</div>
                    <div className="star-follow">
                        <div>
                            <NiceIcon color="#8a8a8a"/>
                        </div>
                        <div>
                            <FollowIcon color="#8a8a8a"/>
                        </div>
                    </div>
                </div>
            )
        });
        return (
            <div ref={ this.CampRef } className={
                classNames({
                    "camp": true,
                    "camp-move-in": campStatus.camp,
                    "camp-move-out": !campStatus.camp
                })
            }>
                <Header action={ campStatusOffAction }/>
                <div className="camp-title">
                    社区
                </div>
                <div className="tools-nav">
                    <div className="send" onClick={ this.callCamper }>
                        <SendIcon/>
                    </div>
                    <div className="follow">
                        <FollowIcon color="#d81e06" width="30" height="30"/>
                    </div>
                </div>
                <div className="camp-content">
                    <div className="music-note">
                        <span className="camp-user-cover"></span>
                        <div className="camp-word">原来在接受答案和装傻陪伴两个选择面前 我还是会选择后者</div>
                        <div className="star-follow">
                            <div>
                                <NiceIcon color="#8a8a8a"/>
                            </div>
                            <div>
                                <FollowIcon color="#8a8a8a"/>
                            </div>
                        </div>
                    </div>
                    { note }
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state,ownProps) =>{
    return {
        userStatus: state.userStatus.user,
        userInfo: state.userStatus.userInfo,
        searchStatus: state.userStatus.search,
        podcastStatus: state.userStatus.podcast,
        coverStatus: state.userStatus.cover,
        lyricStatus: state.userStatus.lyric,
        campStatus: state.campStatus,
        camperStatus: state.camperStatus
    };
};

export default connect(mapStateToProps)(Camp);
