import React, {Component} from 'react';
import { NiceIcon } from "../components/svg";

export default class Nice extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    getNice=({ userId, })=>{

    };

    render() {
        return (
            <div onClick={ this.getNice.bind(this,...this.props) }>
                <NiceIcon color="#8a8a8a"/>
            </div>
        )
    }
}
