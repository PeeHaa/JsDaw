(function(JsDaw) {
    // setup the canvas
    var canvas = document.getElementById('viewport');
    var ctx    = canvas.getContext('2d');

    // setup the audio object and gain node
    var audioCtx  = new (window.AudioContext || window.webkitAudioContext)();
    var gainNode  = audioCtx.createGain();
    var meterNode = audioCtx.createScriptProcessor(2048, 1, 1);

    gainNode.gain.value = -0.0000001;

    //meter.onaudioprocess = function(e) { ctx.processAudio.call(ctx, e) };
    //meterNode.onaudioprocess = function(e) { console.log(e.inputBuffer.getChannelData(0)); };
    //meterNode.addEventListener('audioprocess', function(e) { console.log(e.inputBuffer.getChannelData(0)); });
    gainNode.connect(meterNode);
    meterNode.connect(audioCtx.destination);

    var clock        = new JsDaw.Core.Clock();
    var eventManager = new JsDaw.Core.EventManager(clock);
    var clickManager = new JsDaw.Core.ClickManager(canvas);
    var loop         = new JsDaw.Core.Loop(clock, eventManager);

    var timerModel      = new JsDaw.Interface.Model.Timer(clock, eventManager);
    var timerController = new JsDaw.Interface.Controller.Timer(timerModel);
    var timerView       = new JsDaw.Interface.View.Timer(ctx, clickManager, timerController);

    var soundView  = new JsDaw.Interface.View.Sound(audioCtx, gainNode);

    var mixerModel      = new JsDaw.Interface.Model.Mixer(gainNode, eventManager);
    var mixerController = new JsDaw.Interface.Controller.Mixer(mixerModel, meterNode);
    var mixerView       = new JsDaw.Interface.View.Mixer(ctx, clickManager, mixerController);

    loop.start();

/*
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var oscillator = audioCtx.createOscillator();

    oscillator.connect(audioCtx.destination);

    oscillator.type = 'square';
    oscillator.frequency.value = 1000; // value in hertz
    oscillator.start();
*/
}(JsDaw));