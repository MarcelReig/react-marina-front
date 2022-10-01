import React, { Component } from "react";
import axios from "axios";

import PortfolioItem from "./portfolio-item";
import SkeletonPortfolio from "../skeletons/SkeletonPortfolio";

export default class PortfolioContainer extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      data: [],
    };
  }

  getPortfolioItems() {
    axios
      .get("https://marina-back-end-wjnsy.ondigitalocean.app/portfolio")
      .then((response) => {
        this.setState({
          data: response.data,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  portfolioItems() {
    return this.state.data.map((item) => {
      return <PortfolioItem key={item._id.$oid} item={item} />;
    });
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="portfolio-items-wrapper">
          <SkeletonPortfolio />
          <SkeletonPortfolio />
          <SkeletonPortfolio />
          <SkeletonPortfolio />
          <SkeletonPortfolio />
          <SkeletonPortfolio />
        </div>
      );
    }

    return (
      <div>
        <div className="portfolio-items-wrapper">{this.portfolioItems()}</div>
      </div>
    );
  }
}
