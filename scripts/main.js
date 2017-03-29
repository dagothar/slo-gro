function getMousePos(e, client) {
  var rect = client.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
};


$(document).ready(function() {
  
  var canvas = $('#board').get(0);
  var overlay = $('#overlay').get(0);
  var width = canvas.width;
  var height = canvas.height;
  var max_radius = width < height ? width/2-10 : height/2-10;
  var radius = max_radius;
  var Cattr = 0.005;
  var attraction = 0.0;
  
  var game = undefined;
  var stepTimer = undefined;
  var running = false;
  var iteration = 0;
  
  
  function reset() {
    clearInterval(stepTimer);
    running = false;
    iteration = 0;
    
    $('input[name=board-color]').val('#000000');
    $('input[name=main-color]').val('#00ff00');
    $('input[name=trail-color]').val('#000000');
    $('.slider-radius').val(100);
    $('.slider-attraction').val(100);
    
    $('.button-start').show();
    $('.button-stop').hide();
    
    game = new Slogro(canvas, overlay, radius);
    radius = 0.01 * max_radius * $('.slider-radius').val();
    attraction = Cattr * $('.slider-attraction').val();
    game.setRadius(radius);
    game.setAttraction(Cattr * $('.slider-attraction').val());
    game.setColor(0, $('input[name=board-color]').val());
    game.setColor(1, $('input[name=main-color]').val());
    game.setColor(2, $('input[name=trail-color]').val());
    game.render(canvas);
    
    $('#launched').text(game.getTried());
    $('#settled').text(game.getSettled());
    $('#radius').text(Math.round(radius));
    $('#area').text(Math.round(Math.PI * radius * radius));
    $('#attraction').text(parseFloat(attraction).toFixed(3));
  };
  
  
  reset();
  
  
  function step() {
    game.addParticle();
    $('#launched').text(game.getTried());
    $('#settled').text(game.getSettled());
    $('#radius').text(Math.round(radius));
    $('#area').text(Math.round(Math.PI * radius * radius));
  };
  
  
  $('.button-step').click(function() {
    step();
  });
  
  
  $('.button-start').click(function() {
    $(this).hide();
    $('.button-stop').show();
    if (!running) {
      stepTimer = setInterval(step, 1);
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
  
  
  $('.slider-radius').on('input change', function() {
    radius = 0.01 * max_radius * $('.slider-radius').val();
    game.setRadius(radius);
    $('#radius').text(Math.round(radius));
  });
  
  
  $('.slider-attraction').on('input change ', function() {
    attraction = Cattr * $(this).val();
    game.setAttraction(attraction);
    $('#attraction').text(parseFloat(attraction).toFixed(3));
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
  
  
  var paint = true;
  var drag = false;
  $('#overlay').mousedown(function(e) {
    var pos = game.getCellPos(getMousePos(e, canvas));
    console.log(pos);
    paint = 1 - game.getCell(pos);
    game.setCell(pos, paint);
    pos.x += 1;
    game.setCell(pos, paint);
    pos.y += 1;
    game.setCell(pos, paint);
    pos.x -= 1;
    game.setCell(pos, paint);
    //game.render(canvas);
    
    $(this).bind('mousemove', function(e) {
      var pos = game.getCellPos(getMousePos(e, canvas));
      game.setCell(pos, paint);
      pos.x += 1;
      game.setCell(pos, paint);
      pos.y += 1;
      game.setCell(pos, paint);
      pos.x -= 1;
      game.setCell(pos, paint);
      //game.render(canvas);
    });
  });
  
  
  $('#overlay').mouseup(function(e) {
    $(this).unbind('mousemove');
  });
  
  
  $('#overlay').mouseout(function(e) {
    $(this).unbind('mousemove');
  });
  
});
