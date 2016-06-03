precision highp float;

uniform float Iterations;
uniform float Threshold;
uniform vec2 Shift;

uniform float WinW;
uniform float WinH;

uniform float L;
uniform float R;
uniform float T;
uniform float B;

uniform sampler2D Gradient;

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

  coor = coor * vec2(2, 2) - vec2(1, 1);
  coor.y *= -1.0;

  coor.x *= (R - L) / 2.0;
  coor.x -= (R - L) / 2.0 - R;
  coor.y *= (T - B) / 2.0;
  coor.y -= (T - B) / 2.0 - T;

  complex C;
  C.Re = coor.x + Shift.x;
  C.Im = coor.y + Shift.y;
  complex Z;
  Z.Re = C.Re;
  Z.Im = C.Im;

  const int IterationsMax = 128;
  int cnt;
  bool ok = false;
  int brk = -1;
  complex z1;
  z1.Im = 0.32;
  z1.Re = 0.37;
  for (int i = 0; i < IterationsMax; i++)
  {
    if (cnt < int(Iterations))
      Z = Add(Mul(Z, Z), C);
    else
      if (AbsSquare(Z) < Threshold)
        ok = true;

    if (AbsSquare(Z) >= Threshold && brk == -1)
      brk = i;

    cnt++;
  }

  if (ok)
    gl_FragColor = vec4(vec3(0.6, 0.1, 0.1) * (Threshold - AbsSquare(Z)), 1);
  else
  {
    float col = (float(brk) / float(IterationsMax));
    gl_FragColor = texture2D(Gradient, vec2(col, coor.y));
  }
}