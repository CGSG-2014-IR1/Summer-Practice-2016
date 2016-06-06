function LoadShaderText( Id )
{
  var str = "";
  var client = new XMLHttpRequest();
  client.open('GET', Id, false);
  client.onreadystatechange = function() {
    str = client.responseText;
  }
  client.send();

  return str;
}

function shader()
{
  this.CreateCubeMapShader = function( CubeMap )
  {
    this.Shader = THREE.ShaderLib["cube"];
    this.Shader.uniforms["tCube"].value = CubeMap.Tex;
  }
}