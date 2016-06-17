function render()
{
  this.InitGL = function()
  {
    this.Renderer = new THREE.WebGLRenderer();
    var col = new THREE.Color(0.6, 0.1, 0.1);
    this.Renderer.setClearColor(col, 1);
    this.Renderer.setSize(window.innerWidth, window.innerHeight);
    this.Renderer.shadowMap.enabled = true;
  }

  this.Init = function()
  {
    this.InitGL();
  }
}