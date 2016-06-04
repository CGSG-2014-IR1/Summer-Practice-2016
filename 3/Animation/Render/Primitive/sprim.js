function CreateQuad( Context, P0, P1, P2, P3, Color )
{
  var poss =
    [ P0.X, P0.Y, P0.Z,
      P1.X, P1.Y, P1.Z,
      P3.X, P3.Y, P3.Z,
      P1.X, P1.Y, P1.Z,
      P2.X, P2.Y, P2.Z,
      P3.X, P3.Y, P3.Z ];
  var cols =
    [ Color.X, Color.Y, Color.Z,
      Color.X, Color.Y, Color.Z,
      Color.X, Color.Y, Color.Z,
      Color.X, Color.Y, Color.Z,
      Color.X, Color.Y, Color.Z,
      Color.X, Color.Y, Color.Z ];
  var texs =
    [ 0.0, 1.0,
      1.0, 1.0,
      0.0, 0.0,
      1.0, 1.0,
      1.0, 0.0,
      0.0, 0.0 ];

  var res = new prim;
  res.Create(Context, poss, null, texs, cols, null);

  return res;
}

function CreateBox( Context, D0, D1, Color )
{
  var poss =
    [
      // Bottom
      D0.X, D0.Y, D0.Z,
      D0.X, D0.Y, D1.Z,
      D1.X, D0.Y, D1.Z,
      D0.X, D0.Y, D0.Z,
      D1.X, D0.Y, D1.Z,
      D1.X, D0.Y, D0.Z,

      // Back
      D0.X, D0.Y, D1.Z,
      D0.X, D1.Y, D1.Z,
      D1.X, D1.Y, D1.Z,
      D0.X, D0.Y, D1.Z,
      D1.X, D1.Y, D1.Z,
      D1.X, D0.Y, D1.Z,

      // Top
      D0.X, D1.Y, D0.Z,
      D0.X, D1.Y, D1.Z,
      D1.X, D1.Y, D1.Z,
      D0.X, D1.Y, D0.Z,
      D1.X, D1.Y, D1.Z,
      D1.X, D1.Y, D0.Z,

      // Front
      D0.X, D0.Y, D0.Z,
      D0.X, D1.Y, D0.Z,
      D1.X, D1.Y, D0.Z,
      D0.X, D0.Y, D0.Z,
      D1.X, D1.Y, D0.Z,
      D1.X, D0.Y, D0.Z,

      // Right
      D1.X, D0.Y, D0.Z,
      D1.X, D1.Y, D0.Z,
      D1.X, D1.Y, D1.Z,
      D1.X, D0.Y, D0.Z,
      D1.X, D1.Y, D1.Z,
      D1.X, D0.Y, D1.Z,

      // Left
      D0.X, D0.Y, D0.Z,
      D0.X, D1.Y, D0.Z,
      D0.X, D1.Y, D1.Z,
      D0.X, D0.Y, D0.Z,
      D0.X, D1.Y, D1.Z,
      D0.X, D0.Y, D1.Z
    ];
  var cols = [];
  for (var i = 0; i < poss.length / 3; i++)
  {
    cols.push(Color.X);
    cols.push(Color.Y);
    cols.push(Color.Z);
  }
  var texs = [];
  for (var i = 0; i < poss.length / 3 / 6; i++)
  {
    texs.push(0.0);
    texs.push(0.0);
    texs.push(0.0);
    texs.push(1.0);
    texs.push(1.0);
    texs.push(1.0);
    texs.push(0.0);
    texs.push(0.0);
    texs.push(1.0);
    texs.push(1.0);
    texs.push(1.0);
    texs.push(0.0);
  }

  var res = new prim;
  res.Create(Context, poss, poss, texs, cols, null);

  return res;
}