JsDaw.Core.Clock = (function() {
    var _time = null;

    function Clock() {
    }

    Clock.prototype.tick = function(timestamp) {
        _time = timestamp;
    };

    Clock.prototype.getTime = function() {
        return _time;
    };

    return Clock;
}());
