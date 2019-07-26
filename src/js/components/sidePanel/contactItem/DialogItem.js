import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

class DialogItem extends PureComponent {
  render() {
    return (
      <Link
        to={`/messanger/id${this.props.det}`}
        onClick={() => this.props.getM(this.props.det)}
        key={this.props.det}
        className="messanger__constacts-contact"
      >
        <div className="messanger__constacts-contact_avatar">
          <span className="contact-status online" />
          <img
            src={`${process.env.REACT_APP_routeToStaticData}${this.props.ava}`}
            alt=""
          />
        </div>
        <div className="messanger__constacts-contact_meta">
          <div className="messanger__constacts-contact_meta-link">
            {this.props.chN}
          </div>
          <div className="messanger__constacts-contact_meta-preview">
            last message
          </div>
        </div>
      </Link>
    );
  }
}

export default DialogItem;
