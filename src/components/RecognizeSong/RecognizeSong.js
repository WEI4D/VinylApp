import React, {Component} from 'react';
import classNames from "classnames";
import "./recognize-song.scss";
import Header from "../Header/Header";
import Recorder from 'js-audio-recorder';
import { connect } from "react-redux";
import { recognizeSongStatusOffAction } from "../../actions/recognizeSongStatusAction";
import { messageStatusOnAction } from "../../actions/messageStatusAction";
import { getRecognizeSongResult } from "../../service/api";
import { recorderConf } from "../recorder.config";

class RecognizeSong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /*默认进入组件开始录音*/
            recorder: true,
            /*录音时长*/
            duration: 15000
        };
        /*初始化全局录音对象*/
        this.recorder = new Recorder(recorderConf);
    }
    /*传输Blob音频*/
    sendAudioBlob= async () => {
        /*获取全局的录音对象*/
        let recorder = this.recorder;
        /*对录音对象进行初步校验*/
        if (typeof recorder === "undefined") {
            this.recorder = new Recorder(recorderConf);
        } else {
            /*为避免出错使用try关键字*/
            try {
                this.recorder.stop();
                let voiceFile = recorder.getWAVBlob();
                /*构造表单数据*/
                let formData = new FormData();
                /*将Blob文件放入表单*/
                formData.append('file', voiceFile);
                /*以用户ID作为唯一标识*/
                formData.append('id', "00000");
                console.log(formData.get("file"));
                /*使用封装的axios发送表单数据*/
                const { similar } = await getRecognizeSongResult(formData);
                this.props.dispatch(messageStatusOnAction(similar[0]));
                /*释放录音对象*/
                this.recorder = undefined;
            }catch (e) {}
        }
    };
    /*录音动画*/
    pauseAnimation= ()=> {
        const { recorder,duration } = this.state;
        this.sendAudioBlob();
        console.log("this state: ",recorder)
        this.setState({
            recorder: !recorder
        }, () => {
            console.log(recorder,this.state.recorder);
            if (this.state.recorder) {
                if (typeof this.recorder === "undefined") {
                    this.recorder = new Recorder(recorderConf);
                }
                this.recorder.start().then(() => {
                    console.log("开始录音！");
                    setTimeout(()=>{
                        this.sendAudioBlob();
                    },duration);
                    setTimeout(()=>{
                        this.setState({
                            recorder: false
                        })
                    }, 4 * duration)
                }, (error) => {
                    console.log("ERROR: " + error);
                });
            }
        });
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { duration } = this.state;
        const { recognizeSongStatus } = this.props;
        if ( nextProps.recognizeSongStatus && !recognizeSongStatus  ) {
            this.refs.RecognizeSongStyle.style.display = "grid";
            if (typeof this.recorder === "undefined") {
                this.recorder = new Recorder(recorderConf);
            }
            this.recorder.start();
            setTimeout( ()=> {
                this.sendAudioBlob();
            }, duration);
            setTimeout(()=>{
                this.setState({
                    recorder: false,
                })
            }, 4 * duration);
        } else {
            setTimeout(() => {
                this.refs.RecognizeSongStyle.style.display = "none";
            }, 600);
        }
        return true;
    }

    render() {
        const { recognizeSongStatus } = this.props;
        const { recorder } = this.state;
        return (
            <div ref="RecognizeSongStyle" className={
                classNames(
                    {
                        "recognize-song": true,
                        "recognize-song-move-in": recognizeSongStatus,
                        "recognize-song-move-out": !recognizeSongStatus,
                    }
                )
            }>
                <Header action={ recognizeSongStatusOffAction }/>
                <div className="audio-wrapper">
                    <div className="audio-copyright">
                        V
                    </div>
                </div>
                <div className={
                    classNames({
                        "audio-mask": true,
                        "animation-pause": !recorder,
                    })
                } onClick={ this.pauseAnimation }>
                </div>
                <div className={
                    classNames({
                        "spray-one": true,
                        "animation-pause": !recorder,
                    })
                }>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) =>{
    return {
        recognizeSongStatus: state.recognizeSongStatus.recognize,
        userInfo: state.userStatus.userInfo,
    };
};

export default connect(mapStateToProps)(RecognizeSong);
