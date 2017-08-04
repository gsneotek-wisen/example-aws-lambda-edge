'use strict';

exports.handler = (event, context, callback) => {
  const req = event.Records[0].cf.request,
    ua = req.headers['User-Agent'] || '',
    uri = req.uri,
    i = uri.lastIndexOf('/'),
    prefix = uri.slice(0, i);

  //@see https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
  let path = '/pc';
  if (ua.some(e => /(Tablet|iPad)/.test(e))) {
    path = '/tablet';
  } else if (ua.some(e => /(Mobi)/.test(e))) {
    path = '/mobile';
  }
  req.uri = [uri.slice(0, i), path, uri.slice(i)].join('');
  console.log('direct to', req.uri, ua);
  callback(null, req);
};