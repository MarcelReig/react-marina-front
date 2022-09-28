import React, { Component } from "react";
import axios from "axios";
import { DropzoneComponent } from "react-dropzone-component";

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collection_name: "",
      description: "",
      thumb_img_url: "",
      gallery: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleThumbDrop = this.handleThumbDrop.bind(this);
    this.handleGalleryDrop = this.handleGalleryDrop.bind(this);

    this.thumbRef = React.createRef();
    this.galleryRef = React.createRef();
  }

  handleThumbDrop() {
    return {
      addedfile: (file) => this.setState({ thumb_img_url: file }),
    };
  }

  handleGalleryDrop() {
    return {
      addedfiles: (files) => this.setState({ gallery: files }),
    };
  }

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".jpeg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post",
      uploadMultiple: true,
    };
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 10,
      uploadMultiple: true,
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    axios
      .post("https://marina-back-end.vercel.app/add", {
        name: this.state.collection_name,
        description: this.state.description,
        thumb_img_url: this.state.thumb_img_url.dataURL,
        gallery: this.state.gallery,
      })

      .then((response) => {
        this.props.handleSuccessfulFormSubmission(response.data);

        this.setState({
          collection_name: "",
          description: "",
          thumb_img_url: "",
          gallery: [],
        });

        [this.thumbRef, this.galleryRef].forEach((ref) => {
          ref.current.dropzone.removeAllFiles();
        });
      })

      .catch((error) => {
        console.log("portfolio form handleSubmit error", error);
      });

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
          <h2>Portfolio Manager</h2>
          <div className="one-column">
            <input
              type="text"
              name="collection_name"
              placeholder="Nombre de colección"
              value={this.state.collection_name}
              onChange={this.handleChange}
            />
          </div>

          <div className="one-column">
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>

          <div className="image-uploaders">
            <DropzoneComponent
              ref={this.thumbRef}
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleThumbDrop()}
            >
              <div className="dz-message">
                Arrastra aquí la imagen de portada
              </div>
            </DropzoneComponent>
            <DropzoneComponent
              ref={this.galleryRef}
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleGalleryDrop()}
            >
              <div className="dz-message">
                Arrastra aquí las imágenes de la galería
              </div>
            </DropzoneComponent>
          </div>

          <div>
            <button className="btn" type="submit">
              Añadir colección
            </button>
          </div>
        </form>
      </div>
    );
  }
}
