function material( Context )
{
  this.Textures = [];
  this.TexUniforms = [];
  this.Context = Context;

  this.SetShader = function( NShader )
  {
    this.Shader = NShader;
  }

  this.LoadShader = function( Context, ShaderName )
  {
    this.Shader = new shader(Context, ShaderName);
    this.Shader.Init();
  }

  this.Apply = function( Ani )
  {
    var Context = Ani.Render.Context;
    this.Shader.Apply(Context);
    for (var i = 0; i < this.Textures.length; i++)
    {
      this.Textures[i].Apply();
      Context.uniform1i(this.TexUniforms[i], this.Textures[i].Slot);
    }
    Ani.Render.AppliedShader = this.Shader;
  }

  this.AddTexture = function ( Tex )
  {
    this.Textures.push(Tex);
    this.TexUniforms.push(this.Context.getUniformLocation(this.Shader.Program, Tex.Name));
  }
}
