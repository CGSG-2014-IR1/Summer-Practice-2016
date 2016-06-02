function material()
{
  this.SetShader = function( NShader )
  {
    this.Shader = NShader;
  }

  this.LoadShader = function( Context, ShaderName )
  {
    this.Shader = new shader(Context, ShaderName);
    this.Shader.Init();
  }

  this.Apply = function( Context )
  {
    this.Shader.Apply(Context);
  }
}
