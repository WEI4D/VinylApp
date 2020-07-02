import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Avatar from "../Avatar/Avatar";
import "./Login.scss";
import { connect } from "react-redux";
import { userStatusLoginedAction } from '../../actions/userStatusAction';
import { verifyUser,getUserAvatar } from "../../service/api";
import { registerStatusOnAction } from "../../actions/registerStatusAction";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: ""
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const isAllow = await verifyUser({
                    email: values.username,
                    password: values.password,
                    requestName: `VERIFY&POST`
                });

                if( isAllow.code === 1 ) this.props.dispatch(userStatusLoginedAction(
                    {
                        userId: isAllow.userId,
                        email: values.username,
                        username: isAllow.username,
                        avatar: isAllow.avatar,
                        tag: isAllow.tag,
                        signature: isAllow.signature,
                    }
                ));
            }
        });
    };

    getUserEmail = async (e) => {
        let email = e.target.value;
        if (email.length >= 3) {
            const hasAvatar = await getUserAvatar({
                email,
                requestName: "GETUSERAVATAR&GET"
            });
            let { avatar } = hasAvatar.data;
            this.setState({
                avatar
            })
        }
    };

    callRegisterComponent=(e)=>{
        e.preventDefault();
        this.props.dispatch(registerStatusOnAction)
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { avatar } = this.state;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Avatar initAvatar={ avatar }/>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入你的账号!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="你的手机/邮箱"
                            onBlur={ this.getUserEmail }
                            autoComplete={ true }
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入你的密码！' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="你的密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>记住我</Checkbox>)}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登 陆
                    </Button>
                    <div className="user-wrapper">
                        <a className="join-us" onClick={ this.callRegisterComponent }>
                            加入我们！
                        </a>
                        <a className="login-form-forgot" href="">
                            忘记密码？
                        </a>
                    </div>
                </Form.Item>
            </Form>
        )
    }
}
const mapStateToProps = (state,ownProps) =>{
    return {
        userStatus: state.userStatus.user
    };
}

export default Form.create({ name: 'normal_login' })(connect(mapStateToProps)(Login));
