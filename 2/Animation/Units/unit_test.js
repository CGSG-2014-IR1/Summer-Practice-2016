function unit_test()
{
  this.Init = function( Ani )
  {
    var p0 = new vec(), p1 = new vec(), p2 = new vec(), p3 = new vec();
    p0.Set(0.25, 0.25, 0);
    p1.Set(0.75, 0.25, 0);
    p2.Set(0.75, 0.75, 0);
    p3.Set(0.25, 0.75, 0);
    this.QuadPrim = CreateQuad(Ani.Render.Context, p0, p1, p2, p3, new vec());
    var Mtl = new material();
    Mtl.LoadShader(Ani.Render.Context, "simple");
    this.QuadPrim.Material = Mtl;
  }

  this.Render = function( Ani )
  {
    this.QuadPrim.Draw(Ani.Render.Context);
  }

  this.Response = function( Ani )
  {
  }
}
