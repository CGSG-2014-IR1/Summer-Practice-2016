function render()
{
  this.InitGL = function()
  {
    try
    {
      this.Context = this.Canvas.getContext("experimental-webgl");
      this.Context.viewportWidth = this.Canvas.width;
      this.Context.viewportHeight = this.Canvas.height;
    } catch (error)
    {
      alert("FATAL ERROR: could not initialise WebGL.");
    }
    if (!this.Context) {
      alert("FATAL ERROR: could not initialise WebGL.");
    }
  }

  this.Init = function( CanvasName )
  {
    this.Canvas = document.getElementById(CanvasName);
    this.InitGL();
    this.AppliedShader = new shader(this.Context, "simple");
  }
}