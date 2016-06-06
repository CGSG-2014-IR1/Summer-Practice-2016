function framebuffer( Context, Width, Height )
{
  this.Context = Context;
  this.Buffer = Context.createFramebuffer();
  Context.bindFramebuffer(Context.FRAMEBUFFER, this.Buffer);
  this.Buffer.width = Width;
  this.Buffer.height = Height;

  this.Texture = Context.createTexture();
  Context.bindTexture(Context.TEXTURE_2D, this.Texture);
  Context.texParameteri(Context.TEXTURE_2D, Context.TEXTURE_MAG_FILTER, Context.LINEAR);
  Context.texParameteri(Context.TEXTURE_2D, Context.TEXTURE_MIN_FILTER, Context.LINEAR);
  Context.texImage2D(Context.TEXTURE_2D, 0, Context.RGBA,
    this.Buffer.width, this.Buffer.height, 0, Context.RGBA, Context.UNSIGNED_BYTE, null);
  //Context.generateMipmap(Context.TEXTURE_2D);

  this.RenderBuffer = Context.createRenderbuffer();
  Context.bindRenderbuffer(Context.RENDERBUFFER, this.RenderBuffer);
  Context.renderbufferStorage(Context.RENDERBUFFER, Context.DEPTH_COMPONENT16,
    this.Buffer.width, this.Buffer.height);

  Context.framebufferTexture2D(Context.FRAMEBUFFER, Context.COLOR_ATTACHMENT0, Context.TEXTURE_2D, this.Texture, 0);
  Context.framebufferRenderbuffer(Context.FRAMEBUFFER, Context.DEPTH_ATTACHMENT, Context.RENDERBUFFER, this.RenderBuffer);

  Context.bindTexture(Context.TEXTURE_2D, null);
  Context.bindRenderbuffer(Context.RENDERBUFFER, null);
  Context.bindFramebuffer(Context.FRAMEBUFFER, null);

  this.Bind = function()
  {
    this.OWidth = this.Context.viewportWidth;
    this.OHeight = this.Context.viewportHeight;
    this.Context.bindFramebuffer(this.Context.FRAMEBUFFER, this.Buffer);
    this.Context.clear(this.Context.COLOR_BUFFER_BIT | this.Context.DEPTH_BUFFER_BIT);
    this.Context.viewport(0, 0, this.Buffer.width, this.Buffer.height);
  }

  this.UnBind = function()
  {
    this.Context.bindFramebuffer(this.Context.FRAMEBUFFER, null);
    this.Context.viewport(0, 0, this.OWidth, this.OHeight);
  }
}
