const rp = require('request-promise-native');
const { BASE_ENDPOINT, AWS, AUTH_ENDPOINT } = require('../../config/base');

const rpOvo = rp.defaults({
  baseUrl: BASE_ENDPOINT
});
const rpOvoAws = rp.defaults({
  baseUrl: AWS
});
const rpOvoAuth = rp.defaults({
  baseUrl: AUTH_ENDPOINT
});

const ovoAuth = {
  post: (uri, body, headers) => {
    const options = {
      method: 'POST',
      uri,
      body,
      headers,
      json: true
    };

    return rpOvoAuth(options).catch(err => {
      throw err.error
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

    return rpOvoAuth(options).catch(err => {
      throw err.error
    });
  }
};

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
      throw err.error
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
      throw err.error
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
      throw err.error
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
      throw err.error
    });
  }
};

module.exports = {
  ovo,
  ovoAws,
  ovoAuth
};
