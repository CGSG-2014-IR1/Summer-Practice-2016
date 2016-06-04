function anim()
{
  this.Units = [];
  this.Render = new render();
  this.Mouse = new mouse();
  this.World = mat4.create();
  this.Timer = new timer();
  mat4.identity(this.World);

  this.Init = function( CanvasName )
  {
    this.Render.Init(CanvasName);
    this.Mouse.Init(CanvasName);
    this.Timer.Init();
    this.Camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.Scene = new THREE.Scene();
    this.Camera.position.x = 1;
    this.Camera.position.y = 1;
    this.Camera.position.z = 1;
    this.Camera.lookAt(this.Scene.position);
  }

  this.Run = function( CanvasName )
  {
    $("#webg_holder").append(this.Render.Renderer.domElement);
    this.DrawAll();
  }

  this.UnitAdd = function( Unit )
  {
    this.Units.push(Unit);
    this.Units[this.Units.length - 1].Init(this);
  }

  this.DrawAll = function()
  {
    this.Timer.Update();
    for (var i = 0; i < this.Units.length; i++)
      this.Units[i].Response(this);

    this.Render.Renderer.render(this.Scene, this.Camera);

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

  this.AddPrimitive = function( Prim )
  {
    this.Scene.add(Prim.Mesh);
    return this;
  }

  this.AddLight = function( Light )
  {
    this.Scene.add(Light);
    return this;
  }
}
