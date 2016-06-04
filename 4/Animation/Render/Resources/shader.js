function shader( Context, Name )
{
  this.GetShader = function( Context, Id, Ext )
  {
    var str = "";
    var client = new XMLHttpRequest();
    client.open('GET', Id + Ext, false);
    client.onreadystatechange = function() {
      str = client.responseText;
    }
    client.send();

    var Shader;
    if (Ext == ".frag")
      Shader = Context.createShader(Context.FRAGMENT_SHADER);
    else if (Ext == ".vert")
      Shader = Context.createShader(Context.VERTEX_SHADER);
    else
      return null;

    Context.shaderSource(Shader, str);
    Context.compileShader(Shader);

    if (!Context.getShaderParameter(Shader, Context.COMPILE_STATUS))
    {
      alert(Context.getShaderInfoLog(Shader));
      return null;
    }

    return Shader;
  }

  this.Init = function()
  {
    this.FragmentShader = this.GetShader(Context, "shaders/" + Name, ".frag");
    this.VertexShader = this.GetShader(Context, "shaders/" + Name, ".vert");

    this.Program = Context.createProgram();
    Context.attachShader(this.Program, this.VertexShader);
    Context.attachShader(this.Program, this.FragmentShader);
    Context.linkProgram(this.Program);

    if (!Context.getProgramParameter(this.Program, Context.LINK_STATUS))
      alert("FATAL ERROR: Could not initialise shaders.");
  }

  this.Apply = function( Context )
  {
    Context.useProgram(this.Program);

    this.Program.VertexPositionAttribute = Context.getAttribLocation(this.Program, "VertexPosition");
    Context.enableVertexAttribArray(this.Program.VertexPositionAttribute);
    this.Program.VertexNormalAttribute = Context.getAttribLocation(this.Program, "VertexNormal");
    if (this.Program.VertexNormalAttribute != -1)
      Context.enableVertexAttribArray(this.Program.VertexNormalAttribute);
    this.Program.VertexTextureAttribute = Context.getAttribLocation(this.Program, "VertexTexture");
    if (this.Program.VertexTextureAttribute != -1)
      Context.enableVertexAttribArray(this.Program.VertexTextureAttribute);
    this.Program.VertexColorAttribute = Context.getAttribLocation(this.Program, "VertexColor");
    if (this.Program.VertexColorAttribute != -1)
      Context.enableVertexAttribArray(this.Program.VertexColorAttribute);
  }
}