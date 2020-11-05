import React from "react";
import Routing from "src/_helpers/routing";
import {Link} from 'react-router-dom'

class IndexScene extends React.Component {
  
  render() {
    return (
      <div className="mg-t-50">
        <div className="block-center text-center">
          <Link to={Routing.generate('routes.ui.manager')}> Go to App</Link>
        </div>
      </div>
    )
  }
}

export default IndexScene;
