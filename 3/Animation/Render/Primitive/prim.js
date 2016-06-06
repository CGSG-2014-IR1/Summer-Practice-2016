//function vertex()
//{
  //var Pos = new vec();
  //var Col = new vec();
  //var Norm = new vec();

  //this.Set = function( NPos, NCol, NNorm )
  //{
    //Pos = NPos;
    //Col = NCol;
    //Norm = NNorm;
  //}
//}

function prim()
{
  this.InitBuffers = function( Context )
  {
    this.PBuf = Context.createBuffer();
    Context.bindBuffer(Context.ARRAY_BUFFER, this.PBuf);
    Context.bufferData(Context.ARRAY_BUFFER, new Float32Array(this.Pos), Context.STATIC_DRAW);
    this.PBuf.itemSize = 3;
    this.PBuf.numItems = this.Pos.length / 3;

    if (this.Norm != null)
    {
      this.NBuf = Context.createBuffer();
      Context.bindBuffer(Context.ARRAY_BUFFER, this.NBuf);
      Context.bufferData(Context.ARRAY_BUFFER, new Float32Array(this.Norm), Context.STATIC_DRAW);
      this.NBuf.itemSize = 3;
      this.NBuf.numItems = this.Norm.length / 3;
    }
    else
      this.NBuf = null;

    if (this.Tex != null)
    {
      this.TBuf = Context.createBuffer();
      Context.bindBuffer(Context.ARRAY_BUFFER, this.TBuf);
      Context.bufferData(Context.ARRAY_BUFFER, new Float32Array(this.Tex), Context.STATIC_DRAW);
      this.TBuf.itemSize = 2;
      this.TBuf.numItems = this.Tex.length / 2;
    }
    else
      this.TBuf = null;

    if (this.Col != null)
    {
      this.CBuf = Context.createBuffer();
      Context.bindBuffer(Context.ARRAY_BUFFER, this.CBuf);
      Context.bufferData(Context.ARRAY_BUFFER, new Float32Array(this.Col), Context.STATIC_DRAW);
      this.CBuf.itemSize = 3;
      this.CBuf.numItems = this.Col.length / 3;
    }
    else
      this.CBuf = null;
  }

  this.Create = function( Context, Pos, Norm, Tex, Col, Mtl )
  {
    this.Pos = Pos;
    this.Norm = Norm;
    this.Tex = Tex;
    this.Col = Col;
    this.Material = Mtl;
    this.InitBuffers(Context);
  }
  
  this.Draw = function( Ani )
  {
    this.Material.Apply(Ani);
    var Context = Ani.Render.Context;
    Ani.ApplyMatrixes();
    
    Context.bindBuffer(Context.ARRAY_BUFFER, this.PBuf);
    Context.vertexAttribPointer(this.Material.Shader.Program.VertexPositionAttribute, this.PBuf.itemSize, Context.FLOAT, false, 0, 0);
    if (this.NBuf != null && this.Material.Shader.Program.VertexNormalAttribute != -1)
    {
      Context.bindBuffer(Context.ARRAY_BUFFER, this.NBuf);
      Context.vertexAttribPointer(this.Material.Shader.Program.VertexNormalAttribute, this.NBuf.itemSize, Context.FLOAT, false, 0, 0);
    }
    if (this.TBuf != null && this.Material.Shader.Program.VertexTextureAttribute != -1)
    {
      Context.bindBuffer(Context.ARRAY_BUFFER, this.TBuf);
      Context.vertexAttribPointer(this.Material.Shader.Program.VertexTextureAttribute, this.TBuf.itemSize, Context.FLOAT, false, 0, 0);
    }
    if (this.CBuf != null && this.Material.Shader.Program.VertexColorAttribute != -1)
    {
      Context.bindBuffer(Context.ARRAY_BUFFER, this.CBuf);
      Context.vertexAttribPointer(this.Material.Shader.Program.VertexColorAttribute, this.CBuf.itemSize, Context.FLOAT, false, 0, 0);
    }
    
    Context.drawArrays(Context.TRIANGLES, 0, this.PBuf.numItems);
  }
}
