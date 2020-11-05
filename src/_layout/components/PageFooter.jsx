// @flow

import React from "react";
import { withTranslation } from "react-i18next";

class PageFooter extends React.Component {
  render() {
    const {i18n} = this.props

    return (
      <footer>
        <section id="footerArea" role="Footer">
          <div id="footerRegion" data-region-key="footerregion">
            <div id="footerUniversalFooter">
              <footer className="c-universal-footer context-uhf" mspgarea="Uhf footer">
                <section>
                  <ul className="c-list f-bare" mscmpgrp="Corp links">
                    <li><a href="mailto:iotinsider@microsoft.com" target="_self" className="ng-binding">{i18n.t('footer.contact_us')}</a></li>
                    <li>{i18n.t('msft_ai_iot_insider_labs')}. Copyright © {new Date().getFullYear()}{" "}</li>
                  </ul>
                </section>
              </footer>
            </div>
          </div>
        </section>
      </footer>
    );
  }
}

export default withTranslation()(PageFooter);
