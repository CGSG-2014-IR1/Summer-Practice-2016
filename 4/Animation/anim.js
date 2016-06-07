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

    this.ReflectionCamera = new THREE.CubeCamera(0.1, 1000, 512);

    this.Controls = new THREE.OrbitControls(this.Camera);

    this.Stats = new Stats();
    this.Stats.showPanel(0);
    document.body.appendChild(this.Stats.dom);

    this.gui = new DAT.GUI({height: 3 * 32 - 1});
    var self = this;
    this.gui.add({pause: function(){ self.Timer.TogglePause() }}, 'pause').name('Stop/run');
  }

  this.RenderReflection = function( Mesh )
  {
    Mesh.visible = false;
    this.ReflectionCamera.position.copy(Mesh.position);
    this.ReflectionCamera.updateCubeMap(this.Render.Renderer, this.Scene);

    Mesh.visible = true;
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
    this.Stats.begin();
    this.Controls.update(this.Timer.GlobalDeltaTime);
    var self = this;

    this.Units.forEach(function(Unit)
      {
        Unit.Response(self);
      }
    );

    this.Units.forEach(function(Unit)
      {
        Unit.Render(self);
      }
    );
    this.Render.Renderer.render(this.Scene, this.Camera);

    var self = this;
    window.requestAnimationFrame(function()
    {
      self.DrawAll();
    });
    this.Stats.end();
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
