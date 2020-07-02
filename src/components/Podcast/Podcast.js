import React, {Component} from 'react';
import "./podcast.scss";
import { podcastDetailStatusOnAction } from "../../actions/podcastDetailStatusAction";
import classNames from "classnames";
import {connect} from "react-redux";
import { podcastStatusOffAction } from "../../actions/podcastStatusAction";
import Header from "../Header/Header";
import { getPodcast } from "../../service/api";
import { computeUpdateTime } from "../utils";


class Podcast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            podcast: []
        }
    }

    async componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.podcastStatus) {
            this.refs.PodcastStyle.style.display = "block";
            const { podcast } = await getPodcast({
                requestName: "GETPODCAST&GET",
            });
            this.setState({
                podcast
            });
        } else {
            setTimeout(() => {
                this.refs.PodcastStyle.style.display = "none";
            }, 600);
        }
    }

    callPodcastDetail=(obj)=>{
        this.props.dispatch(podcastDetailStatusOnAction(
            {
                id: obj.SONG_PODCAST_ID,
                name: obj.SONG_PODCAST_NAME,
            }
        ));
    };

    render() {
        const { podcastStatus } = this.props;
        const { podcast } = this.state;
        const podcastNode = ()=>{
            let list = ["first","second","third","fourth","firth","sixth"];
            return (
                podcast.map((v,k)=>{
                    let timeDiff = computeUpdateTime(v.SONG_PODCAST_UPDATE_DATE);
                    return (
                        <div key={ k } className={ list[k] } onClick={ this.callPodcastDetail.bind(this,v) }>
                            <div className="top-info">
                                <h1 className="title">{ v.SONG_PODCAST_NAME }</h1>
                                <span className="bar"></span>
                                <h5 className="time">{ timeDiff }</h5>
                            </div>
                            <div className="mask"></div>
                        </div>
                    )
                })
            )
        }
        return (
            <div ref="PodcastStyle" className={
                classNames({
                    "podcast-fun": true,
                    "podcast-block-move-in": podcastStatus,
                    "podcast-block-move-out": !podcastStatus,
                })
            }>
                <Header action={ podcastStatusOffAction }/>
                <div className="top-podcast">
                    { podcastNode() }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) =>{
    return {
        podcastStatus: state.userStatus.podcast
    };
}

export default connect(mapStateToProps)(Podcast);
