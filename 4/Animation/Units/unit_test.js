function unit_test()
{
  this.Init = function( Ani )
  {
    var SpotLight = new THREE.SpotLight( 0xffffff );
    SpotLight.position.set(0.0, 2.0, 2.0);
    SpotLight.castShadow = true;
    SpotLight.shadow.mapSize.width = 4096;
    SpotLight.shadow.mapSize.height = 4096;
    SpotLight.distance = 400;
    SpotLight.power = 6;
    SpotLight.angle = 0.3;
    SpotLight.penumbra = 1;

    var PointLight = new THREE.AmbientLight( 0x666666 );

    this.Skybox = CreateSkybox("Bin/Textures/skybox/forbidden/", ".jpg");
    this.Spheres = [];
    for (var i = 0; i < 20; i++)
    {
      var sp = CreateSphere(Math.random() * 0.2, 10, 10,
        new THREE.MeshPhongMaterial({color: 0xffffff * Math.random(), shininess: 40, opacity: 0.6, transparent: false}));
      sp.OrbitRadius = 0.6 + Math.random();
      this.Spheres.push(sp);
      Ani.AddPrimitive(sp);
    }

    var loader = new THREE.OBJLoader();
    var self = this;
    loader.load('Bin/Objects/nuke/nuke.obj', function(geometry)
      {
        var material = new THREE.MeshPhongMaterial(
          {
            color: 0xffffff,
            specular: 0x441122,
            shininess: 40,
            opacity: 0.3,
            transparent: false,
            envMap: Ani.ReflectionCamera.renderTarget.texture
          });
        geometry.children.forEach(function(child)
        {
          child.material = material;
          child.castShadow = true;
          child.receiveShadow = true;
        })
        geometry.scale.set(0.1, 0.1, 0.1);
        self.Nuke = geometry;
        Ani.Scene.add(geometry);
      });

    var plane = new CreatePlane(15, 15, new THREE.MeshPhongMaterial(
      {
        color: 0xaaaaaa, specular: 0xff3333, shininess: 40, side: THREE.DoubleSide
      }));
    plane.Mesh.position.y = -1.0;
    Ani.AddPrimitive(this.Skybox)
      .AddPrimitive(plane)
      .AddLight(SpotLight).AddLight(PointLight);
  }

  this.Render = function( Ani )
  {
    if (this.Nuke)
      Ani.RenderReflection(this.Nuke.children[0]);
  }

  this.Response = function( Ani )
  {
    this.Spheres.forEach(function(sp)
    {
      sp.Mesh.position.set(Math.sin((Ani.Timer.Time + sp.OrbitRadius) * sp.OrbitRadius) * sp.OrbitRadius,
        Math.sin((Ani.Timer.Time - sp.OrbitRadius) * sp.OrbitRadius) * 0.5,
        Math.cos((Ani.Timer.Time + sp.OrbitRadius) * sp.OrbitRadius) * sp.OrbitRadius);
    });
  }
}

