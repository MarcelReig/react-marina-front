import React, { Component } from "react";
import axios from "axios";

export default class PortfolioDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolioItem: {},
    };
  }

  componentWillMount() {
    this.getPortfolioItem();
  }

  getPortfolioItem() {
    axios
      .get(`http://127.0.0.1:5000/portfolio/${this.props.match.params.slug}`)
      .then((response) => {
        console.log("res", response);
        this.setState({
          portfolioItem: response.data,
        });
      })
      .catch((error) => {
        console.log("getportfolioitem error", error);
      });
  }

  render() {
    const { description, name } = this.state.portfolioItem;

    return (
      <div className="portfolio-detail-wrapper">
        <div className="portfolio-detail-header">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}
