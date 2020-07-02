import React, {Component} from 'react';
import {connect} from "react-redux";
import classNames from "classnames";
import "./lyric.scss";
import { Icon } from "antd";
import Header from "../Header/Header";
import { lyricStatusOffAction } from "../../actions/lyricStatusAction";
import { BASE_URL } from "../../service/serverAPI.config";
import axios from "axios";
import Lyric from 'lrc-file-parser';
import { HeartIcon } from "../svg";
import { b64DecodeUnicode } from "../utils";

class LyricC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: [],
            lyricContent: [],
            currLine: 7,
            scroll: -80
        }
    }

    getSongLrc=(id,format="lrc")=>{
        let _this = this;
        axios.get(`${BASE_URL}/api/lyric`,{
            params:{
                id,
                format,
            },
            header: {
                "Content-Type": "application/json;charset=utf-8"
            }
        }).then((res)=>{
            const lyricContent = res.lrc, audioClass = window.audioClass;
            this.lrc = null;
            this.lrc = new Lyric({
                onPlay: function (line,text) {
                    console.log(line,text);
                    _this.setState({
                        currLine: line,
                        scroll: _this.state.scroll + 35
                    },()=>{
                        _this.refs.Lyric.scrollTop = 35 + _this.state.scroll
                    });

                },
                onSetLyric: function (line) {
                    _this.setState({
                        lyricContent: line
                    })
                }
            });

            this.lrc.setLyric(lyricContent);

            audioClass.onplay =()=>{
                this.lrc.play( audioClass.currentTime * 1000 );
                this.refs.Lyric.scrollTop = 40 + this.state.scroll;
            };

            audioClass.onpause =()=>{
                this.lrc.pause();
                console.log("歌曲已暂停！")
            };

        }).catch(err=>{
            console.log(err);
        });
    };

    componentWillReceiveProps(nextProps, nextContext) {

        const { musicPlayStatus } = this.props;
        console.log();
        if( nextProps.lyricStatus ){
            this.refs.LyricStyle.style.display = "grid";
        }else{
            setTimeout(()=>{
                this.refs.LyricStyle.style.display = "none";
            },600);
        }

        if( nextProps.musicPlayStatus.info.id !== musicPlayStatus.info.id ){
            this.getSongLrc(nextProps.musicPlayStatus.info.id,"lrc");
            this.setState({
                scroll: -80
            })
        }

    }


    render() {
        const { lyricStatus,musicPlayStatus } = this.props;
        const { lyricContent,currLine } = this.state;
        return (
            <div ref="LyricStyle"
                 className={
                    classNames({
                        "lyric": true,
                        "lyric-move-in": lyricStatus,
                        "lyric-move-out": !lyricStatus
                    })
                 }
                style={{"background-image": `url(${musicPlayStatus.info.cover})`}}
            >
                <Header action={ lyricStatusOffAction } node={ this.refs.LyricStyle }/>

                <div className="left-lyric">
                    <div className="song-cover"
                         style={{"background-image": `url(${musicPlayStatus.info.cover})`}}
                    >

                    </div>
                </div>

                <div className="right-lyric">
                    <div className="lyric-wrapper">
                        <div className="lyric-mask" ref="Lyric" >
                                {
                                    this.state.lyricContent.map((v,k)=>{
                                        return(
                                            <p className={
                                                classNames({
                                                    "playing": currLine == k
                                                })
                                            }>
                                                {
                                                    v.text
                                                }
                                            </p>
                                        )
                                    })
                                }
                        </div>
                    </div>
                </div>
                <div className="mask">

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state,ownProps) =>{
    return {
        lyricStatus: state.musicStatus.lyric,
        musicPlayStatus: state.musicPlayStatus.music,
    };
}

export default connect(mapStateToProps)(LyricC);
