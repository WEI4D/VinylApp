import React, {Component} from 'react';
import "./music.scss";
import { Icon } from "antd";
import {connect} from "react-redux";
import { lyricStatusOnAction } from "../../actions/lyricStatusAction";
import { musicPlayStatusOnAction,musicPlayStatusOffAction } from "../../actions/musicPlayStatusAction";
import { HeartIcon,PlayIcon,PauseIcon,PreIcon,NextIcon } from "../svg";
import { TEST_URL, URL_CONFIG } from "../../service/serverAPI.config";
import { getPodcastInfo } from "../../service/api";
import axios from "axios";


export default class Music extends Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 0,
        };
    }
    computedProgressPercent=(audioClass)=>{
        const { duration,currentTime } = audioClass;
        let percent = 0;
        if( duration > 0 && currentTime > 0 ){
            percent = currentTime/duration;
        }
        return percent*100;
    };
    componentDidMount() {
        window.audioClass.addEventListener("timeupdate",()=>{
            this.setState({
                percent: this.computedProgressPercent(window.audioClass)
            })
        });
    }

    render() {
        const { musicPlayStatus } = this.props;
        return (
            <div className="music">
                <div className="music-bar" style={
                    {
                        width: `${this.state.percent}%`
                    }
                }>
                    {/*这是音乐进度条*/}
                </div>
                <div className="music-bar-channel">
                    {/*这是音乐进度槽*/}
                </div>
                <audio
                    ref={(element)=>window.audioClass = element }
                    src={ musicPlayStatus.info.src }
                    type="audio/mpeg"
                    autoPlay={ true }
                    preload="auto"
                />
            </div>
        )
    }
}
