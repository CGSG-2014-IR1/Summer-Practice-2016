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

void main()
{
  vec3 dir = normalize(Pos - CameraPos);

  vec4 refl = textureCube(TextureReflection, reflect(-dir, Norm));
  vec4 refr = textureCube(TextureReflection, refract(dir, Norm, n1 / RefractionCoefficient));
  gl_FragColor = mix(refl, refr, Fresnel(dir, Norm));
}
