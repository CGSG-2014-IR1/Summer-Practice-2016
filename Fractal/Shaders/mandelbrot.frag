precision mediump float;

uniform float Iterations;
uniform float Threshold;
uniform vec2 Shift;

uniform float WinW;
uniform float WinH;

uniform float L;
uniform float R;
uniform float T;
uniform float B;

struct complex
{
  float Re, Im;
};

complex Add( complex a, complex b )
{
  complex res;
  res.Re = a.Re + b.Re;
  res.Im = a.Im + b.Im;
  return res;
}

complex Mul( complex a, complex b )
{
  complex res;
  res.Re = (a.Re * b.Re - a.Im * b.Im);
  res.Im = (a.Im * b.Re + a.Re * b.Im);
  return res;
}

float AbsSquare( complex z )
{
  return z.Re * z.Re + z.Im * z.Im;
}

void main( void )
{
  float W = WinW;
  float H = WinH;
  vec2 coor;
  coor.x = gl_FragCoord.x / W;
  coor.y = gl_FragCoord.y / H;

  coor = coor * vec2(R - L, T - B) - vec2(1, 1);

  complex C;
  C.Re = coor.x + Shift.x;
  C.Im = coor.y + Shift.y;
  complex Z;
  Z.Re = 0.0;
  Z.Im = 0.0;

  const int IterationsMax = 128;
  int cnt;
  bool flag = false;
  for (int i = 0; i < IterationsMax; i++)
  {
    if (cnt < int(Iterations))
      Z = Add(Mul(Z, Z), C);
    else
      if (AbsSquare(Z) < Threshold)
        flag = true;

    cnt++;
  }

  if (flag)
    gl_FragColor = vec4(0, 0, 0, 1);
  else
    gl_FragColor = vec4(0.6, 0.1, 0.1, 1);
}