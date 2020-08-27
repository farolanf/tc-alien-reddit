import get from 'lodash/get';
import { setRuntimeVariable } from './runtime';

export const searchReddit = ({
  q,
  subreddit,
  after,
  before,
  limit = 15,
  context: { fetch },
}) => async dispatch => {
  const params = [
    q && `q=${q}`,
    after && `after=${after}`,
    before && `before=${before}`,
    limit && `limit=${limit}`,
  ]
    .filter(x => x)
    .join('&');

  dispatch(setRuntimeVariable({ name: 'redditLoading', value: true }));

  const data = await fetch('/graphql', {
    body: JSON.stringify({
      query: `query Reddit($path: String) {
        reddit(path: $path) { 
          name
          url
          author
          title
        }
      }`,
      variables: {
        path: `${subreddit ? `/r/${subreddit}` : ''}${
          q ? '/search' : ''
        }?${params}`,
      },
    }),
  }).then(response => response.json());

  const results = get(data, 'data.reddit', []);

  dispatch(
    setRuntimeVariable({
      name: 'reddit',
      value: results,
    }),
  );

  dispatch(setRuntimeVariable({ name: 'redditLoading', value: false }));

  return results;
};
