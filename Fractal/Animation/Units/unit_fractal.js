function unit_fractal()
{
  this.Init = function( Ani )
  {
    var p0 = new vec(), p1 = new vec(), p2 = new vec(), p3 = new vec();
    p0.Set(-1, -1, 0);
    p1.Set(-1,  1, 0);
    p2.Set( 1,  1, 0);
    p3.Set( 1, -1, 0);
    this.QuadPrim = CreateQuad(Ani.Render.Context, p0, p1, p2, p3, new vec());
    var Mtl = new material();
    Mtl.LoadShader(Ani.Render.Context, "mandelbrot");
    this.QuadPrim.Material = Mtl;

    this.ThresholdUniform = Ani.Render.Context.getUniformLocation(Mtl.Shader.Program, "Threshold");
    this.IterationsUniform = Ani.Render.Context.getUniformLocation(Mtl.Shader.Program, "Iterations");
  }

  this.Render = function( Ani )
  {
    this.QuadPrim.Material.Apply(Ani.Render.Context);
    Ani.Render.Context.uniform1f(this.IterationsUniform, document.getElementById("fractal_iterations").value);
    Ani.Render.Context.uniform1f(this.ThresholdUniform, document.getElementById("fractal_threshold").value);

    this.QuadPrim.Draw(Ani.Render.Context);
  }

  this.Response = function( Ani )
  {
  }
}
