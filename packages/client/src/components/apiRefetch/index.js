import { connect as refetch } from 'react-refetch';

export default refetch.defaults({
  buildRequest: mapping => {
    const url = /^\//.test(mapping.url)
      ? `${process.env.REACT_APP_API_URL}/api${mapping.url}`
      : mapping.url;

    return new Request(url, mapping);
  },
});
