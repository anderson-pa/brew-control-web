import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Translate } from 'react-redux-i18n';
import { Row, Col } from 'react-flexbox-grid';

import Slider from '../slider';
import '../../assets/sass/components/plan.scss';

const BEERS = [{
  name: 'ale',
  monthly: '1.067',
  yearly: '1.011',
  calloutAmount: '250'
}, {
  name: 'lager',
  monthly: '1.055',
  yearly: '1.015',
  calloutAmount: '1000'
},];

export default class Plan extends React.Component {
  render() {
    return (
      <div className='plan'>
        <Row bottom="xs">
          <Col xs={12} md={4} lgOffset={2}>
            <Translate className='plan__headline' value='pricing.title.headline' />
            <h1><Translate className='plan__subline' value='pricing.title.subline'/></h1>
          </Col>
          <Col xs={12} md={8} lg={6} className='plan__slider'>
            <Translate className='plan__monthly_cta' value='pricing.plan.monthly'/>
            <Slider
              isLeft={this.props.brewingModel === 'monthly'}
              onToggle={this.props.onSliderToggle} />
            <Translate className='plan__yearly_cta' value='pricing.plan.yearly' />
          </Col>
        </Row>
        <Row className='plan__options'>
          {BEERS.map(plan => {

            /**
             * Function that renders a contact us link
             */
            const renderContactUs = () => {
              return (
                <a className='plan__option_select' href='https://github.com/mcannamela/brew-control'>
                  <Translate
                    value={plan.name === 'largeBusiness' ? 'pricing.plan.contact' : 'pricing.plan.select'} />
                </a>
              );
            };

            /**
             * Function that renders a select link
             */
            const renderSelect = () => {
              return (
                <Link className='plan__option_select' to={{
                  pathname: `/confirmation/${plan.name}/${this.props.brewingModel}/`
                }}>
                  <Translate
                    value={plan.name === 'largeBusiness' ? 'pricing.plan.contact' : 'pricing.plan.select'} />
                </Link>
              );
            };

            return (
              <Col key={plan.name} className={`plan__option plan__option_${plan.name}`} xs={12} md={6} lg={3} >
                <div className='plan__option_title'>
                  <Translate value={ `pricing.plan.types.${plan.name}` } />
                </div>
                <Translate
                  className='plan__option_price'
                  value='pricing.plan.price'
                  amount={ this.props.brewingModel === 'monthly' ? plan.monthly : plan.yearly }/>
                <Translate className='plan__option_perMonth' value='pricing.plan.perMonth' />

                <div className='plan__option_divider' />

                <Translate
                  className={ `plan__option_cta ${plan.name === 'largeBusiness' ? 'large' : ''}` }
                  value={ plan.name === 'largeBusiness' ? 'pricing.plan.largeCallout' :  'pricing.plan.callout' }
                  amount={ plan.calloutAmount } />

                { plan.name !== 'largeBusiness' ? renderSelect() : renderContactUs() }
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

Plan.propTypes = {
  brewingModel: PropTypes.string.isRequired,
  onSliderToggle: PropTypes.func.isRequired
};
