function getMousePos(e, client) {
  var rect = client.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
};


$(document).ready(function() {
  
  var canvas = $('.board').get(0);
  var width = canvas.width;
  var height = canvas.height;
  var max_radius = width < height ? width/2-10 : height/2-10;
  var radius = max_radius;
  var Cattr = 0.005;
  
  var game = undefined;
  var stepTimer = undefined;
  var running = false;
  var iteration = 0;
  
  
  function reset() {
    clearInterval(stepTimer);
    running = false;
    iteration = 0;
    
    $('.button-start').show();
    $('.button-stop').hide();
    
    game = new Slogro(canvas, radius);
    radius = 0.01 * max_radius * $('.slider-radius').val();
    game.setRadius(radius);
    game.setAttraction(Cattr * $('.slider-attraction').val());
    game.setColor(0, $('input[name=board-color]').val());
    game.setColor(1, $('input[name=main-color]').val());
    game.setColor(2, $('input[name=trail-color]').val());
    game.render(canvas);
  };
  
  
  reset();
  
  
  function step() {
    game.addParticle();
  };
  
  
  $('.button-step').click(function() {
    step();
  });
  
  
  $('.button-start').click(function() {
    $(this).hide();
    $('.button-stop').show();
    if (!running) {
      stepTimer = setInterval(step, 10);
      running = true;
    }
  });
  
  
  $('.button-stop').click(function() {
    $(this).hide();
    $('.button-start').show();
    clearInterval(stepTimer);
    running = false;
  });
  
  
  $('.button-reset').click(function() {
    reset();
  });
  
  
  $('.slider-radius').change(function() {
    radius = 0.01 * max_radius * $('.slider-radius').val();
    game.setRadius(radius);
    game.render();
  });
  
  
  $('.slider-attraction').change(function() {
    game.setAttraction(Cattr * $(this).val());
  });
  
  
  $('input[name=board-color]').change(function() {
    var color = $(this).val();
    console.log(color);
    game.setColor(0, color);
    game.render(canvas);
  });
  
  
  $('input[name=main-color]').change(function(color) {
    var color = $(this).val();
    console.log(color);
    game.setColor(1, color);
    //game.render(canvas);
  });
  
  
  $('input[name=trail-color]').change(function(color) {
    var color = $(this).val();
    console.log(color);
    game.setColor(2, color);
    //game.render(canvas);
  });
  
  
  $('.button-colors').click(function() {
    game.render(canvas);
  });
  
  
  /*var paint = true;
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
  });*/
  
  $('.board').mouseup(function(e) {
    $(this).unbind('mousemove');
  });
  
  $('.board').mouseout(function(e) {
    $(this).unbind('mousemove');
  });
  
});
