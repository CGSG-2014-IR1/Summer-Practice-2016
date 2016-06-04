function texture( Context, Slot, Name )
{
  this.Slot = Slot;
  this.Tex = Context.createTexture();
  this.Tex.image = new Image();
  this.Context = Context;
  this.Name = Name;
  var self = this;

  this.HandleLoadedTexture = function()
  {
    this.Context.bindTexture(this.Context.TEXTURE_2D, this.Tex);
    this.Context.texImage2D(this.Context.TEXTURE_2D, 0, this.Context.RGBA, this.Context.RGBA,
      this.Context.UNSIGNED_BYTE, this.Tex.image);
    this.Context.generateMipmap(this.Context.TEXTURE_2D);
    this.Context.texParameteri(this.Context.TEXTURE_2D, this.Context.TEXTURE_MAG_FILTER, this.Context.LINEAR);
    this.Context.texParameteri(this.Context.TEXTURE_2D, this.Context.TEXTURE_MIN_FILTER, this.Context.LINEAR_MIPMAP_LINEAR);
    this.Context.bindTexture(this.Context.TEXTURE_2D, null);
  }

  this.Load = function( Path )
  {
    this.Tex.image.src = Path;
    this.Tex.image.onload = function ()
    {
      self.HandleLoadedTexture()
    }
  }

  this.SetTex = function( NewTex )
  {
    this.Tex = NewTex;
  }

  this.Apply = function()
  {
    this.Context.activeTexture(this.Context.TEXTURE0 + this.Slot);
    this.Context.bindTexture(this.Context.TEXTURE_2D, this.Tex);
  }
}
