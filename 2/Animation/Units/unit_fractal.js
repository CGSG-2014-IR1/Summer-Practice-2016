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
    var mtl = new material(Ani.Render.Context);
    mtl.LoadShader(Ani.Render.Context, "mandelbrot");
    var tex = new texture(Ani.Render.Context, 0, "Gradient");
    tex.Load("Bin/Textures/gradient3.bmp");
    mtl.AddTexture(tex);
    this.QuadPrim.Material = mtl;

    this.ThresholdUniform = Ani.Render.Context.getUniformLocation(mtl.Shader.Program, "Threshold");
    this.IterationsUniform = Ani.Render.Context.getUniformLocation(mtl.Shader.Program, "Iterations");
    this.ShiftUniform = Ani.Render.Context.getUniformLocation(mtl.Shader.Program, "Shift");

    this.WinWUniform = Ani.Render.Context.getUniformLocation(mtl.Shader.Program, "WinW");
    this.WinHUniform = Ani.Render.Context.getUniformLocation(mtl.Shader.Program, "WinH");

    this.LUniform = Ani.Render.Context.getUniformLocation(mtl.Shader.Program, "L");
    this.RUniform = Ani.Render.Context.getUniformLocation(mtl.Shader.Program, "R");
    this.TUniform = Ani.Render.Context.getUniformLocation(mtl.Shader.Program, "T");
    this.BUniform = Ani.Render.Context.getUniformLocation(mtl.Shader.Program, "B");

    this.ShiftB = new uv();
    this.ShiftB.Set(0.0, 0.0);
    this.ShiftD = new uv();
    this.ShiftD.Set(0.0, 0.0);
    this.PrevDown = new uv();
    this.PrevDown.Set(-1.0, -1.0);

    this.PrevWheel = 0;
    this.W = this.H = 2;
    this.L = this.B = -1;
    this.R = this.T = 1;
    this.Scale = 1;
  }

  this.Render = function( Ani )
  {
    this.QuadPrim.Material.Apply(Ani.Render.Context);
    Ani.Render.Context.uniform1f(this.IterationsUniform, document.getElementById("fractal_iterations").value);
    Ani.Render.Context.uniform1f(this.ThresholdUniform, document.getElementById("fractal_threshold").value);

    Ani.Render.Context.uniform1f(this.WinWUniform, Ani.Render.Canvas.width);
    Ani.Render.Context.uniform1f(this.WinHUniform, Ani.Render.Canvas.height);

    Ani.Render.Context.uniform1f(this.LUniform, this.L);
    Ani.Render.Context.uniform1f(this.RUniform, this.R);
    Ani.Render.Context.uniform1f(this.BUniform, this.B);
    Ani.Render.Context.uniform1f(this.TUniform, this.T);

    var Shift = new uv();
    Shift = this.ShiftD.Addition(this.ShiftB);
    Ani.Render.Context.uniform2f(this.ShiftUniform, Shift.X, Shift.Y);

    this.QuadPrim.Draw(Ani.Render.Context);
  }

  this.Response = function( Ani )
  {
    // Zoom
    var scale = (Ani.Mouse.WheelPos - this.PrevWheel) / 1920.0 + 1.0;
    this.Scale *= scale;
    if (scale != 1.0)
    {
      var mrel = (Ani.Mouse.Pos);
      var fx = (mrel.X / Ani.Render.Canvas.width);
      var fy = (mrel.Y / Ani.Render.Canvas.height);
      this.L = this.L + fx * this.W * (1 - scale);
      this.R = this.L + this.W * scale;
      this.B = this.B + fy * this.H * (1 - scale);
      this.T = this.B + this.H * scale;
      this.W *= scale;
      this.H *= scale;

      this.PrevWheel = Ani.Mouse.WheelPos;
    }

    // Drag
    if (this.PrevDown.X == -1)
      if (!Ani.Mouse.Down)
        return;
      else
        this.PrevDown = Ani.Mouse.DownPos;
    if (this.PrevDown == Ani.Mouse.DownPos && Ani.Mouse.Down)
      this.ShiftD = Ani.Mouse.Abs2Rel(this.PrevDown.Subtraction(Ani.Mouse.Pos)).MulNum(2.0 * this.Scale);
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
