function anim()
{
  this.Units = [];
  this.Render = new render();
  this.Mouse = new mouse();
  this.Camera = new camera();
  this.World = mat4.create();
  mat4.identity(this.World);

  this.Init = function( CanvasName )
  {
    this.Render.Init(CanvasName);
    this.Mouse.Init(CanvasName);
    this.Camera.Init(this);
    this.Camera.Set(new vec().Set(3, 3, 3), new vec().Set(0.0, 0.0, 0.0));

    this.Render.Context.disable(this.Render.Context.CULL_FACE);
    this.Render.Context.enable(this.Render.Context.DEPTH_TEST);
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
    this.Render.Context.clear(this.Render.Context.COLOR_BUFFER_BIT | this.Render.Context.DEPTH_BUFFER_BIT);

    for (var i = 0; i < this.Units.length; i++)
      this.Units[i].Response(this);

    for (var i = 0; i < this.Units.length; i++)
      this.Units[i].Render(this);

    var self = this;
    window.requestAnimationFrame(function() {
      self.DrawAll();
    });
  }

  this.ApplyMatrixes = function()
  {
    this.Render.Context.uniformMatrix4fv(this.Render.Context.
      getUniformLocation(this.Render.AppliedShader.Program, "World"), false, this.World);
    this.Render.Context.uniformMatrix4fv(this.Render.Context.
      getUniformLocation(this.Render.AppliedShader.Program, "View"), false, this.Camera.MatrixView);
    this.Render.Context.uniformMatrix4fv(this.Render.Context.
      getUniformLocation(this.Render.AppliedShader.Program, "Proj"), false, this.Camera.MatrixProjection);
    var m = mat4.create();
    mat4.transpose(this.Camera.MatrixViewProjection, m);
    this.Render.Context.uniformMatrix4fv(this.Render.Context.
      getUniformLocation(this.Render.AppliedShader.Program, "VP"), false, this.Camera.MatrixViewProjection);
  }
}
