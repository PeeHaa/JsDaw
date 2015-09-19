JsDaw.Interface.Controller.Timer = (function() {
    var _timerModel;

    function Timer(timerModel) {
        _timerModel = timerModel;
    }

    Timer.prototype.start = function() {
        _timerModel.start();
    };

    Timer.prototype.pause = function() {
        _timerModel.pause();
    };

    Timer.prototype.stop = function() {
        _timerModel.stop();
    };

    return Timer;
}());
