import React, {Component} from 'react';
import "./message.scss";
import { Icon } from 'antd';
import {connect} from "react-redux";
import classNames from "classnames";
import { messageStatusOffAction } from "../../actions/messageStatusAction";
import { BASE_URL, TEST_URL, URL_CONFIG } from "../../service/serverAPI.config";
import { musicPlayStatusOnAction } from "../../actions/musicPlayStatusAction";
import {shareStatusOnAction} from "../../actions/shareStatusAction";

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    closeMessage=()=>{
        this.props.dispatch(messageStatusOffAction)
    };

    playSong=(data)=>{
        window.audioClass.play();
        data.duration = "";
        data.playlist = [];
        data.cover = `${ TEST_URL }/api/images?id=${ data.albumMid }&format=jpg`;
        data.src = `${ TEST_URL }/api/audio?id=${ data.fileId }&format=m4a`;
        data.favorite = false;
        this.props.dispatch(musicPlayStatusOnAction(data));
    };

    downloadAudio=(info) => {
        let a =document.createElement("a");
        let name = info.name;
        a.download = name;
        a.href = `${ BASE_URL }/api/download?fileId=${ info.fileId }&format=m4a`;
        a.click();
        console.log(a);
    };

    callShare=(data)=>{
        data.duration = "";
        data.playlist = [];
        data.cover = `${ TEST_URL }/api/images?id=${ data.albumMid }&format=jpg`;
        data.src = `${ TEST_URL }/api/audio?id=${ data.fileId }&format=m4a`;
        data.favorite = false;
        this.props.dispatch(shareStatusOnAction(data))
    };

    render() {
        const iconStyle = {"fontSize": "30px"};
        const { trigger,info } = this.props.messageStatus;
        let bgStyle = {
            backgroundImage: `url(${ URL_CONFIG.getImage }id=${ "000bRc942Vz1GF" }&format=jpg)`
        };
        return (
            <div className={
                classNames({
                    "message": true,
                    "message-move-in": trigger,
                    "message-move-out": !trigger,
                })
            }
            >
                <div className="content">
                    <div className="cover-and-some-btn">
                        <div className="rec-cover" style={
                            {
                                backgroundImage: `url(${TEST_URL}/api/images?id=${ info.albumMid }&format=jpg)`
                            }
                        }>

                        </div>
                        <div className="some-btn">
                            <span onClick={ this.playSong.bind(this,info ) }>
                                <Icon type="play-circle" style={ iconStyle }/>
                            </span>
                            <span>
                                <Icon type="heart" style={iconStyle}/>
                            </span>
                            <span onClick={ this.downloadAudio.bind(this,info) }>
                                <Icon type="download" style={iconStyle}/>
                            </span>
                            <span>
                                <Icon type="plus-square" style={iconStyle}/>
                            </span>
                            <span onClick={ this.callShare.bind(this,info) }>
                                <Icon type="share-alt" style={iconStyle}/>
                            </span>
                        </div>
                    </div>
                    <div className="song-name-and-lyric">
                        <div className="song-name-and-singer">
                            <p className="song-name">{ info.name }</p>
                            <p className="singer">{ info.artist }</p>
                        </div>
                        <div>
                            <p>
                                I'm all alone baby, I'm all alone
                            </p>
                            <p>
                                I'm waiting for something, always waiting
                            </p>
                            <p>
                                Feeling nothing, wondering if it'll ever change
                            </p>
                            <p>
                                And then I give a little more, oh babe ohhh
                            </p>
                            <p>
                                Give a little more, oh babe ohhh
                            </p>
                            <p>
                                I'm not falling in love with ya, I'm not falling in love
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mask" onClick={ this.closeMessage }></div>
            </div>
        )
    }
}
const mapStateToProps = (state,ownProps) =>{
    return {
        messageStatus: state.messageStatus.message,
    };
};

export default connect(mapStateToProps)(Message);
