function shader()
{
  this.CreateCubeMapShader = function( CubeMap )
  {
    this.Shader = THREE.ShaderLib["cube"];
    this.Shader.uniforms["tCube"].value = CubeMap.Tex;
  }
}