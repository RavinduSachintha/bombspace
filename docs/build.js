(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var raf = require('./raf');
var rng = require('./rng');

var canvas = document.querySelector('#game');
var ctx = canvas.getContext('2d');

var unitCount = 20;
var cvUnitSizeH = canvas.width / unitCount;
var cvUnitSizeV = canvas.height / unitCount;

var seed = Math.ceil(Math.random() * 100);
var rand = rng(seed);

var balls = [];
var color = '#FFFFFF';

var colors = [
  '#7FDBFF', '#0074D9', '#01FF70', '#001F3F', '#39CCCC',
  '#3D9970', '#2ECC40', '#FF4136', '#85144B', '#FF851B',
  '#B10DC9', '#FFDC00', '#F012BE',
];

for (var i = 0; i < 5; i++) {
  balls.push({
    x: rand.range(cvUnitSizeH, cvUnitSizeH * (unitCount - 1)),
    y: rand.range(cvUnitSizeV, cvUnitSizeV * (unitCount - 1)),
    radius: 5,
    dx: 0,
    dy: 0,
    color: color
  });
}

raf.start(function(elapsed) {
  // Clear the screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update each balls
  balls.forEach(function(ball) {
  //   // Gravity
  //   ball.dy += elapsed * 1500;

  //   // Handle collision against the canvas's edges
  //   if (ball.x - ball.radius < 0 && ball.dx < 0 || ball.x + ball.radius > canvas.width && ball.dx > 0) ball.dx = -ball.dx * 0.7;
  //   if (ball.y - ball.radius < 0 && ball.dy < 0 || ball.y + ball.radius > canvas.height && ball.dy > 0) ball.dy = -ball.dy * 0.7;

  //   // Update ball position
  //   ball.x += ball.dx * elapsed;
  //   ball.y += ball.dy * elapsed;

    // Render the ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = ball.color;
    ctx.fill();
  });
});

},{"./raf":2,"./rng":3}],2:[function(require,module,exports){
// Holds last iteration timestamp.
var time = 0;

/**
 * Calls `fn` on next frame.
 *
 * @param  {Function} fn The function
 * @return {int} The request ID
 * @api private
 */
function raf(fn) {
  return window.requestAnimationFrame(function() {
    var now = Date.now();
    var elapsed = now - time;

    if (elapsed > 999) {
      elapsed = 1 / 60;
    } else {
      elapsed /= 1000;
    }

    time = now;
    fn(elapsed);
  });
}

module.exports = {
  /**
   * Calls `fn` on every frame with `elapsed` set to the elapsed
   * time in milliseconds.
   *
   * @param  {Function} fn The function
   * @return {int} The request ID
   * @api public
   */
  start: function(fn) {
    return raf(function tick(elapsed) {
      fn(elapsed);
      raf(tick);
    });
  },
  /**
   * Cancels the specified animation frame request.
   *
   * @param {int} id The request ID
   * @api public
   */
  stop: function(id) {
    window.cancelAnimationFrame(id);
  }
};

},{}],3:[function(require,module,exports){
module.exports = function(seed) {
  function random() {
    var x = Math.sin(0.8765111159592828 + seed++) * 1e4
    return x - Math.floor(x)
  }
  
  var rng = {
    /**
     * Return an integer within [0, max).
     *
     * @param  {int} [max]
     * @return {int}
     * @api public
     */
    int: function(max) {
      return random() * (max || 0xfffffff) | 0;
    },
    /**
     * Return a float within [0.0, 1.0).
     *
     * @return {float}
     * @api public
     */
    float: function() {
      return random();
    },
    /**
     * Return a boolean.
     *
     * @return {Boolean}
     * @api public
     */
    bool: function() {
      return random() > 0.5;
    },
    /**
     * Return an integer within [min, max).
     *
     * @param  {int} min
     * @param  {int} max
     * @return {int}
     * @api public
     */
    range: function(min, max) {
      return rng.int(max - min) + min;
    },
    /**
     * Pick an element from the source.
     *
     * @param  {mixed[]} source
     * @return {mixed}
     * @api public
     */
    pick: function(source) {
      return source[rng.range(0, source.length)];
    }
  };

  return rng;
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbiIsInNyYy9yYWYuanMiLCJzcmMvcm5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwidmFyIHJhZiA9IHJlcXVpcmUoJy4vcmFmJyk7XG52YXIgcm5nID0gcmVxdWlyZSgnLi9ybmcnKTtcblxudmFyIGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lJyk7XG52YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbnZhciB1bml0Q291bnQgPSAyMDtcbnZhciBjdlVuaXRTaXplSCA9IGNhbnZhcy53aWR0aCAvIHVuaXRDb3VudDtcbnZhciBjdlVuaXRTaXplViA9IGNhbnZhcy5oZWlnaHQgLyB1bml0Q291bnQ7XG5cbnZhciBzZWVkID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAxMDApO1xudmFyIHJhbmQgPSBybmcoc2VlZCk7XG5cbnZhciBiYWxscyA9IFtdO1xudmFyIGNvbG9yID0gJyNGRkZGRkYnO1xuXG52YXIgY29sb3JzID0gW1xuICAnIzdGREJGRicsICcjMDA3NEQ5JywgJyMwMUZGNzAnLCAnIzAwMUYzRicsICcjMzlDQ0NDJyxcbiAgJyMzRDk5NzAnLCAnIzJFQ0M0MCcsICcjRkY0MTM2JywgJyM4NTE0NEInLCAnI0ZGODUxQicsXG4gICcjQjEwREM5JywgJyNGRkRDMDAnLCAnI0YwMTJCRScsXG5dO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xuICBiYWxscy5wdXNoKHtcbiAgICB4OiByYW5kLnJhbmdlKGN2VW5pdFNpemVILCBjdlVuaXRTaXplSCAqICh1bml0Q291bnQgLSAxKSksXG4gICAgeTogcmFuZC5yYW5nZShjdlVuaXRTaXplViwgY3ZVbml0U2l6ZVYgKiAodW5pdENvdW50IC0gMSkpLFxuICAgIHJhZGl1czogNSxcbiAgICBkeDogMCxcbiAgICBkeTogMCxcbiAgICBjb2xvcjogY29sb3JcbiAgfSk7XG59XG5cbnJhZi5zdGFydChmdW5jdGlvbihlbGFwc2VkKSB7XG4gIC8vIENsZWFyIHRoZSBzY3JlZW5cbiAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gIC8vIFVwZGF0ZSBlYWNoIGJhbGxzXG4gIGJhbGxzLmZvckVhY2goZnVuY3Rpb24oYmFsbCkge1xuICAvLyAgIC8vIEdyYXZpdHlcbiAgLy8gICBiYWxsLmR5ICs9IGVsYXBzZWQgKiAxNTAwO1xuXG4gIC8vICAgLy8gSGFuZGxlIGNvbGxpc2lvbiBhZ2FpbnN0IHRoZSBjYW52YXMncyBlZGdlc1xuICAvLyAgIGlmIChiYWxsLnggLSBiYWxsLnJhZGl1cyA8IDAgJiYgYmFsbC5keCA8IDAgfHwgYmFsbC54ICsgYmFsbC5yYWRpdXMgPiBjYW52YXMud2lkdGggJiYgYmFsbC5keCA+IDApIGJhbGwuZHggPSAtYmFsbC5keCAqIDAuNztcbiAgLy8gICBpZiAoYmFsbC55IC0gYmFsbC5yYWRpdXMgPCAwICYmIGJhbGwuZHkgPCAwIHx8IGJhbGwueSArIGJhbGwucmFkaXVzID4gY2FudmFzLmhlaWdodCAmJiBiYWxsLmR5ID4gMCkgYmFsbC5keSA9IC1iYWxsLmR5ICogMC43O1xuXG4gIC8vICAgLy8gVXBkYXRlIGJhbGwgcG9zaXRpb25cbiAgLy8gICBiYWxsLnggKz0gYmFsbC5keCAqIGVsYXBzZWQ7XG4gIC8vICAgYmFsbC55ICs9IGJhbGwuZHkgKiBlbGFwc2VkO1xuXG4gICAgLy8gUmVuZGVyIHRoZSBiYWxsXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoYmFsbC54LCBiYWxsLnksIGJhbGwucmFkaXVzLCAwLCBNYXRoLlBJICogMiwgdHJ1ZSk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBiYWxsLmNvbG9yO1xuICAgIGN0eC5maWxsKCk7XG4gIH0pO1xufSk7XG4iLCIvLyBIb2xkcyBsYXN0IGl0ZXJhdGlvbiB0aW1lc3RhbXAuXG52YXIgdGltZSA9IDA7XG5cbi8qKlxuICogQ2FsbHMgYGZuYCBvbiBuZXh0IGZyYW1lLlxuICpcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb25cbiAqIEByZXR1cm4ge2ludH0gVGhlIHJlcXVlc3QgSURcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiByYWYoZm4pIHtcbiAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5vdyA9IERhdGUubm93KCk7XG4gICAgdmFyIGVsYXBzZWQgPSBub3cgLSB0aW1lO1xuXG4gICAgaWYgKGVsYXBzZWQgPiA5OTkpIHtcbiAgICAgIGVsYXBzZWQgPSAxIC8gNjA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsYXBzZWQgLz0gMTAwMDtcbiAgICB9XG5cbiAgICB0aW1lID0gbm93O1xuICAgIGZuKGVsYXBzZWQpO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8qKlxuICAgKiBDYWxscyBgZm5gIG9uIGV2ZXJ5IGZyYW1lIHdpdGggYGVsYXBzZWRgIHNldCB0byB0aGUgZWxhcHNlZFxuICAgKiB0aW1lIGluIG1pbGxpc2Vjb25kcy5cbiAgICpcbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvblxuICAgKiBAcmV0dXJuIHtpbnR9IFRoZSByZXF1ZXN0IElEXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuICBzdGFydDogZnVuY3Rpb24oZm4pIHtcbiAgICByZXR1cm4gcmFmKGZ1bmN0aW9uIHRpY2soZWxhcHNlZCkge1xuICAgICAgZm4oZWxhcHNlZCk7XG4gICAgICByYWYodGljayk7XG4gICAgfSk7XG4gIH0sXG4gIC8qKlxuICAgKiBDYW5jZWxzIHRoZSBzcGVjaWZpZWQgYW5pbWF0aW9uIGZyYW1lIHJlcXVlc3QuXG4gICAqXG4gICAqIEBwYXJhbSB7aW50fSBpZCBUaGUgcmVxdWVzdCBJRFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cbiAgc3RvcDogZnVuY3Rpb24oaWQpIHtcbiAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoaWQpO1xuICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzZWVkKSB7XG4gIGZ1bmN0aW9uIHJhbmRvbSgpIHtcbiAgICB2YXIgeCA9IE1hdGguc2luKDAuODc2NTExMTE1OTU5MjgyOCArIHNlZWQrKykgKiAxZTRcbiAgICByZXR1cm4geCAtIE1hdGguZmxvb3IoeClcbiAgfVxuICBcbiAgdmFyIHJuZyA9IHtcbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYW4gaW50ZWdlciB3aXRoaW4gWzAsIG1heCkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtpbnR9IFttYXhdXG4gICAgICogQHJldHVybiB7aW50fVxuICAgICAqIEBhcGkgcHVibGljXG4gICAgICovXG4gICAgaW50OiBmdW5jdGlvbihtYXgpIHtcbiAgICAgIHJldHVybiByYW5kb20oKSAqIChtYXggfHwgMHhmZmZmZmZmKSB8IDA7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBmbG9hdCB3aXRoaW4gWzAuMCwgMS4wKS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge2Zsb2F0fVxuICAgICAqIEBhcGkgcHVibGljXG4gICAgICovXG4gICAgZmxvYXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHJhbmRvbSgpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgYm9vbGVhbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBib29sOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiByYW5kb20oKSA+IDAuNTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFJldHVybiBhbiBpbnRlZ2VyIHdpdGhpbiBbbWluLCBtYXgpLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7aW50fSBtaW5cbiAgICAgKiBAcGFyYW0gIHtpbnR9IG1heFxuICAgICAqIEByZXR1cm4ge2ludH1cbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuICAgIHJhbmdlOiBmdW5jdGlvbihtaW4sIG1heCkge1xuICAgICAgcmV0dXJuIHJuZy5pbnQobWF4IC0gbWluKSArIG1pbjtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFBpY2sgYW4gZWxlbWVudCBmcm9tIHRoZSBzb3VyY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHttaXhlZFtdfSBzb3VyY2VcbiAgICAgKiBAcmV0dXJuIHttaXhlZH1cbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuICAgIHBpY2s6IGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIHNvdXJjZVtybmcucmFuZ2UoMCwgc291cmNlLmxlbmd0aCldO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gcm5nO1xufTtcbiJdfQ==
