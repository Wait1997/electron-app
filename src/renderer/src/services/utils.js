export const getHeaders = (config) => {
  const headers = {
    ...config.headers,
    'Content-Type': config.headers['Content-Type'] ?? 'application/json'
  };

  return headers;
};

export const parseParams = (url, params) => {
  if (!params) {
    return url;
  }

  const keys = Object.keys(params);
  if (keys && keys.length > 0) {
    let path = `${keys[0]}=${params[keys[0]]}`;

    for (let i = 1; i < keys.length; i++) {
      path += `&${keys[i]}=${params[keys[i]]}`;
    }

    return `${url}?${path}`;
  }

  return url;
};
