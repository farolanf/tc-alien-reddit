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
import { setRuntimeVariable } from '../../actions/runtime';
import ApplicationContext from '../../components/ApplicationContext';
import RedditList from './RedditList';
import RedditPagination from './RedditPagination';

function Reddit({ title, subreddit, loading, redditNoPrev, searchReddit, setRuntimeVariable }) {
  useStyles(s);
  const { context } = useContext(ApplicationContext);

  useEffect(() => {
    setRuntimeVariable({ name: 'redditNoPrev', value: false });
  }, []);

  const handleReloadClick = async () => {
    await searchReddit({ subreddit, context });
    setRuntimeVariable({ name: 'redditNoPrev', value: false });
  };

  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        {redditNoPrev && (
          <div>
            No newer items.&nbsp;
            <button onClick={handleReloadClick} disabled={loading}>
              Reload
            </button>
          </div>
        )}
        <RedditList />
        <RedditPagination />
      </div>
    </div>
  );
}

Reddit.defaultProps = {
  reddit: null,
  subreddit: 'jokes',
  redditNoPrev: false,
};

Reddit.propTypes = {
  title: PropTypes.string.isRequired,
  reddit: PropTypes.object,
  subreddit: PropTypes.string,
  loading: PropTypes.bool,
  redditNoPrev: PropTypes.bool,
  searchReddit: PropTypes.func.isRequired,
};

const mapState = state => {
  return {
    reddit: state.runtime.reddit,
    subreddit: state.runtime.subreddit,
    loading: state.runtime.redditLoading,
    redditNoPrev: state.runtime.redditNoPrev,
  };
};

const mapDispatch = {
  searchReddit,
  setRuntimeVariable,
};

export default connect(mapState, mapDispatch)(Reddit);
