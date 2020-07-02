import React, {Component} from 'react';
import {Icon, Table} from "antd";
import classNames from "classnames";
import "./downloaded.scss";
import {connect} from "react-redux";
class Downloaded extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    renderDownloadedList=()=> {
        const columns = [
            {
                title: '歌曲',
                dataIndex: 'songName',
                key: 'songName',
                render: text => {
                    return(
                        <div style={{position:"relative"}}>
                            <p className="song" style={{"display": "inline-block","margin": "0 0"}}>
                                {text}
                            </p>
                            <label style={{position: "absolute",right: "0"}}>
                                <span><Icon type="customer-service" /></span>
                                <span><Icon type="plus" /></span>
                                <span><Icon type="download" /></span>
                                <span><Icon type="more" /></span>
                            </label>
                        </div>
                    )
                },
            },
            {
                title: '歌手',
                dataIndex: 'singer',
                key: 'singer',
            },
            {
                title: '专辑',
                dataIndex: 'album',
                key: 'album',
            },
            {
                title: '大小',
                key: 'size',
                dataIndex: 'size',
            },
        ];
        const data = [
            {
                key: '1',
                songName: 'John Brown',
                singer: "周杰伦",
                album: 'New York No. 1 Lake Park',
                size: "8.6M",
            },
            {
                key: '2',
                songName: 'Jim GreeasdasdsafsdfsfsdfsdfasdsadsadsadGreeasdasdsafsdfsfsdfsdfasdsadsadsad',
                singer: "Taylor Swift",
                album: '林俊杰',
                size: "8.6M",
            },
            {
                key: '3',
                songName: 'Joe Black',
                singer: "王菲",
                album: 'Sidney No. 1 Lake Park',
                size: "8.6M",
            },
        ];
        const { downloadStatus } = this.props;
        return(
            <div ref="DownloadedStyle" className={
                classNames({
                    "downloaded": true,
                    "downloaded-block-move-in": downloadStatus,
                    "downloaded-block-move-out": !downloadStatus
                })
            }>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.downloadStatus){
            this.refs.DownloadedStyle.style.display = "block";
        }else{
            setTimeout(()=>{
                this.refs.DownloadedStyle.style.display = "none";
            },600);
        }
    }

    render() {
        return (
            this.renderDownloadedList()
        )
    }
}
const mapStateToProps = (state,ownProps) =>{
    return {
        downloadStatus: state.userStatus.location.downloaded
    };
}

export default connect(mapStateToProps)(Downloaded);
