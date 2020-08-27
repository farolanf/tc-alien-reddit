/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import useStyles from 'isomorphic-style-loader/useStyles';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import s from './Reddit.css';
import { searchReddit } from '../../actions/reddit';
import { setRuntimeVariable } from '../../actions/runtime';
import ApplicationContext from '../../components/ApplicationContext';

function RedditPagination({ reddit, subreddit, loading, searchReddit, setRuntimeVariable }) {
  useStyles(s);
  const { context } = useContext(ApplicationContext);

  const handlePrevClick = async () => {
    const list = reddit || [];
    if (list.length <= 0) return;
    const before = list[0].name;
    const results = await searchReddit({ subreddit, before, context });
    if (!results || !results.length) {
      setRuntimeVariable({ name: 'redditNoPrev', value: true });
    }
  };

  const handleNextClick = () => {
    const list = reddit || [];
    if (list.length <= 0) return;
    const after = list[list.length - 1].name;
    searchReddit({ subreddit, after, context });
  };

  return reddit && reddit.length > 0 && (
    <div className={s.pagination}>
      <button onClick={handlePrevClick} disabled={loading}>
        prev
      </button>
      <button onClick={handleNextClick} disabled={loading}>
        next
      </button>
    </div>
  );
}

RedditPagination.defaultProps = {
  reddit: null,
  subreddit: 'jokes',
};

RedditPagination.propTypes = {
  reddit: PropTypes.object,
  subreddit: PropTypes.string,
  loading: PropTypes.bool,
  searchReddit: PropTypes.func.isRequired,
};

const mapState = state => {
  return {
    reddit: state.runtime.reddit,
    subreddit: state.runtime.subreddit,
    loading: state.runtime.redditLoading,
  };
};

const mapDispatch = {
  searchReddit,
  setRuntimeVariable,
};

export default connect(mapState, mapDispatch)(RedditPagination);
