import React      from "react";
import config     from "src/config";
import DatePicker from "antd/lib/date-picker";

const { RangePicker } = DatePicker;

export default class FormMonthRangePicker extends React.Component {

  constructor(props) {
    super(props);

    // console.warn('constructor', this.props.defaultValue)
    this.state =  {
      value: this.props.defaultValue || []
    }
  }

  setInputValues = (value) => {
    this.props.input.onChange([
      this.state.value[0] ? this.state.value[0].clone().format() : null,
      this.state.value[1] ? this.state.value[1].clone().format() : null
    ]);
  }

  onChange = (value, dateString) => {
    this.setInputValues(value)
    // console.warn('field onchange called', value, dateString)
    // this.props.input.onChange(dateString);
  };

  handleOpenChange = (value) => {
    // console.warn('handleOpenChange', value)
    this.setInputValues(value)
  }

  handlePanelChange = (value) => {
    // console.warn('handlePanelChange', ...value)
    value[0].startOf('month')
    value[1].endOf('month')
    // console.warn('handlePanelChange updated', ...value)
    this.setState({
      value
    })
  }

  render() {
    return (
      <RangePicker
        mode={['month','month']}
        onChange={this.onChange}
        {...this.props}
        format={this.props.format || config.yearMonthFormat}
        onOpenChange={ this.handleOpenChange } 
        onPanelChange={ this.handlePanelChange }
        value={this.state.value}
      />
    );
  }
}
