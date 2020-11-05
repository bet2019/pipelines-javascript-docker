import React      from "react";
import config     from "src/config";
import TimePicker from "antd/lib/time-picker";

export default class FormTimePicker extends React.Component {

  constructor(props) {
    super(props);
  }

  onChange = (value, dateString) => {
    this.props.input.onChange(dateString);
  };

  render() {
    return (
      <TimePicker
        format={config.timeFormat}
        onChange={this.onChange}
        onOk={(value) => {
        }}
        {...this.props}
      />
    );
  }
}
