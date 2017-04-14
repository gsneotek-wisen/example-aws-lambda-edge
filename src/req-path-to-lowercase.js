'use strict';

exports.handler = (event, context, callback) => {
  const req = event.Records[0].cf.request;
  if (/[A-Z]/.test(req.uri)) {
    const old = req.uri;
    req.uri = req.uri.toLowerCase();
    console.log(old, 'to', req.uri);
  }
  callback(null, req);
};