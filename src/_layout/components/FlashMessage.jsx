import React          from "react";
import { connect }    from "react-redux";

class FlashMessage extends React.Component {

  render() {
    return (
      <>
        {this.props.type} :: {this.props.title} :: {this.props.message}
      </>
    )
  }
}

export default connect()(FlashMessage);
