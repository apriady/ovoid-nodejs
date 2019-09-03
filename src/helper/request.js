const rp = require('request-promise-native');
const { BASE_ENDPOINT, AWS } = require('../../config/base');

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

    return rpOvo(options);
  }
};

module.exports = {
  ovo
};
