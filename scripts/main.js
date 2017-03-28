$(document).ready(function() {
  
  var langton = new Langton(200, 150);
  
  var canvas = $('.board').get(0);
  langton.render(canvas);
  
  var stepTimer = undefined;
  var running = false;
  var iteration = 0;
  var speed = $('.langton-speed').val();
  
  function calculateInterval(s) {
    return 100 / Math.pow(2.5, s);
  };
  
  var interval = calculateInterval(speed);
  
  function step() {
    langton.step();
    langton.render(canvas, false);
    ++iteration;
    $('.langton-iteration').text(iteration);
  };
  
  $('.langton-step').click(function() {
    step();
  });
  
  $('.langton-reset').click(function() {
    langton.clear(canvas);
    langton.render(canvas, true);
    iteration = 0;
    $('.langton-iteration').text(iteration);
  });
  
  $('.langton-start-stop').click(function() {
    if (!running) {
      stepTimer = setInterval(step, interval);
      running = true;
    } else {
      clearInterval(stepTimer);
      running = false;
    }
  });
  
  $('.langton-speed').on('input', function() {
    $(this).trigger('change');
  });
  
  $('.langton-speed').change(function() {
    var old_speed = speed;
    speed = $(this).val();
    
    if (speed != old_speed) {
      interval = calculateInterval(speed);
      
      if (running) {
        clearInterval(stepTimer);
        stepTimer = setInterval(step, interval);
      } 
    }

  });
  
  function getMousePos(e, client) {
    var rect = client.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };
  
  var paint = true;
  var drag = false;
  $('.board').mousedown(function(e) {
    var pos = langton.getCellPos(canvas, getMousePos(e, canvas));
    paint = !langton.getCell(pos);
    langton.setCell(pos, paint);
    langton.render(canvas, true);
    
    $(this).bind('mousemove', function(e) {
      var pos = langton.getCellPos(canvas, getMousePos(e, canvas));
      langton.setCell(pos, paint);
      langton.render(canvas, pos);
      //console.log(pos, paint);
    });
  });
  
  $('.board').mouseup(function(e) {
    $(this).unbind('mousemove');
  });
  
  $('.board').mouseout(function(e) {
    $(this).unbind('mousemove');
  });
  
});
