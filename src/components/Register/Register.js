import React, {Component} from 'react';
import "./register.scss";
import classNames from "classnames";
import { connect } from "react-redux";
import { isEmpty } from "../utils";
import {getEMailVerifyCode, getPodcastInfo, postRegisterForm, verifyUsernameIsExist} from "../../service/api";
import { message,notification } from "antd";
import Header from "../Header/Header";
import { registerStatusOnAction,registerStatusOffAction } from "../../actions/registerStatusAction";
import {guideStatusOffAction} from "../../actions/guideStatusAction";


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUsernameErr: "",
            dataUserEmailErr: "",
            dataPasswordErr: "",
            dataVerifyPasswordErr: "",
            dataVerifyCodeErr: "",
            email: "",
            username: "",
            password: "",
            sendCode: "Send Code",
            canClick: false,
            verifyCode: 0x86f
        }
    }

    verifyEmailFormat= async (e)=>{
        let email = e.target.value;
        if( isEmpty(email) ){
            this.setState({
                dataUserEmailErr: "邮箱地址为空"
            });
            return;
        }
        let emailRe = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ig;
        if( !emailRe.test(email) ){
            this.setState({
                dataUserEmailErr: "邮箱格式错误"
            });
        }else{
            const { info } = await verifyUsernameIsExist({
                email,
                requestName: `VERIFYUSERNAMEISEXIST&GET`
            });
            this.setState({
                dataUserEmailErr: info,
                email
            });
        }
    };

    verifyPasswordFormat=(e)=>{
        let password = e.target.value;
        let pwdRe = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g;
        if( isEmpty(password) ){
            this.setState({
                dataPasswordErr: "请输入密码",
            });
            return;
        }
        if( pwdRe.test(password) ){
            console.log(password);
            this.setState({
                dataPasswordErr: "",
                password
            });
        } else {
            this.setState({
                dataPasswordErr: "密码至少8个字符，并由1个字母，1个数字和1个特殊字符组成",
                password
            });
        }
    };

    verifyPasswordAgain=(e)=>{
        let pwdAgain = e.target.value;
        let password = this.state.password;
        if( isEmpty(pwdAgain) ){
            console.log(pwdAgain,password);
            this.setState({
                dataVerifyPasswordErr: "请再次输入密码，完成验证"
            });
            return;
        }
        if( pwdAgain === password ){
            this.setState({
                dataVerifyPasswordErr: ""
            });
        } else {
            this.setState({
                dataVerifyPasswordErr: "请确保两次密码一致"
            });
        }

    };

    verifyVerifyCode=(e)=>{
        let code = e.target.value;
        let { verifyCode } = this.state;
        if( isEmpty(code) ){
            this.setState({
                dataVerifyCodeErr: "请输入验证码"
            });
            return
        }
        if( code === verifyCode ){
            this.setState({
                dataVerifyCodeErr: ""
            });
        }else{
            this.setState({
                dataVerifyCodeErr: "验证码错误"
            });
        }
    };

    verifyUsername=(e)=>{
        let username = e.target.value;
        let usernameRe = /^[\d\w\u4e00-\u9fa5,\.;\:"'?!\-]{2,15}$/g;
        if( isEmpty(username) ){
            this.setState({
                dataUsernameErr: "请输入昵称"
            })
        }else{
            if( usernameRe.test(username) ){
                this.setState({
                    dataUsernameErr: "",
                    username
                })
            }else{
                this.setState({
                    dataUsernameErr: "昵称不合法",
                })
            }
        }

    };

    sentVerifyCode= async () => {
        let {dataUserEmailErr, dataPasswordErr, dataVerifyPasswordErr, dataVerifyCodeErr, email} = this.state;
        // isEmpty(dataUserEmailErr)&&isEmpty(dataPasswordErr)&&isEmpty(dataVerifyPasswordErr)&&isEmpty(dataVerifyCodeErr)
        if (true) {
            let count = 0;
            let timer = setInterval(() => {
                if (count >= 5) {
                    clearInterval(timer);
                    this.setState({
                        sendCode: "Send Code",
                        canClick: false
                    });
                    return
                }
                this.setState({
                    sendCode: (count++) + 's',
                    canClick: true,
                });
            }, 1000);
            const { verifyCode } = await getEMailVerifyCode({
                email,
                requestName: "GETEMAILVERIFYCODE&GET"
            });
            this.setState({
                verifyCode
            })
        }


    };

    sentRegisterForm= async (e) => {
        e.preventDefault();
        let { email, username, password, dataUserEmailErr, dataPasswordErr, dataVerifyPasswordErr, dataVerifyCodeErr } = this.state;
        if( dataUserEmailErr==="您输入的邮箱可以使用"&&isEmpty(dataPasswordErr)&&isEmpty(dataVerifyPasswordErr)&&isEmpty(dataVerifyCodeErr) ){
            const { register } = await postRegisterForm({
                email,
                username,
                password,
                requestName: `POSTREGISTERFORM&POST`
            });
            if( register === 0 )
            message.info(register, 3, ()=>{
                this.props.dispatch(registerStatusOffAction);
                this.props.dispatch(guideStatusOffAction);
            });
        }else{
            message.error("请完善信息！")
        }

    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.registerStatus) {
            this.refs.RegisterStyle.style.display = "grid";
        } else {
            setTimeout(() => {
                this.refs.RegisterStyle.style.display = "none";
            }, 600);
        }
    }

    render() {
        const { dataUserEmailErr, dataPasswordErr, dataUsernameErr,
                dataVerifyPasswordErr, dataVerifyCodeErr,
                canClick, sendCode } = this.state;
        const { registerStatus } = this.props;
        return (
            <div ref="RegisterStyle" className={
                 classNames({
                     "register": true,
                     "register-move-in": registerStatus,
                     "register-move-out": !registerStatus
                 })
            }>
                <Header action={ registerStatusOffAction }/>
                <div className="register-wrapper">
                    <p className="title">Join Us!</p>
                    <form onSubmit={ this.sentRegisterForm }>
                        <div className="register-form">
                            <div className="username-wrapper" data-username-err={ dataUsernameErr }>
                                <input name="username" onBlur={ this.verifyUsername }
                                       type="text" autoComplete="off" placeholder="昵称"
                                       maxLength="9"
                                />
                            </div>
                            <div className="user-email-wrapper" data-user-email-err={ dataUserEmailErr } >
                                <input name="email" onBlur={ this.verifyEmailFormat }
                                       type="text" autoComplete="off" placeholder="邮箱地址"
                                />
                            </div>
                            <div className="password-wrapper" data-password-err={ dataPasswordErr }>
                                <input name="password" onBlur={ this.verifyPasswordFormat }
                                       type="password" autoComplete="off" placeholder="用户密码"
                                       maxLength="16"
                                />
                            </div>
                            <div className="verify-password-wrapper" data-verify-password-err={ dataVerifyPasswordErr }>
                                <input name="verify-password" onBlur={ this.verifyPasswordAgain }
                                       type="password" autoComplete="off" placeholder="确认密码"
                                       maxLength="16"
                                />
                            </div>
                            <div className="verify-code-wrapper" data-verify-code-err={ dataVerifyCodeErr }>
                                <input name="verify-code" type="text" autoComplete="off" onBlur={ this.verifyVerifyCode }/>
                                <input name="send-code" type="button"
                                       className="send-code" value={ sendCode }
                                       onClick={ this.sentVerifyCode }
                                       disabled={ canClick }
                                       style={canClick ? {backgroundColor: "#2a622a"}:{backgroundColor: "#55c555"}}
                                />
                            </div>
                            <div>
                                <input name="submit" type="submit" value="Register"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state,ownProps) =>{
    return {
        registerStatus: state.registerStatus.register
    };
}

export default connect(mapStateToProps)(Register);
