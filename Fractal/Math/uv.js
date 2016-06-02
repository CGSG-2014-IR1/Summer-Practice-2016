function uv()
{
  this.X = 0;
  this.Y = 0;

  this.Set = function( Nx, Ny )
  {
    this.X = Nx;
    this.Y = Ny;
  }

  /**
   * @return { number }
   */
  this.Length = function()
  {
    return Math.sqrt(this.X * this.X + this.Y * this.Y);
  }

  this.Addition = function( rhs )
  {
    var res = new uv();
    res.X = rhs.X + this.X;
    res.Y = rhs.Y + this.Y;
    return res;
  }

  this.Subtraction = function( rhs )
  {
    var res = new uv();
    res.X = this.X - rhs.X;
    res.Y = this.Y - rhs.Y;
    return res;
  }

  this.MulNum = function( rhs )
  {
    var res = new uv();
    res.X = this.X * rhs;
    res.Y = this.Y * rhs;
    return res;
  }

  this.Cross = function( rhs )
  {
    var res = new uv();
    res.X = this.Y * rhs.Z - this.Z * rhs.Y;
    res.Y = this.Z * rhs.X - this.X * rhs.Z;
    return res;
  }

  this.Normalize = function()
  {
    var l = this.Length();

    if (l == 0)
      throw "Division by zero!";

    this.X /= l;
    this.Y /= l;
  }
}
