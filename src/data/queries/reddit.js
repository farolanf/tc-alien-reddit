import fetch from 'node-fetch';
import get from 'lodash/get';
import pick from 'lodash/pick';
import { GraphQLString } from 'graphql';
import RedditListType from '../types/RedditList';
import config from '../../config';

let tokens;
let tokensReceivedAt;

const getRedditAccessToken = async ({ permanent } = {}) => {
  return fetch(config.reddit.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      Authorization: `Basic ${Buffer.from(
        `${config.reddit.clientId}:${config.reddit.clientSecret}`,
      ).toString('base64')}`,
    },
    body: `grant_type=client_credentials${
      permanent ? '&duration=permanent' : ''
    }`,
  }).then(response => response.json());
};

const refreshAccessToken = async ({ refreshToken } = {}) => {
  return fetch(config.reddit.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      Authorization: `Basic ${Buffer.from(
        `${config.reddit.clientId}:${config.reddit.clientSecret}`,
      ).toString('base64')}`,
    },
    body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
  }).then(response => response.json());
};

const isTokenExpired = () =>
  Date.now - 1000 * 60 * 5 > tokensReceivedAt + tokens.expires_in * 1000;

const checkToken = async () => {
  if (!tokens) {
    tokens = await getRedditAccessToken();
    tokensReceivedAt = Date.now;
  } else if (isTokenExpired()) {
    if (tokens.refresh_token) {
      tokens = await refreshAccessToken({
        refreshToken: tokens.refresh_token,
      });
      tokensReceivedAt = Date.now;
    } else {
      tokens = await getRedditAccessToken({ permanent: true });
      tokensReceivedAt = Date.now;
    }
  }
};

const redditApi = async (path, fetchOptions = {}) => {
  await checkToken();
  return fetch(`${config.reddit.apiUrl}${path}`, {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
      'User-Agent': config.reddit.userAgent,
    },
    method: 'GET',
    ...fetchOptions,
  }).then(response => response.json());
};

const reddit = {
  type: RedditListType,
  args: {
    path: {
      name: 'path',
      type: GraphQLString,
    },
  },
  async resolve(obj, { path }) {
    const data = await redditApi(path);
    return get(data, 'data.children', []).map(item =>
      pick(item.data, ['name', 'url', 'author', 'title']),
    );
  },
};

export default reddit;
