import React    from "react";
import Checkbox from "antd/lib/checkbox";

export default class FormCheckbox extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange = (value) => {
    this.props.input.onChange(value);
  };

  render() {
    let {children, ...rest} = this.props

    return (
      <Checkbox
        onChange={this.onChange}
        onOk={(value) => {
        }}
        {...rest}
      >
        {children}
      </Checkbox>
    );
  }
}
