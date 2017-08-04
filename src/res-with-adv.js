'use strict';
//minify `res-with-adv.html` using `html-minifier --collapse-whitespace --minify-js true --minify-css true --quote-character \" res-with-adv.html`
const html = '<!doctype html><html><head><meta charset="utf-8"><title>Lambda@Edge</title><link href="https://vjs.zencdn.net/5.11/video-js.min.css" rel="stylesheet"><script src="https://vjs.zencdn.net/5.11/video.min.js"></script></head><body><div style="width:1024px;margin:auto"><div><div><h1>Advertising Play Demo using Lambda@Edge</h1></div></div><div><video id="player" class="video-js vjs-default-skin vjs-big-play-centered" width="1024" data-setup="{}" playsinline controls autoplay preload="auto"><source src="/ad.mp4" type="video/mp4"></video></div><div style="text-align:end"><img src="/img/logo.png" height="50px"></div></div><script>function addEvent(e,n,t,d){window.addEventListener?e.addEventListener(n,t,d):window.attachEvent?e.attachEvent("on"+n,t):e["on"+n]=t}document.addEventListener("DOMContentLoaded",function(){var e=document.getElementById("player"),n=videojs(e);n.on("ended",function(){n.src("${SOURCE}")}),addEvent(e,"dblclick",function(){n.isFullscreen()?n.exitFullscreen():n.requestFullscreen()}),n.play()})</script></body></html>';

exports.handler = (event, context, callback) => {
  const req = event.Records[0].cf.request,
    uri = req.uri.substring(req.uri.lastIndexOf('/')),
    src = uri.replace(/\.(html|htm)$/, '.mp4');

  const res = {
    status: '200',
    statusDescription: 'HTTP OK',
    httpVersion: req.httpVersion,
    headers: {
      'Content-Type': ['text/html'],
      'Content-Encoding': ['UTF-8']
    },
    body: html.replace("${SOURCE}", src)
  };

  callback(null, res);
};