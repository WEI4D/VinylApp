import React, { Component,useState, } from 'react';
import classNames from "classnames";
import "./setting.scss";
import Header from "../Header/Header";
import "../../assets/css/antd-setting.scss";
import { connect } from "react-redux"
import {settingStatusOffAction, settingStatusOnAction} from "../../actions/settingStatusAction";
import md5 from "md5";
import {filesLimited, isEmpty} from "../utils";
import {saveUserSetting, uploadImage} from "../../service/api";
import { message,Popconfirm } from "antd";
import {settingInfoOffAction, settingInfoOnAction} from "../../actions/settingInfoAction";

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    async shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { settingStatus,settingInfo,userInfo } = this.props;
        if (nextProps.settingStatus.setting) {
            this.refs.SettingStyle.style.display = "grid";
        } else {
            setTimeout(() => {
                this.refs.SettingStyle.style.display = "none";
            }, 600);
        }
        if (!nextProps.settingStatus.setting && settingStatus.setting) {
            this.props.dispatch(settingInfoOffAction);
        }
        return true;
    }

    uploadImg=(mark)=>{
        let { id } = this.props.userInfo;
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
                    let pic = e.target.result,
                        hashName = md5(new Date());
                    console.log(pic)
                    /*将信息装载进form表单*/
                    form.append("mark",mark);
                    form.append("userId",id);
                    form.append("pic", pic);
                    form.append("type",this.type);
                    form.append("name",hashName);
                    /*上传*/
                    uploadImage(form);

                    let { settingInfo } = this.props;
                    settingInfo.data[mark].pic = pic;
                    settingInfo.data[mark].name = hashName;
                    settingInfo.data[mark].type = this.type;
                    this.props.dispatch(settingInfoOnAction(settingInfo.data));
                    console.log(settingInfo);
                };
            }else{
                message.error("文件错误！")
            }
        });
    };

    saveSetting= async () => {
        const { settingStatus, settingInfo, userInfo } = this.props;
        const copy = settingInfo.data;
        Object.keys(copy).forEach((value, key) => {
            copy[value].pic = "";
        });
        const { code } = await saveUserSetting({
            userId: userInfo.id,
            data: copy,
        })
    };

    render() {
        const { settingStatus,settingInfo } = this.props;
        return (
            <div ref="SettingStyle" className={
                classNames({
                    "setting": true,
                    "setting-move-in": settingStatus.setting,
                    "setting-move-out": !settingStatus.setting,
                })
            }>
                <Header action={ settingStatusOffAction }/>
                <div style={{ backgroundImage: `url(${ settingInfo.data["left-cover"].pic })` }} className="left" onClick={ this.uploadImg.bind(this, "left-cover") }>
                    <div className="mask">{ isEmpty(settingInfo.data["left-cover"].pic) ? "点击上传图片":"" }</div>
                </div>
                <div className="right">
                    <div style={{ backgroundImage: `url(${ settingInfo.data["right-first"].pic })` }} className="first-column" onClick={ this.uploadImg.bind(this, "right-first") }>
                        <div className="mask">{ isEmpty(settingInfo.data["right-first"].pic) ? "点击上传图片":"" }</div>
                    </div>
                    <div style={{ backgroundImage: `url(${ settingInfo.data["right-second"].pic })` }} className="second-column" onClick={ this.uploadImg.bind(this, "right-second") }>
                        <div className="mask">{ isEmpty(settingInfo.data["right-second"].pic) ? "点击上传图片":"" }</div>
                    </div>
                    <div style={{ backgroundImage: `url(${ settingInfo.data["right-third"].pic })` }} className="third-column" onClick={ this.uploadImg.bind(this, "right-third") }>
                        <div className="mask">{ isEmpty(settingInfo.data["right-third"].pic) ? "点击上传图片":"" }</div>
                    </div>
                    <div style={{ backgroundImage: `url(${ settingInfo.data["right-four"].pic })` }} className="four-column" onClick={ this.uploadImg.bind(this, "right-four") }>
                        <div className="mask">{ isEmpty(settingInfo.data["right-four"].pic) ? "点击上传图片":"" }</div>
                    </div>
                </div>
                <div className="bottom" onClick={ this.saveSetting }>
                    SAVE
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) =>{
    return {
        settingStatus: state.settingStatus,
        settingInfo: state.settingInfo,
        userInfo: state.userStatus.userInfo,
    };
};

export default connect(mapStateToProps)(Setting)
