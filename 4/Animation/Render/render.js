function render()
{
  this.InitGL = function()
  {
    this.Renderer = new THREE.WebGLRenderer();
    var col = new THREE.Color(0.6, 0.1, 0.1);
    this.Renderer.setClearColor(col, 1);
    this.Renderer.setSize(window.innerWidth, window.innerHeight);
    this.Renderer.shadowMap.enabled = true;

    this.RefractionRender = new THREE.WebGLRenderTarget(512, 512);
  }

  this.Init = function( CanvasName )
  {
    this.InitGL();
  }
}