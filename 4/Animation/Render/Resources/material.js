function material( Context )
{
  this.Textures = [];
  this.CreateCubeMapMaterial = function( Path, Format )
  {
    var ctex = new texture();
    ctex.CreateCubeMap(Path, Format);
    this.Textures.push(ctex);

    this.Shader = new shader();
    this.Shader.CreateCubeMapShader(this.Textures[0]);

    this.Mtl = new THREE.ShaderMaterial(
    {
      fragmentShader: this.Shader.Shader.fragmentShader,
      vertexShader: this.Shader.Shader.vertexShader,
      uniforms: this.Shader.Shader.uniforms,
      depthWrite: false,
      side: THREE.BackSide
    });
  }
}
