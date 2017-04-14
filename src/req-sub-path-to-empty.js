'use strict';

exports.handler = (event, context, callback) => {
  const req = event.Records[0].cf.request;
  if (!req.uri.endsWith('/')) {
    var old = req.uri;
    var i = req.uri.lastIndexOf('/');
    req.uri = req.uri.substring(i);
    console.log(old, 'to', req.uri);
  }
  callback(null, req);
};