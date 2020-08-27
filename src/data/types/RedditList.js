/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

const RedditItemType = new GraphQLObjectType({
  name: 'RedditItem',
  fields: {
    name: { type: GraphQLString },
    url: { type: GraphQLString },
    author: { type: GraphQLString },
    title: { type: GraphQLString },
  },
});

export default new GraphQLList(RedditItemType);
