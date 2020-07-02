import React, {Component} from 'react';
import {connect} from "react-redux";
import './avatar.scss';
import { userDetailStatusOnAction,userDetailStatusOffAction } from "../../actions/userDetailStatusAction";



class Avatar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    callUserInfo=()=>{
        const { userInfo,userDetailInfo } = this.props;
        const data = {
            id: userInfo.id,
            email: userInfo.email,
            name: userInfo.name,
            avatar: userInfo.avatar,
            tag: userInfo.tag,
            signature: userInfo.signature
        };
        this.props.dispatch(userDetailStatusOnAction(data));
    };

    render() {
        const { userStatus,userInfo,initAvatar } = this.props;
        const { name,avatar } = userInfo;
        let bgStyle = {
            backgroundImage: `url(${ avatar })`
        };
        if (!userStatus){
            bgStyle = {
                backgroundImage: `url(${ initAvatar })`
            }
        }
        return (
            <div
                className={userStatus ? "user-avatar avatar-move-to-top-left" : "user-avatar"}
                onClick={ this.callUserInfo }
                style={ bgStyle }
                data-username={ name }
            >
                <i className="message-bubble"></i>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) =>{
    // console.log(ownProps)
    return {
        userStatus: state.userStatus.user,
        userInfo: state.userStatus.userInfo,
        userDetailInfo: state.userDetailStatus.userDetail.info,
    };
};

export default connect(mapStateToProps)(Avatar);
