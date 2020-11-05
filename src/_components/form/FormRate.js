import React      from "react";
import Rate       from "antd/lib/rate";

export default class FormTimePicker extends React.Component {

  constructor(props) {
    super(props);
  }

  onChange = (value) => {
    this.props.input.onChange(value);
  };

  render() {
    return (
      <Rate
        onChange={this.onChange}
        {...this.props}
      />
    );
  }
}
