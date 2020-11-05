'use strict';

import React from 'react'
import PropTypes from 'prop-types'
import { appConstants } from 'src/ducksApp';
import { connect } from 'react-redux';
import config from 'src/config';

class PageTitle extends React.Component {

  componentDidMount() {
    let title = this.props.title || ''
    let subTitle = this.props.subTitle || ''
    this.props.dispatch({type: appConstants.APP_PAGE_TITLE_UPDATED, payload: title})
    document.title = (subTitle && subTitle.length > 0 ? `${subTitle} | ` : '') + (title && title.length > 0 ? `${title} | ${config.defaultPageTitle}` : config.defaultPageTitle)
  }
  componentWillUnmount() {
    this.props.dispatch({type: appConstants.APP_PAGE_TITLE_UPDATED, payload: ''})
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired
}

export default connect()(PageTitle)
