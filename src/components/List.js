import React, { Component } from 'react';
import request from 'superagent';

import Car from './CarElement';


export default class List extends Component {
    state = {
        data: null,
        error: false,
    };

    componentDidMount() {

        this.initData();
    }

    initData = () => {
        this.setState({
            data: [],
        })

        request
            .get('/cars.json')
            .end((err, res) => {
                if (res) {
                    this.setState({
                        data: res.body,
                    })
                }
                if (err) {
                    this.setState({
                        error: true,
                    });
                }
            });
    }

    refreshData = () => {
        this.setState({
            data: [],
        })

        this.initData();
    }

    onClearArray = () => {
        this.setState({
            data: [],
        });
    }

    onReloadData = () => {
        this.initData();
    }

    renderElementList = () => {
        let elementsList = []
        const {
            data
        } = this.state

        if (!data || data.length === 0) {
            return [];
        }

        data.forEach((result, index) => {
            elementsList.push(<Car car={result} key={index}></Car>)
        });

        return elementsList;
    }

    renderList = (data, error) => {
        if (!data || data === null || data.length === 0) {
            return (
                <div>Nothing to show for now.</div>
            );
        }

        if (error) {
            return (
                <div>Sorry we're facing some issues for now. Please comeback later</div>
            );
        }

        return (<div>
            {this.renderElementList()}
        </div>);
    }

    render() {

        const {
            data,
            error,
        } = this.state;

        return (<div>
            <button onClick={this.onClearArray}>Reset Array</button>
            <button onClick={this.onReloadData}>Refresh data</button>
            {this.renderList(data, error)}
        </div>)
    }

};