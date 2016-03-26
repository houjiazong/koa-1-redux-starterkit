module.exports = function applyExpressMiddleware (fn, req, res) {
  const originalEnd = res.end

  return function(done) {
      res.end = function() {
          originalEnd.apply(this, arguments);
          done(null, false);
      };

      fn(req, res, function() {
          done(null, true);
      });
  };
}
