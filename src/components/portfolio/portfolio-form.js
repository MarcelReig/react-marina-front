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
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleThumbDrop = this.handleThumbDrop.bind(this);

    this.thumbRef = React.createRef();
  }

  handleThumbDrop() {
    return {
      addedfile: (file) => this.setState({ thumb_img_url: file }),
    };
  }

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post",
    };
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1,
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    axios
      .post("http://127.0.0.1:5000/add", {
        name: this.state.collection_name,
        description: this.state.description,
        thumb_img_url: this.state.thumb_img_url.dataURL,
      })

      .then((response) => {
        this.props.handleSuccessfulFormSubmission(response.data);

        this.setState({
          collection_name: "",
          description: "",
          thumb_img_url: "",
        });

        [this.thumbRef].forEach((ref) => {
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
