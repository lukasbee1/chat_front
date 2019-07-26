import React, { PureComponent } from 'react';

class Contact extends PureComponent {
  render() {
    return (
      <div className="messanger__constacts-contact">
        <div className="messanger__constacts-contact_avatar">
          <span className="contact-status online" />
          <img
            src={`${process.env.REACT_APP_routeToStaticData}${this.props.ava}`}
            alt=""
          />
        </div>
        <div className="messanger__constacts-contact_meta">
          <div className="messanger__constacts-contact_meta-link">
            {this.props.name}
          </div>
          <div className="messanger__constacts-contact_meta-preview" />
        </div>
      </div>
    );
  }
}

export default Contact;
