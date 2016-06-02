function mouse()
{
  this.GetMousePos = function( evt )
  {
    var rect = this.Canvas.getBoundingClientRect();
    var coord = new uv();
    coord.Set(
      (evt.clientX - rect.left) / (rect.right - rect.left) * this.Canvas.width,
      (evt.clientY - rect.top) / (rect.bottom - rect.top) * this.Canvas.height);
    return coord;
  }

  this.Abs2Rel = function ( Abs )
  {
    var ret = Abs;
    ret.X = ret.X / this.Canvas.width;
    ret.Y = ret.Y / this.Canvas.height * -1.0;
    return ret;
  }

  this.Init = function( CanvasId )
  {
    this.Canvas = document.getElementById(CanvasId);

    this.Pos = new uv();
    this.DownPos = new uv();
    this.Down = false;
    this.UpPos = new uv();
    this.ClickPos = new uv();
    this.WheelPos = 0.0;

    var self = this;
    this.Canvas.addEventListener("mousemove", function(evt)
    {
      self.Pos = self.GetMousePos(evt);
    }, false);
    this.Canvas.addEventListener("mousedown", function(evt)
    {
      self.Down = true;
      self.DownPos = self.GetMousePos(evt);
    }, false);
    this.Canvas.addEventListener("mouseup", function(evt)
    {
      self.Down = false;
      self.UpPos = self.GetMousePos(evt);
    }, false);
    this.Canvas.addEventListener("click", function(evt)
    {
      self.ClickPos = self.GetMousePos(evt);
    }, false);
    this.Canvas.addEventListener("mousewheel", function(evt)
    {
      self.WheelPos += evt.wheelDelta;
    }, false);
  }
}
