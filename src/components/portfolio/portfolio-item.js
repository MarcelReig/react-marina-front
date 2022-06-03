import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class PortfolioItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolioItemClass: "",
    };
  }

  handleMouseEnter() {
    this.setState({ portfolioItemClass: "image-blur" });
  }
  handleMouseLeave() {
    this.setState({ portfolioItemClass: "" });
  }
  render() {
    const { _id, thumb_img_url, name } = this.props.item;
    return (
      
      <Link to={`/portfolio/${_id.$oid}`}>
        <div
          className="portfolio-item-wrapper"
          onMouseEnter={() => this.handleMouseEnter()}
          onMouseLeave={() => this.handleMouseLeave()}
        >
          <div
            className={
              "portfolio-img-background " + this.state.portfolioItemClass
            }
            style={{
              backgroundImage: "url(" + thumb_img_url + ")",
            }}
          />
          <div className="collection-title-wrapper">
            <h2 className="collection-title">{name}</h2>
          </div>
        </div>
      </Link>
    );
  }
}
