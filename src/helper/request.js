const rp = require('request-promise-native');
const { BASE_ENDPOINT, AWS } = require('../../config/base');
const { ovoidError } = require('./errors')

const rpOvo = rp.defaults({
  baseUrl: BASE_ENDPOINT
});
const rpOvoAws = rp.defaults({
  baseUrl: AWS
});

const ovo = {
  post: (uri, body, headers) => {
    const options = {
      method: 'POST',
      uri,
      body,
      headers,
      json: true
    };

    return rpOvo(options).catch(err => {
      ovoidError(err)
    });
  },
  get: (uri, qs, headers) => {
    const options = {
      method: 'GET',
      uri,
      qs,
      headers,
      json: true
    };

    return rpOvo(options).catch(err => {
      ovoidError(err)
    });
  }
};

const ovoAws = {
  post: (uri, body, headers) => {
    const options = {
      method: 'POST',
      uri,
      body,
      headers,
      json: true
    };

    return rpOvoAws(options).catch(err => {
      ovoidError(err)
    });
  },
  get: (uri, qs, headers) => {
    const options = {
      method: 'GET',
      uri,
      qs,
      headers,
      json: true
    };

    return rpOvoAws(options).catch(err => {
      ovoidError(err)
    });
  }
};

module.exports = {
  ovo,
  ovoAws
};
