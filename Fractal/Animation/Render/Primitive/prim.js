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
    this.VBuf = Context.createBuffer();
    Context.bindBuffer(Context.ARRAY_BUFFER, this.VBuf);
    Context.bufferData(Context.ARRAY_BUFFER, new Float32Array(this.V), Context.STATIC_DRAW);
    this.VBuf.itemSize = 3;
    this.VBuf.numItems = this.V.length / 3;
  }

  this.Create = function( Context, NV, NI, Mtl )
  {
    this.V = NV;
    this.I = NI;
    this.Material = Mtl;
    this.InitBuffers(Context);
  }
  
  this.Draw = function( Context )
  {
    Context.bindBuffer(Context.ARRAY_BUFFER, this.VBuf);
    Context.vertexAttribPointer(this.Material.Shader.Program.vertexPositionAttribute, this.VBuf.itemSize, Context.FLOAT, false, 0, 0);

    // Uniforms here

    this.Material.Apply(Context);

    Context.drawArrays(Context.TRIANGLES, 0, this.VBuf.numItems);
  }
}
