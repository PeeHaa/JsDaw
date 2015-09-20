JsDaw.Interface.View.Sound = (function() {
    var _audioCtx;
    var _gainNode;
    var _oscillator;
    var _status;

    function Sound(audioCtx, gainNode) {
        _audioCtx = audioCtx;
        _gainNode = gainNode;

        window.addEventListener('Model.Timer.ChangePlayStatus', function (e) {
            if (e.detail !== _status && e.detail === 'playing') {
                this.start();
            } else {
                this.stop();
            }

            _status = e.detail;
        }.bind(this), false);
    }

    Sound.prototype.start = function() {
        _oscillator = _audioCtx.createOscillator();
        _oscillator.connect(_audioCtx.destination);

        _oscillator.type = 'square';
        _oscillator.frequency.value = 500; // value in hertz

        _oscillator.connect(_gainNode);
        _gainNode.connect(_audioCtx.destination);

        _oscillator.start();
    };

    Sound.prototype.stop = function() {
        if (typeof _oscillator === 'undefined') return;

        _oscillator.stop();
    };

    return Sound;
}());
