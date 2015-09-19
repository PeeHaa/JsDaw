JsDaw.Core.EventManager = (function() {
    var _queue = [];
    var _clock = null;

    function EventManager(clock) {
        _clock = clock;
    }

    // we probably also want to pass argument to the callback at some point
    EventManager.prototype.add = function(timeout, action, repeat) {
        _queue.push({
            schedule: timeout + _clock.getTime(),
            action: action,
            repeat: false
        });
    };

    EventManager.prototype.get = function() {
        _queue.forEach(function(event, i) {
            if (event.schedule > _clock.getTime()) return;

            event.action();

            _queue.splice(i, 1);
        });
    };

    return EventManager;
}());
