import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatPrice } from "../../helpers/format-price";

export default class Order extends Component {
  renderOrder = (key) => {
    const product = this.props.products[key];
    const count = this.props.order[key];

    return (
      <li key={key}>
        <div>{count}</div>
        <div>{product.name}</div>
        <div> {formatPrice(count * product.price)}</div>
      </li>
    );
  };
  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const product = this.props.products[key];
      const count = this.props.order[key];

      return prevTotal + count * product.price;
    }, 0);

    return (
      <div className="order-wrap">
        <div className="cart-title">
          <h2>Carrito</h2>
          <FontAwesomeIcon icon="fa-cart-shopping" />
        </div>
        <ul className="order">{orderIds.map(this.renderOrder)}</ul>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}
