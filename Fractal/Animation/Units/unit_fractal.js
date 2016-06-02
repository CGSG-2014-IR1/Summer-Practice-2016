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
    this.ShiftUniform = Ani.Render.Context.getUniformLocation(Mtl.Shader.Program, "Shift");

    this.WinWUniform = Ani.Render.Context.getUniformLocation(Mtl.Shader.Program, "WinW");
    this.WinHUniform = Ani.Render.Context.getUniformLocation(Mtl.Shader.Program, "WinH");

    this.LUniform = Ani.Render.Context.getUniformLocation(Mtl.Shader.Program, "L");
    this.RUniform = Ani.Render.Context.getUniformLocation(Mtl.Shader.Program, "R");
    this.TUniform = Ani.Render.Context.getUniformLocation(Mtl.Shader.Program, "T");
    this.BUniform = Ani.Render.Context.getUniformLocation(Mtl.Shader.Program, "B");

    this.ShiftB = new uv();
    this.ShiftB.Set(0.0, 0.0);
    this.ShiftD = new uv();
    this.ShiftD.Set(0.0, 0.0);
    this.PrevDown = new uv();
    this.PrevDown.Set(-1.0, -1.0);
  }

  this.Render = function( Ani )
  {
    this.QuadPrim.Material.Apply(Ani.Render.Context);
    Ani.Render.Context.uniform1f(this.IterationsUniform, document.getElementById("fractal_iterations").value);
    Ani.Render.Context.uniform1f(this.ThresholdUniform, document.getElementById("fractal_threshold").value);

    Ani.Render.Context.uniform1f(this.WinWUniform, Ani.Render.Canvas.width);
    Ani.Render.Context.uniform1f(this.WinHUniform, Ani.Render.Canvas.height);

    Ani.Render.Context.uniform1f(this.LUniform, -1);
    Ani.Render.Context.uniform1f(this.RUniform, 1);
    Ani.Render.Context.uniform1f(this.BUniform, -1);
    Ani.Render.Context.uniform1f(this.TUniform, 1);

    var Shift = new uv();
    Shift = this.ShiftD.Addition(this.ShiftB);
    Ani.Render.Context.uniform2f(this.ShiftUniform, Shift.X, Shift.Y);

    this.QuadPrim.Draw(Ani.Render.Context);
  }

  this.Response = function( Ani )
  {
    if (this.PrevDown.X == -1)
      if (!Ani.Mouse.Down)
        return;
      else
        this.PrevDown = Ani.Mouse.DownPos;
    if (this.PrevDown == Ani.Mouse.DownPos && Ani.Mouse.Down)
      this.ShiftD = Ani.Mouse.Abs2Rel(this.PrevDown.Subtraction(Ani.Mouse.Pos));
    else
      if (!Ani.Mouse.Down)
      {
        var com = new uv();
        com.Set(0.0, 0.0);
        if (this.ShiftD != com)
        {
          this.ShiftB = this.ShiftB.Addition(this.ShiftD);
          this.ShiftD.Set(0, 0);
        }
      }
      else
        this.PrevDown = Ani.Mouse.DownPos;
  }
}
