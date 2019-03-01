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

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const SurveyNew = lazy(() => import('./surveys/SurveyNew'));

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
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

App.propTypes = {
  fetchUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { fetchUser }
)(App);
