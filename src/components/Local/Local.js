// import React, {Component} from 'react';
// import { Table,Icon } from "antd";
// import "./local.scss";
// import classNames from "classnames";
// import {connect} from "react-redux";
// const electron = window.require('electron');
// const { ipcRenderer } = electron;
//
// /*Location页面下的Local组件*/
// class Local extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             localFileList: []
//         };
//     }
//
//     renderLocalList() {
//         /*localStatus为true时唤出Local组件*/
//         const { localStatus } = this.props;
//         /*歌曲列表头*/
//         const icon = {
//             "font-size": "14px"
//
//         };
//         const columnsNode = ()=> {
//             return(
//                 <div style={{position: "relative"}}>
//                     <span>歌曲</span>
//                     <div className="table-operation" style={{display: "inline-block",position: "absolute",right: 0}}>
//                         <span onClick={ this.localAddFile }>
//                             <Icon type="folder-open" style={ icon }/>
//                         </span>
//                         <span>
//                             <Icon type="play-square" style={ icon }/>
//                         </span>
//                         <span>
//                             <Icon type="sort-ascending" style={ icon }/>
//                         </span>
//                         <span>
//                             <Icon type="search" style={ icon }/>
//                         </span>
//                     </div>
//                 </div>
//             )
//         };
//
//         const columns = [
//             {
//                 title: columnsNode(),
//                 dataIndex: 'title',
//                 key: 'title',
//                 render: text => {
//                     return(
//                         <div style={{position:"relative"}}>
//                             <p id="song" className="song" style={{"display": "inline-block","margin": "0 0"}}>
//                                 {text}
//                             </p>
                            {/*<label style={{position: "absolute",right: "0"}}>*/}
                                {/*<span><Icon type="customer-service" /></span>*/}
                                {/*<span><Icon type="plus" /></span>*/}
                                {/*<span><Icon type="download" /></span>*/}
                                {/*<span><Icon type="more" /></span>*/}
                            {/*</label>*/}
//                         </div>
//                     )
//                 },
//             },
//             {
//                 title: '歌手',
//                 dataIndex: 'artist',
//                 key: 'artist',
//             },
//             {
//                 title: '专辑',
//                 dataIndex: 'album',
//                 key: 'album',
//             },
//             {
//                 title: '大小',
//                 key: 'size',
//                 dataIndex: 'size',
//             },
//         ];
//         /*歌曲列表内容*/
//         const data = this.state.localFileList;
//
//         const localeConfig = {
//             emptyText: ()=><div onClick={ this.localAddFile } className="local-add-file"><Icon type="folder-add" style={{"font-size": "70px"}} /><p>添加文件</p></div>,
//         };
//
//         return(
//             <div ref="LocalStyle" className={
//                 classNames({
//                     "local-right": true,
//                     "local-right-block-move-in": localStatus,
//                     "local-right-block-move-out": !localStatus
//                 })
//             }>
//                 <Table locale = { localeConfig } columns={ columns } dataSource={ data } total={ 8 } defaultPageSize = { 8 } />
//             </div>
//         )
//     }
//
//     localAddFile =()=>{
//         let { localFileList } = this.state;
//         let key = `${localFileList.length}`;
//         ipcRenderer.send("LOCAL_ADD_FILE");
//         ipcRenderer.once("LOCAL_SET_FILE",(e,musicBaseInfo)=>{
//             musicBaseInfo.key = key;
//             localFileList.push(musicBaseInfo);
//             this.setState({
//                 musicBaseInfo
//             });
//             localStorage.setItem("local_file_list",JSON.stringify(localFileList));
//         });
//     }
//
//     componentWillMount() {
//         let localFileList = localStorage.getItem("local_file_list");
//         if(localFileList){
//             localFileList = JSON.parse(localFileList);
//             this.setState({
//                 localFileList
//             });
//         }else{
//             this.setState({
//                 localFileList: []
//             });
//         }
//     }
//
//     /*解决组件切换时的动画卡顿*/
//     componentWillReceiveProps(nextProps, nextContext) {
//         if(nextProps.localStatus){
//             this.refs.LocalStyle.style.display = "block";
//         }else{
//             setTimeout(()=>{
//                 this.refs.LocalStyle.style.display = "none";
//             },600);
//         }
//     }
//
//     render() {
//         return (
//             this.renderLocalList()
//         )
//     }
// }
//
// const mapStateToProps = (state,ownProps) =>{
//     return {
//         localStatus: state.userStatus.location.local
//     };
// }
//
// export default connect(mapStateToProps)(Local);
