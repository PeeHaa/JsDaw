JsDaw.Interface.Model.Timer = (function() {
    var _running = false;
    var _eventManager;
    var _clock;
    var _startTime;
    var _currentTime = 0;

    function Timer(clock, eventManager) {
        _eventManager = eventManager;
        _clock        = clock;
    }

    Timer.prototype.start = function() {
        _running   = true;
        _startTime = _clock.getTime();

        window.dispatchEvent(new CustomEvent('Model.Timer.ChangePlayStatus', {detail: 'playing'}));

        _eventManager.add(0, this.tick.bind(this));
    };

    Timer.prototype.pause = function() {
        _running = false;

        window.dispatchEvent(new CustomEvent('Model.Timer.ChangePlayStatus', {detail: 'paused'}));
    };

    Timer.prototype.stop = function() {
        _running = false;

        window.dispatchEvent(new CustomEvent('Model.Timer.ChangePlayStatus', {detail: 'stopped'}));

        _eventManager.add(0, function() {
            //_gui.update(0);
            window.dispatchEvent(new CustomEvent('Model.Timer.ChangePlayProgess', {detail: 0}));

            _startTime   = null;
            _currentTime = null;
        });
    };

    Timer.prototype.tick = function() {
        _currentTime += _clock.getTime() - _startTime;

        _startTime = _clock.getTime();

        //_gui.update(_currentTime);
        window.dispatchEvent(new CustomEvent('Model.Timer.ChangePlayProgess', {detail: _currentTime}));

        if (_running) _eventManager.add(0, this.tick.bind(this));
    };

    return Timer;
}());
