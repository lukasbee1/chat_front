import React, { PureComponent } from 'react';

class DialogNotSelected extends PureComponent {
  render() {
    return (
      <>
        <div className="messanger__content-profile">
          <div className="my-auto" />
        </div>
        <div className="emptyDialog">select dialog</div>
      </>
    );
  }
}

export default DialogNotSelected;
