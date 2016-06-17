function anim()
{
  this.Units = [];                                                                                     // Units stock
  this.Render = new render();                                                                          // Scene renderer
  this.Timer = new timer();                                                                            // Scene timer

  /**
   * Initialize animation.
   */
  this.Init = function()
  {
    var self = this;
    this.Render.Init();
    this.Timer.Init();
    this.Camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);  // Main scene camera

    this.Scene = new THREE.Scene();                                                                    // Main scene
    this.Camera.position.x = 1;
    this.Camera.position.y = 1;
    this.Camera.position.z = 1;
    this.Camera.lookAt(this.Scene.position);

    this.ReflectionCamera = new THREE.CubeCamera(0.01, 1000, 512);                                     // Cubemap camera
    this.ReflectionCamera.position.set(0, 0, 0);

    this.Controls = new THREE.OrbitControls(this.Camera);                                              // Scene controls

    this.Stats = new Stats();                                                                          // FPS counter
    this.Stats.showPanel(0);
    document.body.appendChild(this.Stats.dom);

    this.gui = new DAT.GUI({height: 3 * 32 - 1});                                                      // height = NumberOfRows * 32 - 1. Yes, I correct it by hands every time.
    this.gui.add({pause: function(){ self.Timer.TogglePause() }}, 'pause').name('Stop/run');
  }

  /**
   * Start animation cycle.
   * @param DivID - ID of WebGL holder.
   */
  this.Run = function( DivID )
  {
    $("#" + DivID).append(this.Render.Renderer.domElement);
    this.DrawAll();
  }

  /**
   * Add unit to animation.
   * @param Unit - unit to add.
   */
  this.UnitAdd = function( Unit )
  {
    this.Units.push(Unit);
    this.Units[this.Units.length - 1].Init(this);
  }

  /**
   * Render scene.
   */
  this.DrawAll = function()
  {
    this.Timer.Update();
    this.Controls.update(this.Timer.GlobalDeltaTime);
    this.Stats.begin();
    var self = this;

    // Response
    this.Units.forEach(function(Unit)
      {
        Unit.Response(self);
      }
    );

    // Units render. Seems useless again.
    this.Units.forEach(function(Unit)
      {
        Unit.Render(self);
      }
    );
    // Reflection render
    this.ReflectionCamera.updateCubeMap(this.Render.Renderer, this.Scene);
    // Scene render
    this.Render.Renderer.render(this.Scene, this.Camera);

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
