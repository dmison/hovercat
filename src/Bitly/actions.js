// [
//   {
//     url: 'string',
//     short: 'string'
//   }
// ]

const setURLs = (urls) => {
  return {
    type: 'SET_URLS',
    urls: urls
  };
};

const clearURLs = () => {
  return {
    type: 'CLEAR_URLS'
  };
};

module.exports = {
  setURLs: setURLs,
  clearURLs: clearURLs
};
