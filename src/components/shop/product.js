import React, { Component } from "react";
import { formatPrice } from "../../helpers/format-price";

export default class Product extends Component {
  handleClick = () => {
    this.props.addToOrder(this.props.index);
  };
  render() {
    const { image, name, price, desc } = this.props.details;

    return (
      <li className="menu-product">
        <div className="product-wrapper">
          <img src={image} alt={name} />

          <div className="right-stuff">
            <div className="title-wrapper">
              <h3 className="product-name">{name}</h3>
              <h3 className="price">{formatPrice(price)}</h3>
            </div>

            <p>{desc}</p>

            <button className="btn" onClick={this.handleClick}>
              Añadir Al Carrito
            </button>
          </div>
        </div>
      </li>
    );
  }
}
