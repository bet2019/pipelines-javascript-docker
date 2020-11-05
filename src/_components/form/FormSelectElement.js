import React  from "react";
import Select from "antd/lib/select";

export default class FormSelectElement extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange = (value) => {
    if (undefined === value) {
      value = null;
    }
    this.props.input.onChange(value);
  };

  renderSelectOption(item) {
    let key = item[this.props.valueProperty || "value"];
    let title = item["title"];
    
    if (this.props.titleProperty) {
      if (typeof this.props.titleProperty == 'function') {
        title = this.props.titleProperty(item)
      } else if (typeof this.props.titleProperty == 'string') {
        title = item[this.props.titleProperty]
      }
    }
    
    return (
      <Select.Option
        key={key}
        value={key}
        title={title}
        disabled={item.disabled ? item.disabled : false}
      >
        {
          this.props.optionRender
            ? this.props.optionRender(item)
            : title
        }

      </Select.Option>
    );
  }

  renderSelectItem(item) {
    if (item.options) {
      let { options, ...i } = item;
      return (
        <Select.OptGroup {...i}>
          {
            options.map(option => {
              return this.renderSelectOption(option);
            })
          }
        </Select.OptGroup>
      );
    } else {
      return this.renderSelectOption(item);
    }
  }

  render() {
    let { data, ...props } = this.props;
    return (
      <Select {...props}
              onChange={this.onChange}
      >
        {
          data.map(item => {
            return this.renderSelectItem(item);
          })
        }
      </Select>
    );
  }
}

