import React, {Component} from 'react';
import { expressData } from "../utils";
import "./express.scss";
import classNames from "classnames";

export default class Express extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    choseExpress=(char)=>{
        this.props.dispatch()
    };

    render() {
        const { trigger,chooseExpress } = this.props;
        return (
            <div className={
                classNames({
                    "express-tools-map": true,
                    "express-tools-map-move-in": trigger,
                    "express-tools-map-move-out": !trigger
                })
            }>
                { expressData().map((v,k)=>{
                    return(
                        <span className="express-item" onClick={ chooseExpress.bind(this,v) }>
                            { v }
                        </span>
                    )
                }) }
            </div>
        )
    }
}
