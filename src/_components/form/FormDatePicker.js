import React      from "react";
import config     from "src/config";
import DatePicker from "antd/lib/date-picker";

export default class FormDatePicker extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange = (value, dateString) => {
    this.props.input.onChange(dateString);
  };

  render() {
    return (
      <DatePicker
        showTime={false}
        format={config.dateFormat}
        onChange={this.onChange}
        onOk={(value) => {
        }}
        {...this.props}
      />
    );
  }
}
