import React, {Component} from 'react';
import "./recommend.scss";
import { connect } from "react-redux";
import classNames from "classnames";
import Header from "../Header/Header";
import { recommendStatusOffAction } from "../../actions/recommendStatusAction";
import { getUserFavoriteSongList } from "../../service/api";
import Label from "../Label/Label";
import { Skeleton } from "antd";

class Recommend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoriteSong: [],
            loading: true
        };
        this.NavRef = React.createRef();
    }

    async shouldComponentUpdate(nextProps, nextState, nextContext) {
        const userId = nextProps.userInfo.id;
        console.log(this.props.recommendStatus.recommend,nextProps.recommendStatus.recommend)
        if( this.props.recommendStatus.recommend === false && nextProps.recommendStatus.recommend ){
            setTimeout(()=>{
                this.refs.RecommendStyle.scrollTop = this.refs.RecommendStyle.scrollHeight;
            },1500);
        }
        if (nextProps.recommendStatus.recommend) {
            this.refs.RecommendStyle.style.display = "grid";
            // const { recommend } = await getRecommendSongList({
            //     requestName: "GETRECOMMENDSONGLIST&GET"
            // });
            const { favoriteSong } = await getUserFavoriteSongList({
                userId,
                requestName: "GETFAVORITESONGLIST&GET"
            });
            this.setState({
                favoriteSong,
                loading: false
            });
        } else {
            // setTimeout(() => {
            //     this.refs.RecommendStyle.style.display = "none";
            // }, 600);
            setTimeout(()=>{
                this.refs.RecommendStyle.scrollTop = 0;
                this.refs.RecommendStyle.style.display = "none";
                },700);
        }
        return true;
    }

    render() {
        const { recommend } = this.props.recommendStatus,
              { loading } = this.state;
        return (
            <div ref="RecommendStyle" className={
                classNames({
                    "recommendC": true,
                    "recommend-move-in": recommend,
                    "recommend-move-out": !recommend,
                })
            }>
                <Header action={ recommendStatusOffAction }/>
                <div className="recommend-cover">
                    <div className="recommend-msg">
                        <div className={
                            classNames({
                                "recommend-today": true,
                            })
                        }>
                            今日推荐曲目，
                        </div>
                        <div className={
                            classNames({
                                "recommend-count": true
                            })
                        }>
                            共50首...
                        </div>
                    </div>
                </div>
                {/*<div className="nav" ref={ this.NavRef } >歌曲</div>*/}
                <div className="recommend-song-list-wrapper">
                    <Skeleton loading={ loading } active={ true } paragraph={{rows:9}}>
                        <Label song={ this.state.favoriteSong }/>
                    </Skeleton>
                </div>
            </div>
        )
    }
}
const mapPropsToState=(state,ownProps)=>{
    return({
        recommendStatus: state.recommendStatus,
        userInfo: state.userStatus.userInfo,
    })
};
export default connect(mapPropsToState)(Recommend);
