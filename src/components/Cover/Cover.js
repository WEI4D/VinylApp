import React, {Component} from 'react';
import {connect} from "react-redux";
import classNames from "classnames";
import { coverStatusOffAction } from "../../actions/coverStatusAction";
import "./cover.scss";
import {Icon} from "antd";
import {podcastStatusOffAction} from "../../actions/podcastStatusAction";
import Header from "../Header/Header";
class Cover extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    /*当元素状态为false时，让元素消失，节省资源。设置延时，实现元素淡出*/
    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.coverStatus){
            this.refs.CoverStyle.style.display = "block";
        }else{
            setTimeout(()=>{
                this.refs.CoverStyle.style.display = "none";
            },600);
        }
    }

    render() {
        const { coverStatus,musicPlayStatus } = this.props;
        return (
            <div ref="CoverStyle" className={classNames({
                "cover-fun": true,
                "cover-fun-move-in": coverStatus,
                "cover-fun-move-out": !coverStatus
            })
            }>
                <Header action={ coverStatusOffAction }/>
                <div className={classNames({
                    "left-cover": true,
                    "left-cover-move-in": coverStatus,
                    "left-cover-move-out": !coverStatus
                })
                } style={{ backgroundImage: `url(${musicPlayStatus.info.cover})` }}>

                </div>
                <div className={
                    classNames({
                        "center-cover-wrapper solar": true,
                        "solar-in": coverStatus,
                        "solar-out": !coverStatus
                    })
                }>
                    <div className={"center-cover"} style={{ backgroundImage: `url(${musicPlayStatus.info.cover})` }}></div>
                    {/*太阳系-开始*/}
                    <div className="planet mercury"></div>
                    <div className="planet venus"></div>
                    <div className="planet earth"></div>
                    <div className="planet mars"></div>
                    <div className="planet jupiter"></div>
                    <div className="planet saturn"></div>
                    <div className="planet uranus"></div>
                    <div className="planet neptune"></div>
                    <div className="planet asteroid"></div>
                </div>
                {/*<div className={*/}
                    {/*classNames({*/}
                        {/*"right-cover": true,*/}
                        {/*"right-cover-move-in": coverStatus,*/}
                        {/*"right-cover-move-out": !coverStatus*/}
                    {/*})}>*/}

                {/*</div>*/}
                <div className="cover-mask"></div>
            </div>
        )
    }
}
const mapStateToProps = (state,ownProps) =>{
    return {
        coverStatus: state.userStatus.cover,
        musicPlayStatus: state.musicPlayStatus.music,
    };
};

export default connect(mapStateToProps)(Cover);
