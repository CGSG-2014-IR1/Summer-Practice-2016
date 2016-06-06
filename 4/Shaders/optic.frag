precision mediump float;

uniform samplerCube TextureReflection;
uniform sampler2D TextureRefraction;
uniform vec3 CameraPos;

varying vec3 Norm;
varying vec3 Pos;
varying vec2 PosS;

const float n1 = 1.0;
const float n2 = 1.4;

float Fresnel( vec3 Dir, vec3 Norm)
{

  float R0 = (n1 * n2) / (n1 + n2);
  R0 *= R0;

  return (1.0 - R0 - (1.0 - R0) * pow(1.0 - abs(dot(Dir, Norm)), 2.0));
}

void main()
{
  vec3 dir = normalize(Pos - CameraPos);

  vec4 refl = textureCube(TextureReflection, reflect(-dir, Norm));
  vec4 refr = textureCube(TextureReflection, refract(dir, Norm, 1.0 / 1.4));
  gl_FragColor = mix(refl, refr, Fresnel(dir, Norm));
}
