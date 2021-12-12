import React, { Component } from "react";
import Api from "../Api";
import { Dots } from "react-activity";
import Resizer from "react-image-file-resizer";

class FileUpload extends Component {
  constructor() {
    super();
    this.onFileUpload = this.onFileUpload.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }

  state = {
    // Initially, no file is selected
    selectedFile: null,
    inUpload: false,
  };


  resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      200,
      200,
      "JPEG",
      90,
      0,
      (uri) => {
        resolve(uri);
      },
      "blob"
    );
  });



  // On file select (from the pop up)
  onFileChange = async (event) => {
    const file = event.target.files[0];
    const image = await this.resizeFile(file);

    // Update the state
    this.setState({ selectedFile: image });
    if (this.props.autoUpload)
      this.onFileUpload({ selectedFile: image });
  };

  // On file upload (click the upload button)
  onFileUpload = ({ selectedFile }) => {

    this.setState({ inUpload: true });
    if (this.props.uploadListner) this.props.uploadListner(true);

    if (selectedFile === undefined) {
      selectedFile = this.state.selectedFile;
    }

    Api.uploadAvatar(selectedFile)
      .then((resp) => {
        this.setState({ inUpload: false });
        if (this.props.uploadListner) this.props.uploadListner(false);
      })
      .then(() => {
        if (this.props.callback) this.props.callback();
      });
  };

   handleClick = (e) => {
    this.inputElement.click();
  };
  render() {
    return (
      <div className="image-upload">
        <label htmlFor="file-input" onClick={this.handleClick}>
          {this.props.children}
        </label>

        <div className="FileUpload">
          <input
            type="file"
            onChange={this.onFileChange}
            ref={(input) => (this.inputElement = input)}
          />
          <button onClick={this.onFileUpload}>Enviar!</button>
        </div>
      </div>
    );
  }
}

export default FileUpload;
