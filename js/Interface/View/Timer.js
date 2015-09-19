JsDaw.Interface.View.Timer = (function() {
    var _ctx;
    var _clickManager;
    var _controller;
    var _position = {
        x: 20,
        y: 20
    };
    var _status = 'stopped';

    function Timer(ctx, clickManager, controller) {
        _ctx = ctx;
        _clickManager = clickManager;
        _controller = controller;

        this.draw(0);

        _clickManager.add(_position.x + 10, _position.y + 10, _position.x + 40, _position.y + 40, _controller.start);
        _clickManager.add(_position.x + 50, _position.y + 10, _position.x + 80, _position.y + 40, _controller.pause);
        _clickManager.add(_position.x + 90, _position.y + 10, _position.x + 130, _position.y + 40, _controller.stop);

        window.addEventListener('Model.Timer.ChangePlayStatus', function (e) {
            _status = e.detail;
        }, false);

        window.addEventListener('Model.Timer.ChangePlayProgess', function (e) {
            this.update(e.detail);
        }.bind(this), false);
    }

    Timer.prototype.update = function(milliseconds) {
        this.draw(milliseconds);
    }

    Timer.prototype.getMinutes = function(milliseconds) {
        return ('000' + Math.floor(milliseconds / 1000 / 60)).slice(-3);
    };

    Timer.prototype.getSeconds = function(milliseconds) {
        return ('00' + Math.floor((milliseconds / 1000) % 60)).slice(-2);
    };

    Timer.prototype.getFractions = function(milliseconds) {
        return Math.ceil(milliseconds % 1000).toString().substring(0, 1);
    };

    Timer.prototype.draw = function(milliseconds) {
        this.drawElement();
        this.drawPlayButton();
        this.drawPauseButton();
        this.drawStopButton();
        this.drawClock(milliseconds);
    };

    Timer.prototype.drawElement = function() {
        _ctx.fillStyle = '#f1f1f1';
        _ctx.fillRect(_position.x, _position.y, 130, 70);
    };

    Timer.prototype.drawPlayButton = function() {
        _ctx.fillStyle = _status === 'playing' ? '#ffcc00' : '#fefefe';
        _ctx.fillRect(_position.x + 10, _position.y + 10, 30, 30);

        var path = new Path2D();
        path.moveTo(_position.x + 15, _position.y + 15);
        path.lineTo(_position.x + 15, _position.y + 35);
        path.lineTo(_position.x + 35, _position.y + 25);
        _ctx.fillStyle = '#000000';
        _ctx.fill(path);
    };

    Timer.prototype.drawPauseButton = function() {
        _ctx.fillStyle = _status === 'paused' ? '#ffcc00' : '#fefefe';
        _ctx.fillRect(_position.x + 50, _position.y + 10, 30, 30);

        _ctx.fillStyle = '#000000';
        _ctx.fillRect(_position.x + 55, _position.y + 15, 8, 20);

        _ctx.fillStyle = '#000000';
        _ctx.fillRect(_position.x + 68, _position.y + 15, 8, 20);
    };

    Timer.prototype.drawStopButton = function() {
        _ctx.fillStyle = '#fefefe';
        _ctx.fillRect(_position.x + 90, _position.y + 10, 30, 30);

        _ctx.fillStyle = '#000000';
        _ctx.fillRect(_position.x + 95, _position.y + 15, 20, 20);
    };

    Timer.prototype.drawClock = function(milliseconds) {
        _ctx.fillStyle = '#000000';
        _ctx.font = 'bold 16px Monospace';
        _ctx.fillText(this.getMinutes(milliseconds) + ':' + this.getSeconds(milliseconds) + ':' + this.getFractions(milliseconds), _position.x + 30, _position.y + 60);
    };

    return Timer;
}());
