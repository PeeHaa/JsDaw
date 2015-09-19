(function(JsDaw) {
    var canvas = document.getElementById('viewport');
    var ctx    = canvas.getContext('2d');

    var clock        = new JsDaw.Core.Clock();
    var eventManager = new JsDaw.Core.EventManager(clock);
    var clickManager = new JsDaw.Core.ClickManager(canvas);
    var loop         = new JsDaw.Core.Loop(clock, eventManager);

    var timerModel      = new JsDaw.Interface.Model.Timer(clock, eventManager);
    var timerController = new JsDaw.Interface.Controller.Timer(timerModel);
    var timerView  = new JsDaw.Interface.View.Timer(ctx, clickManager, timerController);

    //var timerModel = new JsDaw.Interface.Model.Timer(clock, eventManager, timerView);

    loop.start();

    document.getElementById('start').addEventListener('click', function(e) {
        e.preventDefault();

        timerModel.start();
    });

    document.getElementById('pause').addEventListener('click', function(e) {
        e.preventDefault();

        timerModel.pause();
    });

    document.getElementById('stop').addEventListener('click', function(e) {
        e.preventDefault();

        timerModel.stop();
    });
}(JsDaw));