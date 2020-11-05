import React          from "react";
import { connect }    from "react-redux";
import FlashMessage   from "src/_layout/components/FlashMessage";
import _              from "lodash";
import history        from "src/_helpers/history";

class FlashBag extends React.Component {

  componentDidMount() {
    // when do the histroy redict probably you will need to do some adjustment to your flas messages
    // history.listen((location) => {
    //   _.forOwn(this.props.flashBag, (item, key) => {
    //     item.map((mes) => {
          
    //     });
    //   });
    // });
  }

  render() {
    let flashBag = [];

    _.forOwn(this.props.flashBag, (item, key) => {
      if (item.length > 0) {
        flashBag = [...flashBag, ...item.map((mes) => {
          return (
            <FlashMessage
              key={mes.id}
              type={key === "failure" ? "error" : key}
              {...mes}
            />
          );
        })
        ];
      }
    });

    return flashBag;
  }
}

function mapStateToProps(state) {
  return {
    flashBag: state.rootApp.flashBag
  };
}

export default connect(mapStateToProps)(FlashBag);
