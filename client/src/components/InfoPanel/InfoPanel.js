import React, { Component } from 'react';
import './InfoPanel.css';

class InfoPanel extends Component {
  render() {
    return (
      <div className='info-panel-container'>
        <div className='info-panel-container--top'>
          <div className='info-panel__app-info'>
            <div className='info-panel__app-info__logo'>
              logo
            </div>
            <div className='info-panel__app-info__name'>
              name
            </div>
          </div>
          <div className='info-panel__connection-status'>
            securely connected
          </div>
          <div className='info-panel__participants'>
            <div className='info-panel__participant'>
              alpha
            </div>
            <div className='info-panel__participant'>
              bravo
            </div>
          </div>
        </div>
        <div className='info-panel-container--bottom'>
          <div className='info-panel__explanation'>
            lorem ipsum
          </div>
        </div>
      </div>
    )
  }
}

export default InfoPanel;
