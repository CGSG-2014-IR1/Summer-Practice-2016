function CreatePlane( du, dv, Material )
{
  if (!du)
    du = 1.0;
  if (!dv)
    dv = 1.0;
  var ret = new prim();
  ret.Geometry = new THREE.PlaneGeometry(du, dv);
  if (!Material)
  {
    ret.Material = new THREE.MeshLambertMaterial();
    var col = new THREE.Color(0.5, 0.5, 0.5);
    ret.Material.color = col;
  }
  else
    ret.Material = Material;

  ret.Mesh = new THREE.Mesh(ret.Geometry, ret.Material);
  ret.Mesh.rotation.x = -0.5 * Math.PI;
  ret.Mesh.receiveShadow = true;
  ret.Mesh.castShadow = true;

  return ret;
}

function CreateBox( sx, sy, sz, Material )
{
  if (!sx)
    sx = 1.0;
  if (!sy)
    sy = 1.0;
  if (!sz)
    sz = 1.0;
  var ret = new prim();
  ret.Geometry = new THREE.CubeGeometry(sx, sy, sz);
  if (!Material)
  {
    ret.Material = new THREE.MeshLambertMaterial();
    var col = new THREE.Color(0.5, 0.5, 0.5);
    ret.Material.color = col;
  }
  else
    ret.Material = Material;

  ret.Mesh = new THREE.Mesh(ret.Geometry, ret.Material);
  ret.Mesh.receiveShadow = true;
  ret.Mesh.castShadow = true;

  return ret;
}

function CreateSphere( r, segmh, segmv, Material )
{
  if (!r)
    r = 1.0;
  if (!segmh)
    segmh = 8.0;
  if (!segmv)
    segmv = 8.0;
  var ret = new prim();
  ret.Geometry = new THREE.SphereGeometry(r, segmh, segmv);
  if (!Material)
  {
    ret.Material = new THREE.MeshLambertMaterial();
    var col = new THREE.Color(0.5, 0.5, 0.5);
    ret.Material.color = col;
  }
  else
    ret.Material = Material;

  ret.Mesh = new THREE.Mesh(ret.Geometry, ret.Material);
  ret.Mesh.receiveShadow = true;
  ret.Mesh.castShadow = true;

  return ret;
}