var Slogro = (function() {
  
  function Slogro(width, height) {
    
    var width = width, height = height;
    var data = new Array2(width, height, 0);
    var pos = { x: Math.floor(width/2), y: Math.floor(height/3) };
    var dir = 0;
    
    this.Colors = {
      0: '#ffffff',
      1: '#000000',
      2: '#ff0000'
    };
    
    this.clear = function(canvas) {
      data.apply(function(i, j, v) {
        return 0;
      });
    };
    
    this.step = function() {
      
    };
    
    
    this.render = function(canvas) {
      
      var dx = 1;
      var dy = 1;
      var ctx = canvas.getContext('2d');
      
      for (var x = x1; x <= x2; ++x) { 
        for (var y = y1; y <= y2; ++y) {
          ctx.fillStyle =  this.Colors[data.get(x, y)];
          ctx.fillRect(x * dx, y * dy, dx, dy);
        }
      }
      
      ctx.fillStyle =  this.Colors[2];
      ctx.fillRect(pos.x * dx, pos.y * dy, dx, dy);
    };
    
    
    this.getCellPos = function(canvas, mousePos) {
      
      return {
        x: Math.floor(mousePos.x),
        y: Math.floor(mousePos.y)
      };
    };
    

    this.getCell = function(pos) {
      return data.get(pos.x, pos.y) == 1;
    };
    
    
    this.setCell = function(pos, value) {
      data.set(pos.x, pos.y, value ? 1 : 0);
    };
  };
  
  
  return Slogro;
} ());
