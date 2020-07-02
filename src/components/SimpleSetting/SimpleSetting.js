import React, {Component} from 'react';
import "./simple-setting.scss";
import { Checkbox, Row, Col,Radio } from 'antd';
import settingConfig from "../../setting.config";

export default class SimpleSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onTurnOn=(checkedValues)=> {
        for(let i in settingConfig.start){
            if( checkedValues.includes(i) ){

            }
        }
        checkedValues.map((v,k)=>{
           if( settingConfig.start[v] === v ){
               settingConfig.start[v].trigger = true;
           } else {
               settingConfig.start[v].trigger = false;
           }
        });
        console.log(settingConfig)
        console.log('checked = ', checkedValues);
    };

    render() {
        const simpleSettingOption = Object.keys(settingConfig.start);
        return (
            <div className="simple-setting">
                <div className="">
                    <div className="title">
                        启动
                    </div>
                    <div className="box-wrapper">
                        <Checkbox.Group options={ simpleSettingOption } onChange={ this.onTurnOn } />
                    </div>
                    <div className="title">
                        播放
                    </div>
                    <div className="box-wrapper">
                        <Checkbox.Group options={ simpleSettingOption } onChange={ this.onChange } />
                    </div>
                </div>
            </div>
        )
    }
}
