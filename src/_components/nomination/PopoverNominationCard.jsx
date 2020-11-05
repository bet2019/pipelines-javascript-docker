import React from 'react'
import Popover from 'antd/lib/popover'
import PropTypes from 'prop-types'
import nominationService from 'src/scenes/manager/internal-user/nominations/nominationService';
import LogoLoadingSpinner from '../ui/LogoLoadingSpinner';
import PopoverNominationCardContent from './PopoverNominationCardContent';

class PopoverNominationCard extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      data: false,
      isEngagementDatesEdit: false
    }
  }

  makeContent = async isVisible => {
    let data = false
    if (isVisible){
      let res = await nominationService.get(this.props.nominationId)
      data = res.data
    }
    this.setState({data})
  }

  render() {
    return (
      <Popover 
        overlayClassName="popover-nomination-card"
        trigger="click" placement="bottom"
        onVisibleChange={this.makeContent}
        content={
          this.state.data 
          ? <PopoverNominationCardContent 
              data={this.state.data} 
              nominationId={this.props.nominationId}
              onSuccess={()=>{
                  this.makeContent(true)
                  this.props.onUpdate()
                }
              }
            /> 
          : <LogoLoadingSpinner />
        } 
      >
        {this.props.children}
      </Popover>
    )
  }
}

PopoverNominationCard.propTypes = {
  children: PropTypes.element.isRequired,
  nominationId: PropTypes.string.isRequired
}

export default PopoverNominationCard