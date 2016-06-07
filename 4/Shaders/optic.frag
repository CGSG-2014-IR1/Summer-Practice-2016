precision mediump float;

uniform samplerCube TextureReflection;
uniform vec3 CameraPos;
uniform float RefractionCoefficient;


varying vec3 Norm;
varying vec3 Pos;
varying vec2 PosS;

float n1 = 1.0;

float Fresnel( vec3 Dir, vec3 Norm)
{
  float R0 = (n1 - RefractionCoefficient) / (n1 + RefractionCoefficient);
  R0 *= R0;

  return (1.0 - R0 - (1.0 - R0) * pow(1.0 - abs(dot(Dir, Norm)), 2.0));
}

float rand( vec2 co )
{
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 noise( vec3 v )
{
  return vec3(rand(v.yz), rand(v.xz), rand(v.xy));
}

void main()
{
  vec3 dir = normalize(Pos - CameraPos);
  vec3 dnorm = Norm;
  dnorm += noise(Pos * Norm) * 0.05;

  vec4 refl = textureCube(TextureReflection, reflect(-dir, dnorm));
  vec4 refr = textureCube(TextureReflection, refract(dir, dnorm, n1 / RefractionCoefficient));
  gl_FragColor = mix(refl, refr, Fresnel(dir, dnorm));
}
