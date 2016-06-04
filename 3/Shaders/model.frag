precision mediump float;

varying vec3 Pos;
varying vec3 Norm;
varying vec2 Tex;
varying vec3 Col;

uniform sampler2D Gradient;

void main()
{
  gl_FragColor = texture2D(Gradient, Tex);
   //vec4(Pos, 1);//texture2D(Gradient, Tex);
}
