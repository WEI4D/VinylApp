import React, {Component} from 'react';
import {Divider, Icon, Table, Tag} from "antd";
import classNames from "classnames";
import {connect} from "react-redux";
import "./history.scss";
class History extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    renderLocalList() {
        const { historyStatus } = this.props;
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
                },            },
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
        ];
        const data = [
            {
                key: '1',
                songName: 'John Brown',
                singer: "周杰伦",
                album: 'New York No. 1 Lake Park',
            },
            {
                key: '2',
                songName: 'Jim Green',
                singer: "Taylor Swift",
                album: '林俊杰',
            },
            {
                key: '3',
                songName: 'Joe Black',
                singer: "王菲",
                album: 'Sidney No. 1 Lake Park',
            },
        ];
        return(
            <div ref="HistoryStyle" className={
                classNames({
                    "history": true,
                    "history-block-move-in": historyStatus,
                    "history-block-move-out": !historyStatus
                })
            }>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.historyStatus){
            this.refs.HistoryStyle.style.display = "block";
        }else{
            setTimeout(()=>{
                this.refs.HistoryStyle.style.display = "none";
            },600);
        }
    }

    render() {
        return (
            this.renderLocalList()
        )
    }
}

const mapStateToProps = (state,ownProps) =>{
    return {
        historyStatus: state.userStatus.location.history
    };
};

export default connect(mapStateToProps)(History);

