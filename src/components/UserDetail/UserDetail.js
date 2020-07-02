import React, {Component} from 'react';
import classNames from "classnames";
import { connect } from "react-redux";
import "./userdetail.scss";
import Header from "../Header/Header";
import { userDetailStatusOffAction } from "../../actions/userDetailStatusAction";
import { userStatusLoginedAction } from "../../actions/userStatusAction";
import { Tag } from "antd";
import { filesLimited } from "../utils";
import { message } from "antd";
import { uploadUserAvatar } from "../../service/api";


class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    uploadUserAvatar=(e)=>{
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
                    /*获取基本用户信息，对后续用户信息修改提供保障*/
                    let { id,email,name,tag,signature } = this.props.userInfo;
                    /*获取图片文件*/
                    let pic = e.target.result;
                    /*将信息装载进form表单*/
                    form.append("avatar", pic);
                    form.append("userId",id);
                    form.append("email",email);
                    form.append("type",this.type);
                    let data = {
                        userId: id,
                        email: email,
                        username: name,
                        avatar: pic,
                        tag: tag,
                        signature: signature
                    };
                    /*上传*/
                    uploadUserAvatar(form);
                    /*同时将图片信息同步修改至前端，进行渲染和替换*/
                    this.props.dispatch(userStatusLoginedAction(data));
                };
            }else{
                message.error("文件错误！")
            }
        });
    };

    // uploadUserTag= async (e)=>{
    //     let { id } = this.props.userInfo;
    //     await { tag } = uploadUserTag({
    //         userId: id,
    //
    //     });
    //     if( tag === 0 ){
    //         message.success("修改成功！");
    //     }
    // };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.userDetailStatus.trigger) {
            this.refs.UserDetailStyle.style.display = "grid";
        } else {
            setTimeout(() => {
                this.refs.UserDetailStyle.style.display = "none";
            }, 600);
        }
    }

    render() {
        const { userDetailStatus,userInfo } = this.props;
        return (
            <div ref="UserDetailStyle" className={
                 classNames({
                     "user-detail": true,
                     "user-detail-move-in": userDetailStatus.trigger,
                     "user-detail-move-out": !userDetailStatus.trigger
                 })
            }>
                <Header action={ userDetailStatusOffAction } isRight={ true }/>
                <div className="user-info-wrapper">
                    <div onClick={ this.uploadUserAvatar } className="user-avatar"
                         style={{backgroundImage: `url(${userInfo.avatar})`}}>
                        /*上传头像*/
                    </div>
                    <div className="user-username">
                        <h1>{ userInfo.name }</h1>
                    </div>
                    <div className="user-signature">
                        { userInfo.signature }
                    </div>
                    <div className="user-info">
                        <span className="title">邮箱</span>
                        <div>{ userInfo.email }</div>
                        <span className="title">昵称</span>
                        <div>{ userInfo.name }</div>
                        <span className="title">标签</span>
                        <div>
                            <Tag color="magenta" closable={ true } onClose={ this.uploadUserTag }>magenta</Tag>
                            <Tag color="red">red</Tag>
                            <Tag color="volcano">volcano</Tag>
                            <Tag color="orange">orange</Tag>
                            <Tag color="gold">gold</Tag>
                            <Tag color="lime">lime</Tag>
                            <Tag color="green">green</Tag>
                            <Tag color="cyan">cyan</Tag>
                            <Tag color="blue">blue</Tag>
                            <Tag color="geekblue">geekblue</Tag>
                            <Tag color="purple">purple</Tag>
                        </div>
                    </div>
                </div>
                <div className="placeholder"></div>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) =>{
    return {
        userDetailStatus: state.userDetailStatus.userDetail,
        userInfo: state.userStatus.userInfo,
    };
};

export default connect(mapStateToProps)(UserDetail);
