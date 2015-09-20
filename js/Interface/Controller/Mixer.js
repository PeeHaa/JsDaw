JsDaw.Interface.Controller.Mixer = (function() {
    var _mixerModel;
    var _meterNode;

    function Mixer(mixerModel, meterNode) {
        _mixerModel = mixerModel;
        _meterNode  = meterNode;

        _meterNode.addEventListener('audioprocess', function(e) {
            // no right / left channels?
            //this.setMeter(e.inputBuffer.getChannelData(0), e.inputBuffer.getChannelData(1));
            this.setMeter(e.inputBuffer.getChannelData(0));
        }.bind(this));
    }

    Mixer.prototype.setGain = function(gain) {
        _mixerModel.setGain(gain);
    };

    Mixer.prototype.setMeter = function(levelsLeft, levelsRight) {
        _mixerModel.setMeter(levelsLeft, levelsLeft);
    };

    return Mixer;
}());
