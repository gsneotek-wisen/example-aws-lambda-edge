'use strict';
//minify `res-mp4-with-adv.html` using `https://kangax.github.io/html-minifier/`
const html = '<!DOCTYPE html><meta charset=utf-8><title>Lambda@Edge</title><link href=https://player-summit-demo.s3.amazonaws.com/skin/skin.css rel=stylesheet><style>body{font:12px "Myriad Pro","Lucida Grande",sans-serif;text-align:center;padding-top:5%}.flowplayer{width:80%}</style><script src=https://code.jquery.com/jquery-1.11.2.min.js></script><script src=https://player-summit-demo.s3.amazonaws.com/flowplayer.min.js></script><div class="flowplayer fp-edgy"data-ratio=0.4167 data-swf=https://player-summit-demo.s3.amazonaws.com/flowplayer.swf><video autoplay id=player><source src=/ad.mp4 type=video/mp4></video></div><script>document.addEventListener("DOMContentLoaded",function(){var e=document.getElementById("player");e.onended=function(){e.src="${SOURCE}",e.play()}})</script>';

exports.handler = (event, context, callback) => {
  const req = event.Records[0].cf.request;
  const uri = req.uri.substring(req.uri.lastIndexOf('/'));
  const res = {
    status: '200',
    statusDescription: 'HTTP OK',
    httpVersion: req.httpVersion,
    headers: {
      'Content-Type': ['text/html'],
      'Content-Encoding': ['UTF-8']
    },
    body: html.replace("${SOURCE}", uri)
  };
  callback(null, res);
};