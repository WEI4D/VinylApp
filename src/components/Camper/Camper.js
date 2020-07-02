import React, {Component} from 'react';
import {connect} from "react-redux";
import classNames from "classnames";
import "./camper.scss";
import Header from "../Header/Header";
import { camperStatusOffAction, camperStatusOnAction } from "../../actions/camperStatusAction";
import { AddCharIcon, ExpressIcon, SendIcon } from "../svg";
import {getCamperSongList, getUserFavoriteSongList, postNews, uploadImage, uploadUserAvatar} from "../../service/api";
import { TEST_URL } from "../../service/serverAPI.config";
import { shareStatusOnAction } from "../../actions/shareStatusAction";
import { musicPlayStatusOnAction } from "../../actions/musicPlayStatusAction";
import {filesLimited, isEmpty} from "../utils";
import {userStatusLoginedAction} from "../../actions/userStatusAction";
import {message} from "antd";
import md5 from "md5";

class Camper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            words: ""
        };
        this.CamperRef = React.createRef()
    }

    async shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {camperStatus} = this.props;
        if (nextProps.camperStatus.camper && !camperStatus.camper) {
            this.CamperRef.current.style.display = "grid";
            const { list } = await getCamperSongList({
                requestName: "GETFAVORITESONGLIST&GET"
            });
            this.setState({
                list
            })
        } else {
            setTimeout(() => {
                this.CamperRef.current.style.display = "none";
            }, 600);
        }
        return true;
    }

    playSong=(data)=>{
        window.audioClass.play();
        data.duration = "";
        data.playlist = [];
        data.cover = `${ TEST_URL }/api/images?id=${ data.albumMid }&format=jpg`;
        data.src = `${ TEST_URL }/api/audio?id=${ data.fileId }&format=m4a`;
        data.favorite = false;
        this.props.dispatch(musicPlayStatusOnAction(data));
        this.props.dispatch(camperStatusOnAction(data));
    };

    userInput=(e)=>{
        this.setState({
            words: e.target.value
        });
    };

    send= async () => {
        const {userInfo, camperStatus} = this.props,
            {words} = this.state;
        const {code} = await postNews({
            userId: userInfo.id,
            words: words,
            pic: camperStatus.data.cover,
            songId: camperStatus.data.id
        });
        if (code === "1") {
            message.success("动态发布成功")
        } else {
            message.error("动态发布失败")
        }
    };

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
                    form.append("pic", pic);
                    form.append("type",this.type);
                    form.append("name",md5(new Date()));
                    /*上传*/
                    uploadImage(form);
                    /*同时将图片信息同步修改至前端，进行渲染和替换*/
                    this.setState({
                        cover: pic
                    })
                };
            }else{
                message.error("文件错误！")
            }
        });
    };

    render() {
        const { camperStatus } = this.props,
              { list } = this.state;
        const choicerChild = list.map((v,k)=>{
            return(
                <div key={ k }
                     className="choicer-child"
                     style={{backgroundImage: `url(${ TEST_URL }/api/images?id=${ v.albumMid }&format=jpg)`}}
                     onClick={ this.playSong.bind(this, v) }
                >
                    <div className="name">
                        { v.name }
                    </div>
                    <div className="artist">
                        { v.artist }
                    </div>
                    <div className="choicer-child-mask"></div>
                </div>
            )
        });
        return (
            <div ref={ this.CamperRef } className={
                classNames({
                    "camper": true,
                    "camper-move-in": camperStatus.camper,
                    "camper-move-out": !camperStatus.camper
                })
            }>
                <Header action={ camperStatusOffAction }/>
                <div className="publish">
                    <div className="music-cover" style={{backgroundImage: `url(${ TEST_URL }/api/images?id=${ camperStatus.data.albumMid }&format=jpg)`}}
                         onClick={ this.uploadImg }
                    ></div>
                    <div className="music-word">
                        <input type="text" placeholder="快来输入你的感想吧" onChange={ this.userInput }/>
                    </div>
                    <div className="submit" onClick={ this.send }>
                        <SendIcon/>
                    </div>
                </div>
                <div className="music-choicer">
                    { choicerChild }
                </div>
                <div className="mask"></div>
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
        guideStatus: state.guideStatus.guide,
        camperStatus: state.camperStatus
    };
};

export default connect(mapStateToProps)(Camper);
