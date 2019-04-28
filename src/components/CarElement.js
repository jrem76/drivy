import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './carElement.scss';


export default class CarElement extends Component {
  static propTypes = {
    car : PropTypes.object,
  };

  render() {
    const {
      car,
    } = this.props;

    // console.log(car);

    return (
      <div className="carElement">
        <div className="carElement__left-block">
          <img src={car.picturePath} />
        </div>
        <div className="carElement__right-block">
          <span>{car.brand} {car.model}</span>
          <span>{car.pricePerDay/100}€ /day</span>
          <span>{car.pricePerKm/100}€ /Km</span>
        </div>
      </div>
    )
  }
};