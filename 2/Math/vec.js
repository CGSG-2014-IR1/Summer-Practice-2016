function vec()
{
  this.X = 0;
  this.Y = 0;
  this.Z = 0;

  this.Set = function( Nx, Ny, Nz )
  {
    this.X = Nx;
    this.Y = Ny;
    this.Z = Nz;
  }

  /**
   * @return { number }
   */
  this.Length = function()
  {
    return Math.sqrt(this.X * this.X + this.Y * this.Y + this.Z * this.Z);
  }

  this.Addition = function( rhs )
  {
    var res = new vec();
    res = this;
    res.X += rhs.X;
    res.Y += rhs.Y;
    res.Z += rhs.Z;
    return res;
  }

  this.Subtraction = function( rhs )
  {
    var res = new vec();
    res = this;
    res.X -= rhs.X;
    res.Y -= rhs.Y;
    res.Z -= rhs.Z;
    return res;
  }

  this.Cross = function( rhs )
  {
    var res = new vec();
    res.X = Y * rhs.Z - Z * rhs.Y;
    res.Y = Z * rhs.X - X * rhs.Z;
    res.Z = X * rhs.Y - Y * rhs.X;
    return res;
  }

  this.Normalize = function()
  {
    var l = this.Length();

    if (l == 0)
      throw "Division by zero!";

    this.X /= l;
    this.Y /= l;
    this.Z /= l;
  }
}
