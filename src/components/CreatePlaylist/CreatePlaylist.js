import React, { Component } from 'react';
import classNames from "classnames";
import "./create-playlist.scss";
import { connect } from "react-redux";
import Header from "../Header/Header";
import { createPlaylistStatusOffAction } from "../../actions/createPlaylistStatusAction";
import { filesLimited } from "../utils";
import { postPlaylistInfo, uploadImage } from "../../service/api";
import { message } from "antd";
import md5 from "md5";

class CreatePlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currPic: "",
            title: "",
            info: "",
            md5Pic: "",
            fileType: "jpg"
        };
        this.CreatePlaylistRef = React.createRef();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.createPlaylistStatus) {
            this.CreatePlaylistRef.current.style.display = "grid";
        } else {
            setTimeout(() => {
                this.CreatePlaylistRef.current.style.display = "none";
            }, 600);
        }
        return true;
    }

    uploadImg=()=>{
        let form = new FormData();
        let fileInput = document.createElement("input");
        fileInput.setAttribute("type","file");
        fileInput.click();
        fileInput.addEventListener("change", ()=> {
            let files = fileInput.files,
                fileReader = new FileReader();
            if( filesLimited(files[0], 2100000, ["jpg","jpeg","png"]),
                this.type="jpg" ){
                fileReader.readAsDataURL(files[0]);
                /*监听文件上传状态，文件装载完毕后可以对文件进行操作*/
                fileReader.onload =(e)=>{
                    /*获取图片文件*/
                    let pic = e.target.result;
                    /*将信息装载进form表单*/
                    const md5Pic = md5(new Date());
                    form.append("pic", pic);
                    form.append("type",this.type);
                    form.append("name",md5Pic);
                    /*上传*/
                    uploadImage(form);
                    this.setState({
                        currPic: pic,
                        md5Pic: md5Pic,
                        fileType: this.type
                    })
                };
            }else{
                message.error("文件错误！")
            }
        });
    };

    playlistTitle=(e)=>{
        this.setState({
            title: e.target.value
        })
    };

    playlistInfo=(e)=>{
        this.setState({
            info: e.target.value
        })
    };

    playlistTag=(e)=>{
        this.setState({
            tag: e.target.value
        })
    };

    savePlaylistInfo=()=>{
        const { title,info,md5Pic="default",fileType,tag="流行" } = this.state;
        const { userInfo } = this.props;
        const { code } = postPlaylistInfo({
            title,
            info,
            md5Pic,
            userId: userInfo.id,
            type: 0,
            fileType,
            tag
        })
    };

    render() {
        const { createPlaylistStatus,userInfo } = this.props;
        const { currPic } = this.state;
        return (
            <div ref={ this.CreatePlaylistRef } className={
                classNames({
                    "create-playlist": true,
                    "create-playlist-move-in": createPlaylistStatus,
                    'create-playlist-move-out': !createPlaylistStatus
                })
            }>
                <Header action={ createPlaylistStatusOffAction }/>
                <h1>歌单信息</h1>
                <div className="content-wrapper">
                    <div className="info-wrapper">
                        <div className="upload-cover" style={{backgroundImage: `url(${ currPic })` }} onClick={ this.uploadImg }></div>
                        <div className="playlist-title">
                            <div className="input-wrapper">
                                <input type="text" placeholder="这是你的标题" onChange={ this.playlistTitle }/>
                                <input type="text" placeholder="这是你的标签以逗号隔开" onChange={ this.playlistTag }/>
                            </div>
                            <div className="userinfo-wrapper">
                                <span className="user-avat" style={{ backgroundImage: `url(${ userInfo.avatar })`  }}></span>
                                { userInfo.name }
                            </div>
                            <div style={{ fontSize: "24px",fontWeight: "bold" }}>
                                精心完善歌单信息有机会获得推荐，让更多人用户看见你的大作。
                            </div>
                        </div>
                    </div>
                    <div className="playlist-introduction">
                        <textarea name="" id="" cols="300" rows="100" onChange={ this.playlistInfo }></textarea>
                        <div className="save" onClick={ this.savePlaylistInfo }>保存</div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) =>{
    return {
        ratingStatus: state.ratingStatus.rating,
        musicPlayStatus: state.musicPlayStatus.music,
        userInfo: state.userStatus.userInfo,
        commentInfo: state.commentInfo.commentInfo,
        commentDetailStatus: state.commentDetailStatus,
        commentDetailInfo: state.commentDetailInfo.commentDetailInfo,
        createPlaylistStatus: state.createPlaylistStatus.create
    };
};

export default connect(mapStateToProps)(CreatePlaylist);

