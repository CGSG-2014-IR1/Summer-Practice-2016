function unit_test()
{
  this.AddSphere = function(Ani)
  {
    var sp;
    if (Math.random() > 0.7)
    {
      sp = CreateSphere(Math.random() * 0.5 + 0.2, 10, 10,
        this.Material);
      sp.OrbitRadius = 2 + Math.random() * 3;
    }
    else
    {
      sp = CreateSphere(Math.random() * 0.5 + 0.2, 10, 10,
        new THREE.MeshPhongMaterial(
        {
          color: 0xffffff * Math.random(),
          shininess: 40,
          opacity: 0.6,
          transparent: false
        }));
      sp.OrbitRadius = 2 + Math.random() * 3;
    }

    this.Spheres.push(sp);
    Ani.AddPrimitive(sp);
  }

  this.Init = function( Ani )
  {
    var self = this;
    this.RefractionCoefficient = 1.4;
    Ani.gui.add({refr: 1.4}, 'refr').min(0.1).max(3.0).step(0.1).name('Refraction coefficient').onFinishChange(function(val)
      {
        self.RefractionCoefficient = val;
      });
    Ani.gui.add({sphere: function(){ self.AddSphere(Ani) }}, 'sphere').name('Add sphere');

    this.Material = new THREE.ShaderMaterial(
      {
        uniforms:
        {
          "TextureReflection": { type: "t", value: Ani.ReflectionCamera.renderTarget.texture },
          "CameraPos": { type: "v3", value: Ani.Camera.position },
          "RefractionCoefficient": { type: "f", value: self.RefractionCoefficient }
        },
        side: THREE.DoubleSide,
        vertexShader: LoadShaderText("Shaders/optic.vert"),
        fragmentShader: LoadShaderText("Shaders/optic.frag"),
      });

    var PointLight = new THREE.PointLight( 0xffffff );
    PointLight.position.set(0, 0, 0);

    this.Skybox = CreateSkybox("Bin/Textures/skybox/forbidden/", ".jpg");
    this.Spheres = [];
    for (var i = 0; i < 3; i++)
     this.AddSphere(Ani);

    var loader = new THREE.OBJLoader();
    loader.load('Bin/Objects/skull/skull.obj', function(geometry)
      {
        geometry.children.forEach(function(child)
        {
          child.material = self.Material;
        })
        geometry.scale.set(0.2, 0.2, 0.2);
        geometry.position.y = -1.0;
        self.Skull = geometry;
        Ani.Scene.add(geometry);
      });

    Ani.AddPrimitive(this.Skybox).AddLight(PointLight);
  }

  this.Render = function( Ani )
  {
    if (this.Skull)
    {
      Ani.RenderReflection(this.Skull.children[0]);
      this.Skull.children[0].material.uniforms.TextureReflection.value = Ani.ReflectionCamera.renderTarget.texture;
      this.Skull.children[0].material.uniforms.CameraPos.value = Ani.Camera.position;
      this.Skull.children[0].material.uniforms.RefractionCoefficient.value = this.RefractionCoefficient;
    }
  }

  this.Response = function( Ani )
  {
    if (this.Skull)
    {
      this.Skull.children[2].position.set(0, -Math.abs(Math.sin(Ani.Timer.Time * 10.0)) * 0.25, 0);
      this.Skull.children[3].position.set(0, -Math.abs(Math.sin(Ani.Timer.Time * 10.0)) * 0.25, 0);
    }
    this.Spheres.forEach(function(sp)
    {
      sp.Mesh.position.set(Math.sin((Ani.Timer.Time + sp.OrbitRadius) * sp.OrbitRadius) * sp.OrbitRadius,
        Math.sin((Ani.Timer.Time - sp.OrbitRadius) * sp.OrbitRadius) * 0.5,
        Math.cos((Ani.Timer.Time + sp.OrbitRadius) * sp.OrbitRadius) * sp.OrbitRadius);

      /*
      sp.Mesh.position.set(Math.sin((0 + sp.OrbitRadius) * sp.OrbitRadius) * sp.OrbitRadius,
        Math.sin((0 - sp.OrbitRadius) * sp.OrbitRadius) * 0.5,
        Math.cos((0 + sp.OrbitRadius) * sp.OrbitRadius) * sp.OrbitRadius);
      */
    });
  }
}

