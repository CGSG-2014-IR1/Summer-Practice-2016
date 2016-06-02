function CreateQuad( Context, P0, P1, P2, P3, Color )
{
  var verts =
    [ P0.X, P0.Y, P0.Z,
      P1.X, P1.Y, P1.Z,
      P3.X, P3.Y, P3.Z,
      P1.X, P1.Y, P1.Z,
      P2.X, P2.Y, P2.Z,
      P3.X, P3.Y, P3.Z ];

  var res = new prim;
  res.Create(Context, verts, null);

  return res;
}