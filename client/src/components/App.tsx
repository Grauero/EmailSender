import React, { Component, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { fetchUser } from '../store/actions';
import 'materialize-css/dist/css/materialize.min.css';

import Header from './nav/Header';
import Landing from './nav/Landing';
import Spinner from './utils/Spinner';
import './App.css';
import { Dispatch, bindActionCreators } from 'redux';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const SurveyNew = lazy(() => import('./surveys/SurveyNew'));

class App extends Component<ReturnType<typeof mapDispatchToProps>> {
  public componentDidMount() {
    this.props.fetchUser();
  }

  public render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Suspense fallback={<Spinner />}>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={SurveyNew} />
          </Suspense>
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ fetchUser }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(App);
