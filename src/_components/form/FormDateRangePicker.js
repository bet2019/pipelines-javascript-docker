import React      from "react";
import config     from "src/config";
import DatePicker from "antd/lib/date-picker";

const { RangePicker } = DatePicker;

export default class FormDateRangePicker extends React.Component {

  constructor(props) {
    super(props);
  }

  onChange = (value, dateString) => {
    if (dateString[0].length > 0 && dateString[1].length > 0){
      this.props.input.onChange(dateString)
    } else {
      this.props.input.onChange(null)
    }
  };

  render() {
    return (
      <RangePicker
        format={config.dateFormat}
        onChange={this.onChange}
        {...this.props}
      />
    );
  }
}
