JsDaw.Core.Loop = (function(clock) {
    var _running = false;
    var _clock   = clock;
    var _queue = null;

    function Loop(clock, queue) {
        _clock = clock;
        _queue = queue;
    }

    Loop.prototype.start = function() {
        _running = true;

        this.run();
    };

    Loop.prototype.stop = function() {
        _running = false;
    };

    Loop.prototype.run = function(timestamp) {
        if (!_running) return;

        window.requestAnimationFrame(this.run.bind(this));

        if (typeof timestamp === 'undefined') return;

        _clock.tick(timestamp);
        _queue.get();
    };

    return Loop;
}());
