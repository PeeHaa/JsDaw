JsDaw.Interface.Model.Mixer = (function() {
    var _gainNode;
    var _eventManager;
    var _gain = 1;

    function Mixer(gainNode, eventManager) {
        _gainNode     = gainNode;
        _eventManager = eventManager;
    }

    Mixer.prototype.setGain = function(gain) {
        _gainNode.gain.value = gain - 1;
        window.dispatchEvent(new CustomEvent('Model.Mixer.ChangeGain', {detail: gain}));
    };

    Mixer.prototype.setMeter = function(leftLevels, rightLevels) {
        _eventManager.add(0, function() {
            window.dispatchEvent(new CustomEvent('Model.Mixer.ChangeMeter', {detail: {
                left: this.getHighestLevel(leftLevels),
                right: this.getHighestLevel(rightLevels)
            }}));
        }.bind(this));
    };

    Mixer.prototype.getHighestLevel = function(levels) {
        var max = 0;

        levels.forEach(function(level) {
            if (Math.abs(level) > max) {
                max = Math.abs(level);
            }
        });

        return max;
    };

    return Mixer;
}());
