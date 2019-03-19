import React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

import { handleToken } from '../../store/actions';

export interface IPayments extends ReturnType<typeof mapDispatchToProps> {}

const Payments: React.FC<IPayments> = props => (
  <StripeCheckout
    name="EmailSender"
    description="$5 for 5 email credits"
    amount={500}
    token={token => props.handleToken(token)}
    stripeKey={process.env.REACT_APP_STRIPE_KEY || ''}
  >
    <button type="button" className="btn">
      Add Credits
    </button>
  </StripeCheckout>
);

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ handleToken }, dispatch);
};

export { Payments };
export default connect(
  null,
  mapDispatchToProps
)(Payments);
