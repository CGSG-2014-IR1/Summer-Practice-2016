function anim()
{
  this.Units = [];
  this.Render = new render();
  this.Mouse = new mouse();

  this.Init = function( CanvasName )
  {
    this.Render.Init(CanvasName);
    this.Mouse.Init(CanvasName);
  }

  this.Run = function( CanvasName )
  {
    this.DrawAll();
  }

  this.UnitAdd = function( Unit )
  {
    this.Units.push(Unit);
    this.Units[this.Units.length - 1].Init(this);
  }

  this.DrawAll = function()
  {
    for (var i = 0; i < this.Units.length; i++)
      this.Units[i].Response(this);

    for (var i = 0; i < this.Units.length; i++)
      this.Units[i].Render(this);

    var self = this;
    window.requestAnimationFrame(function() {
      self.DrawAll();
    });
  }
}
