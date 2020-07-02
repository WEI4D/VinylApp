import React, {Component} from 'react';
import './search.scss';
import {connect} from "react-redux";
import classNames from "classnames";
import { Icon } from "antd";
import { searchStatussUnsearchAction } from "../../actions/searchStatusAction";
import { isEmpty } from "../utils";
import { getHostSong,searchMusicByKeyword } from "../../service/api";
import axios from "axios";
import { URL_CONFIG,TEST_URL } from "../../service/serverAPI.config";
import { playSong } from "../utils";
import { musicPlayStatusOnAction } from "../../actions/musicPlayStatusAction";
import { listenedInfoOnAction } from "../../actions/listenedInfoAction";
// const electron = window.require('electron');
// const {ipcRenderer} = electron;

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
            songlist: [],
            timerId: null,
            search: []
        }
    }

    back=()=>{
        this.props.dispatch(searchStatussUnsearchAction);
    };
    /*
    * fn回调函数
    * delay延时默认为500ms
    * */
    debounce=(fn,delay=500)=>{
        return (...rest)=>{
            let args = rest;
            /*当用户在规定时间内重复操作时，清除当前定时器1*/
            if ( this.state.timerId ) { clearTimeout(this.state.timerId); }
            /*重新生成定时器*/
            this.state.timerId = setTimeout(()=>{
                fn.apply(this,args);
            },delay);
        }
    };

    searchMusicByKeyword=(keyword)=>{
        axios.get(URL_CONFIG.searchMusicByKeyword,{
            params:{
                userId: this.props.userStatus.userInfo.id,
                keyword,
                requestName: "SEARCHMUSICBYKEYWORD&GET"
            }
        }).then((res)=>{
            let songlist = res.songlist;
            this.setState({
                songlist
            });
        });
        this.addSearchHistory(keyword);
    };

    /*关键字搜索节流*/
    inputKeyWord=(e,value=null) => {
        let result = value || e.target.value;
        this.setState({
            keyword: result
        });
        let debounceAxios = this.debounce(this.searchMusicByKeyword,500);
        debounceAxios(result);
    };
    /*历史记录进搜索框*/
    addSearchInput=(value)=>{
        this.setState({
            keyword: value
        });
        this.inputKeyWord(null,value);
    };
    /*删除搜索历史记录*/
    deleteSearchHistory=(key)=>{
        let list = JSON.parse(localStorage.getItem("SEARCH_HISTORY_LIST")).list;
        list.splice(key,1);
        let historyList = {
            list
        };
        localStorage.setItem("SEARCH_HISTORY_LIST",JSON.stringify(historyList));
        // localStorage.setItem("SEARCH_HISTORY_LIST",JSON.stringify(historyList));

    };
    /*本地存储搜索历史*/
    addSearchHistory=(keyword)=>{
        if(keyword.length > 0){
            let searchHistoryList = localStorage.getItem("SEARCH_HISTORY_LIST");
            let list = [];
            let historyList = {
                list
            };
            let trigger = true;
            if(isEmpty(searchHistoryList)){
                list.unshift(keyword);
                localStorage.setItem("SEARCH_HISTORY_LIST",JSON.stringify(historyList));
            }else{
                let shortList = JSON.parse(searchHistoryList).list;
                shortList.map((v,k)=>{
                    if(v === keyword){
                        trigger = false;
                        return false;
                    }
                });
                if(trigger){
                    shortList.unshift(keyword);
                    if(shortList.length > 4){
                        shortList.pop();
                    };
                    historyList.list = shortList;
                    localStorage.setItem("SEARCH_HISTORY_LIST",JSON.stringify(historyList));
                }
            }
        }
    };

    async componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.searchStatus) {
            this.refs.SearchStyle.style.display = "block";
            const hotSong = await getHostSong({
                requestName: "GETHOTSONG&GET"
            });
            let songlist = hotSong.songlist;
            this.setState({
                songlist
            });
        } else {
            setTimeout(() => {
                this.refs.SearchStyle.style.display = "none";
            }, 600);
        }
    }

    toPlaySong=(songInfo,songList)=>{
        let { listenedInfo } = this.props;
        let data = playSong(songInfo,songList);
        listenedInfo.push(data);
        this.props.dispatch(musicPlayStatusOnAction(data));
        this.props.dispatch(listenedInfoOnAction(listenedInfo));
        localStorage.setItem("listened",JSON.stringify(listenedInfo));
    };

    render() {
        const { searchStatus } = this.props;
        const { songlist } = this.state;
        const localList = localStorage.getItem("SEARCH_HISTORY_LIST");
        const historySpan =()=>{
            if( isEmpty(localList) ){
                return
            }else{
                return (
                    JSON.parse(localList).list.map((history,k)=>{
                        return (
                            <span key={ k } onDoubleClick={ this.deleteSearchHistory.bind(this,k) }  onClick={ this.addSearchInput.bind(this,history) }>
                                { history }
                            </span>
                        )
                    })
                )
            }
        };
        return (
            <div ref="SearchStyle" className={
                classNames({
                    "search-wrapper": true,
                    "search-block-move-in": searchStatus,
                    "search-block-move-out": !searchStatus
                })
            }>
                <span className="back" onClick={ this.back }>
                    <Icon type="left" style={{fontSize: "20px"}}/>
                </span>
                <div className="search">
                    <input onChange={ this.inputKeyWord } value={ this.state.keyword } className="search-input" type="text" placeholder="Search..."/>
                    <div className="search-history">
                        {
                            historySpan()
                        }
                    </div>
                </div>
                <ul className="search-result">
                    {
                        songlist.map((v,k)=>{
                            let cover = { "backgroundImage": `url(${TEST_URL}/api/images?id=000YkweZ2lG59L&format=jpg)` }
                            if( !isEmpty(v.albumMid) ){
                                cover = {
                                    "backgroundImage": `url(${TEST_URL}/api/images?id=${v.albumMid}&format=jpg)`
                                }
                            }
                            return(
                                <li key={ k }>
                                    <i className="result-cover" style={cover}></i>
                                    <span className="song-name" onClick={ this.toPlaySong.bind(this,v,songlist) }>
                                        {
                                            v.songName
                                        }
                                    </span>
                                    <span className="singer">
                                        {
                                            v.artist
                                        }
                                    </span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
const mapStateToProps = (state,ownProps) =>{
    return {
        userStatus: state.userStatus,
        searchStatus: state.userStatus.search,
        listenedInfo: state.listenedInfo.listened,
    };
}

export default connect(mapStateToProps)(Search);
