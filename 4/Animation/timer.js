function timer()
{
  this.Init = function()
  {
    this.Time = window.performance.now();
    this.GlobalTime = this.Time;
    this.DeltaTime = 0.0;
    this.GlobalDeltaTime = 0.0;
    this.IsPause = false;
    this.FPSCounter = 0;
    this.FPS = 0.0;
  }

  this.Update = function()
  {
    this.FPSCounter++;
    this.GlobalDeltaTime = window.performance.now() / 1000.0 - this.GlobalTime;
    this.GlobalTime += this.GlobalDeltaTime;

    if (!this.IsPause)
    {
      this.DeltaTime = this.GlobalDeltaTime;
      this.Time += this.DeltaTime;
    }
    else
      this.DeltaTime = 0;
  }

  this.Pause = function()
  {
    this.IsPause = true;
  }

  this.UnPause = function()
  {
    this.IsPause = false;
  }

  this.TogglePause = function()
  {
    this.IsPause = !this.IsPause;
  }
}
