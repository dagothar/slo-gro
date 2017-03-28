var Slogro = (function() {
  
  function Slogro(canvas, overlay, radius) {
    
    /* setup */
    var canvas = canvas;
    var overlay = overlay;
    var ctx = canvas.getContext('2d');
    var ctx1 = overlay.getContext('2d');
    var width = canvas.width, height = canvas.height;
    var cx = width/2, cy = height/2;
    var radius = radius, radius2 = radius*radius;
    var data = new Array2(width, height, 0);
    data.set(width/2, height/2, 1);
    var attraction = 0.0;
    var x = 0, y = 0; // wanderer position
    var tried = 0;
    var settled = 0;
    
    
    this.Colors = {
      0: 'rgb(255, 255, 255)',   // background
      1: 'rgb(0, 255, 0)',      // tree
      2: 'rgb(255, 0, 0)'   // trail
    };
    
    
    this.getRadius = function() { return radius; };
    
    
    this.setRadius = function(r) {
      radius = r; radius2 = r*r;
      
      /* draw circle */
      ctx1.clearRect(0, 0, width, height);
      ctx1.beginPath();
      ctx1.strokeStyle = this.Colors[1];
      ctx1.arc(width/2, height/2, radius, 0, 2 * Math.PI);
      ctx1.stroke();
    };
    
    
    this.getAttraction = function() { return attraction; };
    this.setAttraction = function(a) { attraction = a; };
    this.setColor = function(n, color) { this.Colors[n] = color; };
    this.getTried = function() { return tried; };
    this.getSettled = function() { return settled; };
    
    
    var neighbourhood = [
      [ -1, -1 ], [ 0, -1 ], [ 1, -1 ],
      [ -1, 0 ],             [ 1, 0 ],
      [ -1, 1 ],  [ 0, 1 ],  [ 1, 1 ]
    ];
    
    
    function isNeighbourSettled(m, n) {
      for (var i = 0; i < neighbourhood.length; ++i) {
        if (data.get(m+neighbourhood[i][0], n+neighbourhood[i][1]) == 1) return true;
      }
      
      return false;
    };
    
    
    this.step = function(canvas) {
      /* calculate displacement */
      var theta = 2 * Math.PI * Math.random();
      var dx = Math.sin(theta); // (0.5+0.5*Math.random()) * Math.sin(theta);
      var dy = Math.cos(theta); // (0.5+0.5*Math.random()) * Math.cos(theta);
      
      /* add attraction towards center */
      theta = Math.atan2(y-cy, x-cx);
      dx += -attraction * Math.cos(theta);
      dy += -attraction * Math.sin(theta);
      
      /* calculate new coordinates */
      x += dx;
      y += dy;
      
      //console.log(x, y, radius);
      
      /* check if coordinates exceed the circle size */
      var rx = (x - cx), ry = (y - cy);
      if (rx*rx + ry*ry > radius2) return -1;
      
      var Dx = Math.floor(x);
      var Dy = Math.floor(y);
      
      /* check if coordinates exceed the board size */
      //if (Dx < 0 || Dy < 0 || Dx >= width || Dy >= height) return -1;
      
      /* check if this pixel is settled */
      if (data.get(Dx, Dy) == 1) {
        return -1;
      }
      
      /* check if any neighbouring pixel is settled */
      if (isNeighbourSettled(Dx, Dy)) {
        data.set(Dx, Dy, 1);    // add tree part
        ctx.fillStyle =  this.Colors[1];
        ctx.fillRect(Dx, Dy, 1, 1);
        ++settled;
        return 1;
      } else {      
        //data.set(Dx, Dy, 2);    // add trail
        ctx.fillStyle =  this.Colors[2];
        ctx.fillRect(Dx, Dy, 1, 1);
        return 0;
      }
    };
    
    
    this.addParticle = function() {
      /* place particle randomly around the circle */
      var theta = 2 * Math.PI * Math.random();
      x = cx + radius * Math.sin(theta);
      y = cy + radius * Math.cos(theta);
      
      //console.log(x, y, theta);
      ++tried;
      
      var status = 0;
      var iter = 0;
      do {
        status = this.step();
        if (iter > 10000) status = -1;
      } while (status == 0);
      
      /* draw circle */
      ctx1.clearRect(0, 0, width, height);
      ctx1.beginPath();
      ctx1.strokeStyle = this.Colors[1];
      ctx1.arc(width/2, height/2, radius, 0, 2 * Math.PI);
      ctx1.stroke();
    };
    
    
    this.render = function(canvas) {
      
      /* draw cells */
      for (var x = 0; x < width; ++x) { 
        for (var y = 0; y < height; ++y) {
          ctx.fillStyle =  this.Colors[data.get(x, y)];
          ctx.fillRect(x, y, 1, 1);
        }
      }
      
      /* draw circle */
      ctx1.clearRect(0, 0, width, height);
      ctx1.beginPath();
      ctx1.strokeStyle = this.Colors[1];
      ctx1.arc(width/2, height/2, radius, 0, 2 * Math.PI);
      ctx1.stroke();
    };
    
    
    this.getCell = function(pos) {
      return data.get(pos.x, pos.y);
    };
    
    
    this.setCell = function(pos, value) {
      data.set(pos.x, pos.y, value);
    };
  };
  
  
  return Slogro;
} ());
