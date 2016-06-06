precision mediump float;

uniform samplerCube TextureReflection;
uniform sampler2D TextureRefraction;
uniform vec3 CameraPos;

varying vec3 Norm;
varying vec3 Pos;
varying vec2 PosS;

float Fresnel( vec3 Dir, vec3 Norm)
{
  return abs(dot(Norm, Dir));
}

void main()
{
  vec3 dir = normalize(Pos - CameraPos);

  vec4 refl = textureCube(TextureReflection, reflect(-dir, Norm));
  vec4 refr = texture2D(TextureRefraction, PosS + Norm.xz * 0.05);
  gl_FragColor = mix(refl, refr, Fresnel(dir, Norm));
}
