function unit_test()
{
  this.Init = function( Ani )
  {
    var SpotLight = new THREE.SpotLight( 0xffffff );
    SpotLight.position.set(0.0, 2.0, 2.0);
    SpotLight.castShadow = true;
    SpotLight.shadow.mapSize.width = 4096;
    SpotLight.shadow.mapSize.height = 4096;
    SpotLight.distance = 40;
    SpotLight.power = 6;
    SpotLight.angle = 0.1;
    SpotLight.penumbra = 1;

    var PointLight = new THREE.AmbientLight( 0x666666 );

    var box = CreateBox(0.1, 0.1, 0.1,
      new THREE.MeshPhongMaterial({color: 0xFF7777, specular: 0x441122, shininess: 40, opacity: 0.5, transparent: true}));
    box.Mesh.position.y = 0.1;
    box.Mesh.position.z = 0.0;

    this.Sphere = CreateSphere(0.1, 20, 20,
      new THREE.MeshPhongMaterial({color: 0x227777, specular: 0x441122, shininess: 40, opacity: 0.3, transparent: true}));
    this.Sphere.Mesh.position.y = 0.35;
    this.Sphere.Mesh.position.z = 0.35;

    Ani.AddPrimitive(CreatePlane(10.0, 10.0, new THREE.MeshPhongMaterial({color: 0x777777, specular: 0x441122, shininess: 40})))
      .AddPrimitive(box).AddPrimitive(this.Sphere)
      .AddLight(SpotLight).AddLight(PointLight);
  }

  this.Render = function( Ani )
  {
  }

  this.Response = function( Ani )
  {
    this.Sphere.Mesh.position.x = Math.sin(Ani.Timer.Time) * 0.4;
    this.Sphere.Mesh.position.z = Math.cos(Ani.Timer.Time) * 0.4;
  }
}

