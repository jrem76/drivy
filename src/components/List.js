import React, { Component } from 'react';
import request from 'superagent';

import Car from './CarElement';


export default class List extends Component {
    state = {
        data: null,
        error: false,
        daysDuration: 0,
        kmsNumber: 0,
    };

    componentDidMount() {
        this.initData(0, 0);
    }

    initData = (daysDuration, kmsNumber) => {
        this.setState({
            data: [],
        });

        request
            .get('/cars.json')
            .query({
                duration: daysDuration,
                distance: kmsNumber,
            })
            .end((err, res) => {
                if (res) {
                    this.setState({
                        data: res.body,
                    });
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

    onReloadData = () => {
        this.initData();
    }

    renderElementList = () => {
        let elementsList = []
        const {
            data,
        } = this.state

        if (!data || data.length === 0) {
            return [];
        }

        data.forEach((carItem, index) => {
            elementsList.push(<Car car={carItem} key={index}></Car>)
        });

        return elementsList;
    }

    renderFilteredList = (data, error) => {
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

    onSelectDaysChange = (event) => {
        const {
            kmsNumber,
        } = this.state;

        this.setState({
            daysDuration: event.target.value,
        });

        this.initData(event.target.value, kmsNumber);
    }

    

    renderSelectDays = () => {
        const {
            daysDuration,
        } = this.state;

        const days = [...Array(31).keys()];

        return (<select onChange={this.onSelectDaysChange} value={daysDuration} name="selectDays">
            {days.map((day, index) => (<option value={day} key={`day-${index}`}>{day}</option>))}
        </select>)
    }

    onSelectDistanceChange = (event) => {
        const {
            daysDuration,
        } = this.state;

        this.setState({
            kmsNumber: event.target.value,
        });

        this.initData(daysDuration, event.target.value);
    }

    renderSelectDistance = () => {
        const {
            kmsNumber,
        } = this.state;

        const kmsOptions = [...Array(61).keys()];

        return (<select onChange={this.onSelectDistanceChange} value={kmsNumber} name="selectDistance">
            {kmsOptions.map((kmsOption, index) => (<
                option value={kmsOption * 50} key={`kmsOption-${index}`}>{kmsOption * 50}</option>
            ))}
        </select>)
    }

    render() {

        const {
            data,
            error,
        } = this.state;

        return (<div>
            <div>
                <label htmlFor="selectDays">Days duration</label>
                {this.renderSelectDays()}
            </div>
            <div>
                <label htmlFor="selectDistance">Distance in km</label>
                {this.renderSelectDistance()}
            </div>
            {this.renderFilteredList(data, error)}
        </div>)
    }

};