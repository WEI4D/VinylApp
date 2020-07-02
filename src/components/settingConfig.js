/*simple.setting start*/
const simpleSettingCnf = {
    /*start*/
    start: [
        {
            "self-turn-on": {
                describe: "开机自动启动Vinyl",
                trigger: true,
            },
        },
        {
            "auto-play-song": {
                describe: "自动播放音乐",
                trigger: true,
            }
        }
        ],
    /*play*/
    play: [
        {
            "around-list-auto-check": {
                describe: "列表间自动切换",
                trigger: true,
            }
        },
        {
            "open-music-transition-end": {
                describe: "开启音乐渐进渐出",
                trigger: true,
            }
        },
        {
            "auto-use-suitable-volume": {
                describe: "自动调到合适的音量",
                trigger: true,
            }
        },
    ],
    /*music quality*/
    quality: [
        {
            "standard-music-quality": {
                describe: "标准品质",
                trigger: true
            }
        },
        {
            "hq-height-music-quality": {
                describe: "HQ高品质",
                trigger: false,
            }
        },
        {
            "sq-height-music-quality": {
                describe: "SQ高品质",
                trigger: false,
            }
        },
    ],
    /*when user playing a single song*/
    list: [
        {
            "clean-current-song-list-add-new": {
                describe: "清空当前播放队列，播放将当前歌曲所在队列",
                trigger: false,
            }
        },
        {
            "only-add-song-to-list": {
                describe: "仅添加该歌曲进播放列表",
                trigger: true,
            }
        },
    ],
    /*notification*/
    notification: [
        {
            "display-notification-red-bubble": {
                describe: "显示消息中心红点数字",
                trigger: false,
            },
        }
    ],
    /*close-main-window*/
    close: [
        {
            "resize-into-pallet": {
                describe: "最小化进托盘，不退出",
                trigger: true,
            }
        },
        {
            "quit-app": {
                describe: "退出程序",
                trigger: false,
            }
        },
    ],
    relative: [
        {
            "set-default-music-player": {
                describe: "将Vinyl设为默认播放器",
                trigger: true
            }
        }
    ]

}
console.log(JSON.stringify(simpleSettingCnf));
/*simple.setting end */
export { simpleSettingCnf }
