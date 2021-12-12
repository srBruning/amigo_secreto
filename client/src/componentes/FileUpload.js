import React, { Component } from "react";
import Api from "../Api";
import { Dots } from "react-activity";

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

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
    if (this.props.autoUpload)
      this.onFileUpload({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the upload button)
  onFileUpload = ({ selectedFile }) => {
    this.setState({ inUpload: true });
    if (this.props.uploadListner) this.props.uploadListner(true);

    if (selectedFile === undefined) selectedFile = this.state.selectedFile;

    Api.uploadAvatar(selectedFile)
      .then((resp) => {
        this.setState({ inUpload: false });
        if (this.props.uploadListner) this.props.uploadListner(false);
      })
      .then(() => {
        if (this.props.callback) this.props.callback();
      });
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {this.state.selectedFile.name}</p>

          <p>File Type: {this.state.selectedFile.type}</p>

          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
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
