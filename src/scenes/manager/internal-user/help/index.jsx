import React from 'react'
import PageTitle from 'src/_components/PageTitle';
import { getIdToken } from 'src/_helpers/api';
import Routing, { routesAPI } from 'src/_helpers/routing';
import { Can } from 'src/_helpers/permission';
import Frame, {FrameContextConsumer} from 'react-frame-component';
import GlobalSettingsContext from 'src/contexts/GlobalSettingsContext';
import NotAuthorized_403 from 'src/_components/errors/NotAuthorized_403';

class HelpContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      config: null
    }

  }

  async componentDidMount() {
    this.setState({config: {
        basePath: process.env.APP_API_BASE_URL+Routing.generate(routesAPI.internal.help),
        el: '#help-container',
        requestHeaders: {
          'Authorization': 'Bearer '+ await getIdToken()
        },
        homepage: 'home.md',
        notFoundPage: true,
        loadSidebar: true,
        noEmoji: true
      }
    })
  }

  componentWillUnmount() {
  }

  render() {

    if (!this.state.config) {
      return '';
    }
    return (
      <PageTitle title="Help">
    <GlobalSettingsContext.Consumer>
      {
        ({menuShowHelpItem}) => menuShowHelpItem
        ?
        <Can I="do" a="acl:help/docs">
          <div id="app-help-container"> </div>
          {/* <script src="//unpkg.com/docsify/lib/docsify.min.js"></script> */}
          {/* <link rel="stylesheet" href="//unpkg.com/docsify/themes/vue.css"/> */}
          {/* FIXME: css and js files need to be with has prefix to avoid issues with cache */}
            <Frame
                style={{
                  position: "fixed",
                  // top: "0px",
                  // bottom: "-75px",
                  // right: "-75px",
                  width: "100%",
                  border: "none",
                  // marginBottom: "-75px",
                  // padding: "0",
                  overflow: "auto",
                  zIndex: "1025",
                  height: "100%"
                  // FIXME: footer and right maring/padding doesn'twork
                }}
                initialContent={`
                  <!DOCTYPE html>
                  <html>
                  <head>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
                    <meta name="viewport" content="width=device-width,initial-scale=1"/>
                    <meta charSet="UTF-8"/>
                    
                    <link rel="stylesheet" href="${process.env.REACT_APP_BASE_URL}/assets/css/docsify.css"/>
                    
                  </head>
                  <body>
                    <div id="help-container"> </div>
                    
                  </body>
                  </html>
                `}
                >
                <FrameContextConsumer>
                  {
                    // Callback is invoked with iframe's window and document instances
                    ({document, window}) => {
                      window.$docsify = this.state.config
                      var docsifySscript = document.createElement('script');
                      docsifySscript.setAttribute('src', `${process.env.REACT_APP_BASE_URL}/assets/js/docsify.js`);
                      document.head.appendChild(docsifySscript);
                    }
                  }
                </FrameContextConsumer>
            </Frame>
        </Can>
      : <NotAuthorized_403 />
    
  }    
    </GlobalSettingsContext.Consumer>  
      </PageTitle>

    )
  }
}

export default HelpContainer