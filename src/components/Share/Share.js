import React, {Component} from 'react';
import {connect} from "react-redux";
import classNames from "classnames";
import "./share.scss";
import { QQIcon, VIcon, WeboIcon, WeChatIcon } from "../svg";
import {shareStatusOffAction} from "../../actions/shareStatusAction";
import {TEST_URL} from "../../service/serverAPI.config";

class Share extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.ShareRef = React.createRef();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { shareStatus } = this.props;
        if( nextProps.shareStatus.share && !shareStatus.share ){
            this.ShareRef.current.style.display = "grid";
        }else{
            setTimeout(() => {
                this.ShareRef.current.style.display = "none";
            }, 600);
        }
        return true;
    }

    share=(type)=>{
        let { shareStatus } = this.props;
        let title = "@Vinyl分享好音乐~",
            pic = `${ TEST_URL }/api/images?id=${ shareStatus.data.albumMid }&format=jpg`,
            url = "https://www.weid.ink",
            summary = "@Vinyl分享好音乐~";
        switch (type) {
            case "v":
                console.log("test");
                break;
            case "wechat":
                break;
            case "webo":
                window.open(`http://service.weibo.com/share/share.php?url=${url}&sharesource=weibo&title=${title}&pic=${pic}&appkey=2706825840`);
                break;
            case "qq":
                window.open(`https://connect.qq.com/widget/shareqq/index.html?url=${url}&sharesource=qzone&title=${title}&pics=${pic}&summary=${summary}&desc=${summary}`);
                console.log("test");
                break;
        }
    };

    closeShare=()=>{
        this.props.dispatch(shareStatusOffAction)
    };

    render() {
        const { shareStatus } = this.props;
        return (
            <div ref={ this.ShareRef } className={
                classNames({
                    "share": true,
                    "share-move-in": shareStatus.share,
                    "share-move-out": !shareStatus.share
                })
            }>
                <div onClick={ this.share.bind(this,"qq") }><QQIcon width={30} height={30}/></div>
                <div onClick={ this.share.bind(this,"webo") }><WeboIcon width={30} height={30}/></div>
                <div onClick={ this.share.bind(this,"v") }><VIcon width={30} height={30}/></div>
                <div onClick={ this.share.bind(this,"wechat") }><WeChatIcon width={30} height={30}/></div>
                <div className="mask" onClick={ this.closeShare }></div>
            </div>
        )
    }
}
const mapStateToProps = (state,ownProps) =>{
    return {
        messageStatus: state.messageStatus.message,
        shareStatus: state.shareStatus
    };
};

export default connect(mapStateToProps)(Share);
