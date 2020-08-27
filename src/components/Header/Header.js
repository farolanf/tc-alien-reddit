/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import useStyles from 'isomorphic-style-loader/useStyles';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setRuntimeVariable } from '../../actions/runtime';
import s from './Header.css';
import Link from '../Link';
import history from '../../history';
import Navigation from '../Navigation';
import logoUrl from './logo-small.png';
import logoUrl2x from './logo-small@2x.png';

function Header({ redditLoading, setRuntimeVariable }) {
  useStyles(s);
  const [redditQuery, setRedditQuery] = useState('');

  const handleChangeRedditQuery = e => {
    setRedditQuery(e.target.value);
  };

  const handleSubmitReddit = e => {
    e.preventDefault();
    setRuntimeVariable({ name: 'subreddit', value: redditQuery });
    setRedditQuery('');
    history.push('/reddit');
  };

  return (
    <div className={s.root}>
      <div className={s.container}>
        <Navigation />
        <Link className={s.brand} to="/">
          <img
            src={logoUrl}
            srcSet={`${logoUrl2x} 2x`}
            width="38"
            height="38"
            alt="React"
          />
          <span className={s.brandTxt}>Your Company</span>
        </Link>
        <div className={s.search}>
          <form onSubmit={handleSubmitReddit}>
            <input
              placeholder={redditLoading ? 'loading...' : 'subreddit'}
              value={redditQuery}
              onChange={handleChangeRedditQuery}
              disabled={redditLoading}
            />
          </form>
        </div>
        <div className={s.banner}>
          <h1 className={s.bannerTitle}>React</h1>
          <p className={s.bannerDesc}>Complex web apps made easy</p>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  redditLoading: PropTypes.bool,
};

const mapState = state => ({
  redditLoading: state.runtime.redditLoading,
});

const mapDispatch = {
  setRuntimeVariable,
};

export default connect(mapState, mapDispatch)(Header);
