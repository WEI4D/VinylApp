import React, { Component,useState } from 'react';
import classNames from "classnames";
import { connect } from "react-redux";
import "./singer.scss";
import Header from "../Header/Header";
import { singerStatusOffAction, singerStatusOnAction } from "../../actions/singerStatusAction";
import { getArtistChoiceSong, getArtistInfo } from "../../service/api";
import { URL_CONFIG } from "../../service/serverAPI.config";
import { isEmpty } from "../utils";
import { Router,Route,Switch,Redirect,Link } from "react-router-dom";
import SingerChoice from "../SingerChoice/SingerChoice";
import SingerSong from "../SingerSong/SingerSong";
import SingerAlbum from "../SingerAlbum/SingerAlbum";

class Singer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artistInfo: [{
                artistId: 1415626,
                artist: "WE!D",
                experience: "",
                nation: "",
                type: ""
            }],
            host: ""
        };
        this.singerRef = React.createRef();
    }

    async shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { singerStatus,userInfo } = this.props;
        console.log(singerStatus,nextProps.singerStatus);
        if (nextProps.singerStatus.singer) {
            this.singerRef.current.style.display = "grid";
            if (singerStatus.singer !== nextProps.singerStatus.singer) {
                console.log("success");
                const { info } = await getArtistInfo({
                    artistId: nextProps.singerStatus.artistId,
                    requestName: "getArtistInfo"
                });
                this.setState({
                    artistInfo: info,
                });
                if( window.location.protocol === "file:" ){
                    // ${window.location.protocol}//${window.location.pathname}
                    window.location.href = `${window.location.href}artist/choice/${nextProps.singerStatus.artistId}`;
                    // alert(window.location.href)
                }
                // window.location.href = `${window.location.protocol}//${window.location.host}/#/artist/choice/${nextProps.singerStatus.artistId}`;
                return true;
            }
        } else {
            setTimeout(() => {
                this.singerRef.current.style.display = "none";
            }, 600);
            if( window.location.protocol === "file:" ) {
                window.location.hash = "";
            }
            // window.location.href = window.location.protocol + '//' + window.location.host+"/#/";
        }
        return false
    }

    render() {
        const { singerStatus,userInfo } = this.props,
              { artistInfo } = this.state,
              history = require("history").createHashHistory();
        return (
            <Router history={ history }>
                <div ref={ this.singerRef } className={
                    classNames({
                        "singerC": true,
                        "singerC-move-in": singerStatus.singer,
                        "singerC-move-out": !singerStatus.singer
                    })
                }
                >
                    <Header action={ singerStatusOffAction }/>
                    <SingerHead artistInfo={ artistInfo }/>
                    <div className="song-bar">
                        <SingerNavBar artistId={ singerStatus.artistId }/>
                    </div>
                    <div className="singer-detail">
                        <Switch>
                            {/*<Route exact path="/" component={ SingerChoice } />*/}
                            <Route path='/artist/choice/:id' component={ SingerChoice } />
                            <Route path='/artist/song/:id' component={ SingerSong }/>
                            <Route path='/artist/album/:id' component={ SingerAlbum }/>
                            <Route path='/artist/detail/:id' component={
                                SingerDetail.bind(this,{experience: artistInfo[0].experience})
                            }/>
                        </Switch>
                    </div>
                </div>
            </Router>
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

const SingerHead=(props)=> {
    const { artistInfo } = props;
    return(
        <div className="singer-info-wrapper">
            <div className="singer-cover">
                <i style={{backgroundImage: `url(${ URL_CONFIG.getImage }id=${ artistInfo[0].artistId }&format=jpg)`}}></i>
            </div>
            <div className="singer-info">
                <div className="singer-name">
                    <h1>{ artistInfo[0].artist }</h1>
                </div>
                <div className="singer-nation">
                    国籍：{ isEmpty(artistInfo[0].nation) ? "暂无数据" : artistInfo[0].nation }
                </div>
                <div className="singer-position">
                    职业：{ isEmpty(artistInfo[0].nation) ? "暂无数据" : artistInfo[0].nation }
                </div>
            </div>
            <div className="mask"></div>
        </div>
    )
};

const SingerNavBar=(props)=>{
    const [ checkedKey,setCheckedKey ] = useState(0),
          textArr = ["精选", "歌曲", "专辑", "详情"],
          { artistId } = props;
    let target = "";
    const node = textArr.map((v,k)=>{
        switch (k) {
            case 0:
                target = "choice";
                break;
            case 1:
                target = "song";
                break;
            case 2:
                target = "album";
                break;
            case 3:
                target = "detail";
                break;
            default:
                target = "";
        }
        return(
            <span className={ checkedKey === k ? "song-bar-checked":"" } onClick={ ()=> setCheckedKey(k) }>
                <Link to={{
                    pathname: `/artist/${ target }/${ artistId }`,
                    state: artistId
                }}>
                    { v }
                </Link>
            </span>
        )
    });
    return node;
};

const SingerDetail=(props)=>{
    const { experience } = props,
          defaultStyle = { padding: "0 0 0 10px"  };
    let content = "暂无数据";
    return isEmpty(experience) ? <div style={defaultStyle}>{content}</div> : <div>{experience}</div>
};

export default connect(mapPropsToState)(Singer)
