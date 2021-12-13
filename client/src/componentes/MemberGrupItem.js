import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { SocialIcon } from "react-social-icons";

export default class MemberGrupItem extends Component {
  constructor(props) {
    super();
  }

  montaSocialLik(path, user) {
    console.log("___" + user);
    if (!user) return user;
    console.log("___" + user);
    var pattern =
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (pattern.test(user)) {
      return user;
    }

    return path + user;
  }

  render() {
    this.url = this.props.item.picture_avatar
      ? this.props.item.picture_avatar.url
      : "/avatar.jpg";
    return (
      <Col
        className="col-6 col-sm-6 col-md-6 col-lg-4"
        xs="12"
        sm="4"
        md="4"
        lg="4"
        xl="3"
      >
        <Card key={this.props.item.id} className="card ">
          <img className="card-img-top" src={this.url} alt="Avatar"></img>
          <div className="card-body">
            <div className=" d-flex flex-column align-items-center text-center">
              <h3 className="font-weight-bold">{this.props.item.name}</h3>
              <h5 className="text-black-50">{this.props.item.user_name}</h5>
            </div>
            {!this.props.item.facebook &&
              !this.props.item.instagram &&
              !this.props.item.whatsapp && (
                <label
                  style={{
                    width: "50px",
                    height: "50px",
                    verticalAlign: "middle",
                  }}
                ></label>
              )}
            {this.props.item.facebook && (
              <SocialIcon
                url={this.montaSocialLik(
                  "https://www.facebook.com/",
                  this.props.item.facebook
                )}
                target="_blank"
              />
            )}
            {this.props.item.instagram && (
              <SocialIcon
                url={this.montaSocialLik(
                  "https://instagram.com/",
                  this.props.item.instagram
                )}
                target="_blank"
              />
            )}
            {this.props.item.whatsapp && (
              <SocialIcon
                url={this.montaSocialLik(
                  "https://api.whatsapp.com/send?phone=55",
                  this.props.item.whatsapp.replace(/\D/g, "")
                )}
                target="_blank"
              />
            )}
          </div>
          {this.props.children}
        </Card>
      </Col>
    );
  }
}
