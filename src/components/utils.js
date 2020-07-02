import {instanceOf} from "prop-types";
import {TEST_URL} from "../service/serverAPI.config";

function isEmpty(string){
    if(typeof string == "undefined" || string == null || string == ""){
        return true;
    }else{
        return false;
    }
}
/*计算更新时间*/
function computeUpdateTime(updateTime) {
    if( typeof updateTime === "string" ) updateTime = Date.parse(updateTime);
    if( typeof updateTime === "number"){
        let currTime = new Date().getTime();
        let days = (currTime - updateTime)/(1000*60*60);
        if(days > 1){
            return `${Math.ceil(days)} days ago`;
        }else{
            return `${Math.ceil(days*60)} hours ago`;
        }
    }else{
        console.log("时间格式错误!");
    }
}
/*获取现在的时间*/
function getNowTime() {
    let date = new Date();
    return date.getTime();
}
/*URL关键字检索*/
function isInURL(keyword,URL) {
    if(isEmpty(keyword)||isEmpty(URL)){
        console.log("Keyword or URL is null");
        return false;
    }
    let isInclude = URL.indexOf(keyword);
    if( isInclude > -1 ) return true;
    return false;
}
/*节流*/
function debounce(fn,delay=500){
    return (...rest)=>{
        let args = rest;
        if ( this.state.timerId ) { clearTimeout(this.state.timerId); }
        this.state.timerId = setTimeout(()=>{
            fn.apply(this,args);
        },delay);
    }
};
/*base64 to text*/
function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
};
/*限制文件参数*/
function filesLimited(fileObject, maxSize, legalType, thisType) {
    let { size,type } = fileObject;

    if( size > maxSize){
        console.error(`File size limited in ${maxSize} byte`);
        return false;
    }else{
        if( legalType instanceof Array ){
            for(let i = 0;i < legalType.length;i++){
                if( type.includes(legalType[i]) ){
                    thisType = legalType[i];
                    return true;
                }
            }
        }

        if( legalType instanceof String ){
            if( type.includes(legalType) ){
                thisType = legalType;
                return true;
            }else{
                return false
            }

        }

        return false;
    }
}

function compareSongList(targetArray, compareObject, operator){
    /*
    * operator = true 添加进目标数组
    * */
    if( operator ){
        for(let i = 0;i < targetArray.length;i++){
            if( targetArray[i].songId === compareObject.id){
                break;
            }
            if( i === targetArray.length - 1 ){
                targetArray.unshift({
                    songId: compareObject.id,
                    songName: compareObject.name,
                    artistId: compareObject.artistId,
                    albumName: compareObject.album,
                    artist: compareObject.artist,
                    albumMid: compareObject.albumMid,
                    fileId: compareObject.fileId,
                    lyric: compareObject.lyric,
                    favorite: compareObject.favorite
                });
                break;
            }
        }
    }

    if( !operator ){
        for(let i = 0;i < targetArray.length;i++){
            if( targetArray[i].songId === compareObject.id){
                targetArray.splice(i,1);
                break;
            }
        }
        console.log(targetArray);
    }

    return targetArray;
}

function playSong(songInfo,songList=[] ) {
    const { songId,songName,artistId,albumName,artist,albumMid,fileId,favorite, } = songInfo;
    let data = {
        id: songId,
        name: songName,
        artist: artist,
        artistId: artistId,
        album: albumName,
        duration: "",
        playlist: songList,
        albumMid: albumMid,
        fileId: fileId,
        cover: `${TEST_URL}/api/images?id=${ albumMid }&format=jpg`,
        src: `${TEST_URL}/api/audio?id=${ fileId }&format=m4a`,
        favorite: favorite === 1 ? true:false,
    };
    return data;
}

function expressData() {
    const express = "😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 🥰 😗 😙 😚 ☺️ 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 🥵 🥶 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🥳 🥴 🥺 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾";
    const emojiArr = express.split(" ");
    for(let i = 0;i < emojiArr.length;i++){
        emojiArr[i] = emojiArr[i].trim()
    }
    return emojiArr;
}

function timestampToDate(timestamp) {
    const currTime = new Date().getFullYear();
    const targetTime = new Date(timestamp);
    if( currTime === targetTime.getFullYear() ){
        return( `${ targetTime.getMonth()+1 }-${ targetTime.getDate() }` );
    }else{
        return( `${ targetTime.getFullYear() }-${ targetTime.getMonth()+1 }-${ targetTime.getDate() }` );
    }
}
export {
        isEmpty,
        computeUpdateTime,
        getNowTime,
        isInURL,
        debounce,
        b64DecodeUnicode,
        filesLimited,
        compareSongList,
        playSong,
        expressData,
        timestampToDate
}
