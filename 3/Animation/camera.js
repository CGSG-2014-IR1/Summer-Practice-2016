function camera()
{
  this.Loc = vec3.create();
  this.Up = vec3.create();
  this.At = vec3.create();
  this.Dir = vec3.create();

  this.MatrixProjection = mat4.create();
  this.MatrixView = mat4.create();
  this.MatrixViewProjection = mat4.create();

  this.Init = function( Ani )
  {
    this.Ani = Ani;
  }
  
  this.Set = function( Loc, At )
  {
    this.Loc[0] = Loc.X;
    this.Loc[1] = Loc.Y;
    this.Loc[2] = Loc.Z;
    this.At[0] = At.X;
    this.At[1] = At.Y;
    this.At[2] = At.Z;
    this.Up[0] = 0;
    this.Up[1] = 1;
    this.Up[2] = 0;

    vec3.subtract(this.Loc, this.At, this.Dir);
    vec3.normalize(this.Dir);

    var ratio = this.Ani.Render.Context.viewportWidth / this.Ani.Render.Context.viewportHeight;
    mat4.frustum(-1.0, 1.0, -ratio, ratio, 1, 1000.0, this.MatrixProjection);
    //mat4.perspective(15, ratio, 0.1, 1000.0, this.MatrixProjection);
    mat4.lookAt(this.Loc, this.At, this.Up, this.MatrixView);
    //mat4.rotate(this.MatrixView, 15, [0.0, 1.0, 0.0]);
    mat4.multiply(this.MatrixProjection, this.MatrixView, this.MatrixViewProjection);
  }
}
