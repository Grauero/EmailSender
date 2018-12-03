import React from 'react';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';

import { handleToken } from '../store/actions';

const Payments = ({ handleToken }) => (
  <StripeCheckout
    name="EmailSender"
    description="$5 for 5 email credits"
    amount={500}
    token={token => handleToken(token)}
    stripeKey={process.env.REACT_APP_STRIPE_KEY}
  >
    <button type="button" className="btn">
      Add Credits
    </button>
  </StripeCheckout>
);

Payments.propTypes = {
  handleToken: PropTypes.func.isRequired
};

export default connect(
  null,
  { handleToken }
)(Payments);
