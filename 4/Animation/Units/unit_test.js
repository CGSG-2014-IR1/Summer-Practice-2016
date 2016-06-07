function unit_test()
{
  this.Init = function( Ani )
  {
    var self = this;
    this.RefractionCoefficient = 1.4;
    Ani.gui.add({refr: 1.4}, 'refr').min(0.1).max(3.0).step(0.1).name('Refraction coefficient').onFinishChange(function(val)
      {
        self.RefractionCoefficient = val;
      });

    var SpotLight = new THREE.SpotLight( 0xffffff );
    SpotLight.position.set(0.0, 10.0, 10.0);
    SpotLight.castShadow = false;
    SpotLight.distance = 400;
    SpotLight.power = 6;
    SpotLight.angle = 0.3;
    SpotLight.penumbra = 1;

    var PointLight = new THREE.AmbientLight( 0x666666 );

    this.Skybox = CreateSkybox("Bin/Textures/skybox/forbidden/", ".jpg");
    this.Skybox.Mesh.material.receiveShadow = true;
    this.Spheres = [];
    for (var i = 0; i < 3; i++)
    {
      var sp = CreateSphere(Math.random() * 0.5 + 0.2, 10, 10,
        new THREE.MeshPhongMaterial({color: 0xffffff * Math.random(), shininess: 40, opacity: 0.6, transparent: false}));
      sp.OrbitRadius = 2 + Math.random() * 3;
      this.Spheres.push(sp);
      Ani.AddPrimitive(sp);
    }

    var loader = new THREE.OBJLoader();
    loader.load('Bin/Objects/skull/skull.obj', function(geometry)
      {
        var material = new THREE.ShaderMaterial(
          {
            uniforms:
              {
                "TextureReflection": { type: "t", value: Ani.ReflectionCamera.renderTarget.texture },
                "CameraPos": { type: "v3", value: Ani.Camera.position },
                "RefractionCoefficient": { type: "f", value: self.RefractionCoefficient }
              },
            vertexShader: LoadShaderText("Shaders/optic.vert"),
            fragmentShader: LoadShaderText("Shaders/optic.frag"),
          });
        geometry.children.forEach(function(child)
        {
          child.material = material;
          child.castShadow = true;
          child.receiveShadow = true;
        })
        geometry.scale.set(0.2, 0.2, 0.2);
        geometry.position.y = -1.0;
        self.Skull = geometry;
        Ani.Scene.add(geometry);
      });

    Ani.AddPrimitive(this.Skybox)
      .AddLight(SpotLight).AddLight(PointLight);
  }

  this.Render = function( Ani )
  {
    if (this.Skull)
      Ani.RenderReflection(this.Skull.children[0]);
  }

  this.Response = function( Ani )
  {
    if (this.Skull)
    {
      this.Skull.children[0].material.uniforms.TextureReflection.value = Ani.ReflectionCamera.renderTarget.texture;
      this.Skull.children[0].material.uniforms.CameraPos.value = Ani.Camera.position;
      this.Skull.children[0].material.uniforms.RefractionCoefficient.value = this.RefractionCoefficient;
    }

    this.Spheres.forEach(function(sp)
    {
      sp.Mesh.position.set(Math.sin((Ani.Timer.Time + sp.OrbitRadius) * sp.OrbitRadius) * sp.OrbitRadius,
        Math.sin((Ani.Timer.Time - sp.OrbitRadius) * sp.OrbitRadius) * 0.5,
        Math.cos((Ani.Timer.Time + sp.OrbitRadius) * sp.OrbitRadius) * sp.OrbitRadius);
/*
      sp.Mesh.position.set(Math.sin((0 + sp.OrbitRadius) * sp.OrbitRadius) * sp.OrbitRadius,
        Math.sin((0 - sp.OrbitRadius) * sp.OrbitRadius) * 0.5,
        Math.cos((0 + sp.OrbitRadius) * sp.OrbitRadius) * sp.OrbitRadius);*/
    });
  }
}

