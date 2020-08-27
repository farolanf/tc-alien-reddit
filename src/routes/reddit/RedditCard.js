/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import useStyles from 'isomorphic-style-loader/useStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Reddit.css';

function RedditCard({ item }) {
  useStyles(s);
  return (
    <div className={s.card}>
      <p>{item.title}</p>
      <cite>
        author: {item.author}
        <br />
        url: <a href={item.url}>{item.url}</a>
      </cite>
    </div>
  );
}

RedditCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default RedditCard;
