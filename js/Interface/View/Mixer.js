JsDaw.Interface.View.Mixer = (function() {
    var _ctx;
    var _clickManager;
    var _controller;
    var _position = {
        x: 170,
        y: 20
    };

    var _gain = 1;
    var _levels = {left: 0, right: 0};

    function Mixer(ctx, clickManager, controller) {
        _ctx = ctx;
        _clickManager = clickManager;
        _controller = controller;

        _clickManager.add(_position.x + 105, _position.y + 20, _position.x + 145, _position.y + 370, function(x, y) {
            // top margin _position.y + 20
            // status y - top margin
            // total space 350
            // status / total

            var position = y - (_position.y + 20);
            var gain     = 1 - (position / 350);

            _controller.setGain(gain);
        });

        window.addEventListener('Model.Mixer.ChangeGain', function (e) {
            _gain = e.detail;

            this.draw(e.detail, _levels);
        }.bind(this), false);

        window.addEventListener('Model.Mixer.ChangeMeter', function (e) {
            this.draw(_gain, {left: e.detail.left, right: e.detail.right});
        }.bind(this), false);

        this.draw(_gain, _levels);
    }

    Mixer.prototype.draw = function(gain, levels) {
        this.drawElement();
        this.drawOutput(levels);
        this.drawMixer(gain);
    };

    Mixer.prototype.drawElement = function() {
        _ctx.fillStyle = '#f1f1f1';
        _ctx.fillRect(_position.x, _position.y, 160, 400);
    };

    Mixer.prototype.drawOutput = function(levels) {
        var output = [];

        for (var i = 0; i < 30; i++) {
            var color = 'green';

            if (i < 2) {
                color = 'red';
            }

            output.push({startX: _position.x + 20, startY: _position.y + 20 + (i * 15), color: color});
        }

        if (levels.left > 0) {
            var level    = ((1 - levels.left) * 30);
            var inActive = 30 - Math.ceil(level);
        } else {
            var inActive = 30;
        }

        output.forEach(function(value) {
            if (value.color === 'red' && inActive > 0) {
                _ctx.fillStyle = '#B20000';
            } else if (value.color === 'red') {
                _ctx.fillStyle = '#FF1919';
            } else if (value.color === 'green' && inActive > 0) {
                _ctx.fillStyle = '#00B233';
            } else {
                _ctx.fillStyle = '#00FF48';
            }

            inActive--;

            _ctx.fillRect(value.startX, value.startY, 30, 10);
            _ctx.fillRect(value.startX + 40, value.startY, 30, 10);
        });
    };

    Mixer.prototype.drawMixer = function(gain) {
        _ctx.fillStyle = '#000000';
        _ctx.fillRect(_position.x + 125, _position.y + 20, 2, 350);

        var extraGain = 350 * (1 - gain);

        _ctx.fillStyle = '#6d6d6d';
        _ctx.fillRect(_position.x + 105, _position.y + 20 + extraGain, 40, 20);

        _ctx.fillStyle = '#eeeeee';
        _ctx.fillRect(_position.x + 106, _position.y + 29 + extraGain, 38, 1);
    };

    return Mixer;
}());
