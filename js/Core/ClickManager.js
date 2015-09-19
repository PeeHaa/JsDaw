JsDaw.Core.ClickManager = (function() {
    var _handlers = [];

    function ClickManager(canvas) {
        canvas.addEventListener('click', function(e) {
            var handlers = this.getHandlers(e.layerX, e.layerY);

            handlers.forEach(function(callback) {
                callback();
            });
        }.bind(this));
    }

    ClickManager.prototype.add = function(startX, startY, endX, endY, callback) {
        _handlers.push({
            startX: startX,
            startY: startY,
            endX: endX,
            endY: endY,
            callback: callback
        });
    };

    ClickManager.prototype.getHandlers = function(x, y) {
        var handlers = [];

        _handlers.forEach(function(handler, i) {
            if (x >= handler.startX && x <= handler.endX && y >= handler.startY && y <= handler.endY) {
                handlers.push(handler.callback);
            }
        });

        return handlers;
    }

    return ClickManager;
}());
