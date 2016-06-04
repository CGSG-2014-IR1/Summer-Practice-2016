#version 100

attribute vec3 VertexPosition;
attribute vec3 VertexNormal;
attribute vec2 VertexTexture;
attribute vec3 VertexColor;

varying vec3 Pos;
varying vec3 Norm;
varying vec2 Tex;
varying vec3 Col;

uniform mat4 World;
uniform mat4 VP;
uniform mat4 Proj;
uniform mat4 View;

void main()
{
  gl_Position = VP * vec4(VertexPosition, 1.0);

  Pos = VertexPosition;
  Norm = VertexNormal;
  Tex = VertexTexture;
  Col = VertexColor;
}
