/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import useStyles from 'isomorphic-style-loader/useStyles';
import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import s from './Reddit.css';
import { searchReddit } from '../../actions/reddit';
import ApplicationContext from '../../components/ApplicationContext';
import RedditCard from './RedditCard';

function RedditList({ reddit, subreddit, searchReddit }) {
  useStyles(s);
  const { context } = useContext(ApplicationContext);

  useEffect(() => {
    searchReddit({ subreddit, context });
  }, [subreddit]);

  return (
    <div>
      {reddit && reddit.map(item => <RedditCard item={item} />)}
    </div>
  );
}

RedditList.defaultProps = {
  reddit: [],
  subreddit: 'jokes',
};

RedditList.propTypes = {
  reddit: PropTypes.array,
  subreddit: PropTypes.string,
  searchReddit: PropTypes.func.isRequired,
};

const mapState = state => {
  return {
    reddit: state.runtime.reddit,
    subreddit: state.runtime.subreddit,
  };
};

const mapDispatch = {
  searchReddit,
};

export default connect(mapState, mapDispatch)(RedditList);
