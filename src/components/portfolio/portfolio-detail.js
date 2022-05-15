import React, { Component } from "react";
//import { photos } from "./photos";
import Gallery from "react-photo-gallery";
import axios from "axios";
//import { photos } from "./photos";

export default class PortfolioDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolioItem: {},
      photos: [],
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
        this.setState(
          {
            portfolioItem: response.data,
          },
          () => {
            this.afterSetStateFinished();
          }
        );
      })
      .catch((error) => {
        console.log("getportfolioItem error", error);
      });
  }

  afterSetStateFinished() {
    const myGallery = this.state.portfolioItem.gallery;
    const photos = [];
    for (let i = 0; i < myGallery.length; i++) {
      photos.push({
        src: myGallery[i].dataURL,
        height: myGallery[i].height,
        width: myGallery[i].width,
      });
    }
    console.log(photos);

    this.setState({ photos: photos });
  }

  render() {
    const { description, name, gallery } = this.state.portfolioItem;

    return (
      <div className="portfolio-detail-wrapper">
        <div className="portfolio-detail-header">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
        <Gallery photos={this.state.photos} />
      </div>
    );
  }
}
