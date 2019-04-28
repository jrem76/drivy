import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './carElement.scss';


export default class CarElement extends Component {
  static propTypes = {
    car : PropTypes.object,
    rentalPrice: PropTypes.string,
  };

  render() {
    const {
      car,
      rentalPrice,
    } = this.props;

    return (
      <div className="carElement">
        <div className="carElement__left-block">
          <img src={car.picturePath} />
        </div>
        <div className="carElement__right-block">
          <span>{car.brand} {car.model}</span>
          <span>{car.pricePerDay/100}€ /day</span>
          <span>{car.pricePerKm/100}€ /Km</span>
          <span>{rentalPrice}€ for the rental</span>
        </div>
      </div>
    )
  }
};