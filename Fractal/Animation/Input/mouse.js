function mouse()
{
  this.Pos = new uv();
  this.ClickPos = new uv();

  this.GetMousePos = function( canvas, evt )
  {
    var rect = canvas.getBoundingClientRect();
    var coord = new uv();
    coord.Set(
      (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
      (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height);
    return coord;
  }

  this.Init = function( CanvasId )
  {
    var canvas = document.getElementById(CanvasId);
    var context = canvas.getContext('2d');

    var self = this;
    canvas.addEventListener('mousemove', function(evt)
    {
      self.Pos = self.GetMousePos(canvas, evt);
    }, false);
    canvas.addEventListener('mouseclick', function(evt)
    {
      self.Pos = self.GetMousePos(canvas, evt);
    }, false);
  }
}
