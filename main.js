import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import gsap from './node_modules/gsap'
import vertex from './shader/vertex.glsl'
import fragment from './shader/fragment.glsl'
import atmovertex from './shader/atmovertex.glsl'
import atmofragment from './shader/atmofrag.glsl'

//-- Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild( renderer.domElement );

//-- Scene
const scene = new THREE.Scene();


//-- Camera controls 
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
// set on U.S.A
camera.position.set(-2, 6, 13);

const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

//--Objects
//--Earth
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load('./img/globe.jpg')
      }
    }    
  })
);
scene.add( earth );

//--Atmosphere
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader: atmovertex,
    fragmentShader: atmofragment,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  })
);
atmosphere.scale.set(1.1, 1.1, 1.1);
scene.add(atmosphere);

//--Background Stars
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff
});

const starVertices = [];
for (let i = 0; i < 5000; i++) {
  const x = (Math.random() - 0.5) * 2000
  const y = (Math.random() - 0.5) * 2000
  const z = -Math.random() * 2000
  starVertices.push(x, y, z)
};
for (let i = 0; i < 5000; i++) {
  const x = (Math.random() - 0.5) * 2000
  const y = (Math.random() - 0.5) * 2000
  const z = +Math.random() * 2000
  starVertices.push(x, y, z)
};
starGeometry.setAttribute('position',
  new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

//SpaceX--
let SLC40 = new THREE.Mesh(
  new THREE.OctahedronGeometry(0.05),
  new THREE.MeshBasicMaterial({color:0xff0000})
);

let SLC40lat = (28.7617) * Math.PI / 180;
let SLC40lng = (72.3918) * Math.PI / 180;

let SLC40x = Math.cos(SLC40lng) * Math.sin(SLC40lat) * 5.05;
let SLC40y = Math.sin(SLC40lng) * Math.sin(SLC40lat) * 5.05; 
let SLC40z = Math.cos(SLC40lat) * 5.05;
SLC40.position.set(SLC40x, SLC40y, SLC40z);
scene.add(SLC40)

let SLC4E = new THREE.Mesh(
  new THREE.OctahedronGeometry(0.05),
  new THREE.MeshBasicMaterial({color:0xff0000})
);

let SLC4Elat = (43.8522) * Math.PI / 180;
let SLC4Elng = (125.6437) * Math.PI / 180;

let SLC4Ex = Math.cos(SLC4Elng) * Math.sin(SLC4Elat) * 5.05;
let SLC4Ey = Math.sin(SLC4Elng) * Math.sin(SLC4Elat) * 5.05; 
let SLC4Ez = Math.cos(SLC4Elat) * 5.05;
SLC4E.position.set(SLC4Ex, SLC4Ey, SLC4Ez);
scene.add(SLC4E)

let LC39A = new THREE.Mesh(
  new THREE.OctahedronGeometry(0.05),
  new THREE.MeshBasicMaterial({color:0xff0000})
);

let LC39Alat = (29.7617) * Math.PI / 180;
let LC39Alng = (73.3918) * Math.PI / 180;

let LC39Ax = Math.cos(LC39Alng) * Math.sin(LC39Alat) * 5.05;
let LC39Ay = Math.sin(LC39Alng) * Math.sin(LC39Alat) * 5.05; 
let LC39Az = Math.cos(LC39Alat) * 5.05;
LC39A.position.set(LC39Ax, LC39Ay, LC39Az);
scene.add(LC39A)

let BOCA = new THREE.Mesh(
  new THREE.OctahedronGeometry(0.05),
  new THREE.MeshBasicMaterial({color:0xff0000})
);

let BOCAlat = (27.2017) * Math.PI / 180;
let BOCAlng = (105.0918) * Math.PI / 180;

let BOCAx = Math.cos(BOCAlng) * Math.sin(BOCAlat) * 5.05;
let BOCAy = Math.sin(BOCAlng) * Math.sin(BOCAlat) * 5.05; 
let BOCAz = Math.cos(BOCAlat) * 5.05;
BOCA.position.set(BOCAx, BOCAy, BOCAz);
scene.add(BOCA);

//Rocket Lab

let RLC1 = new THREE.Mesh(
  new THREE.OctahedronGeometry(0.05),
  new THREE.MeshBasicMaterial({color:0xff0000})
);

let RLC1lat = (92.2604) * Math.PI / 180;
let RLC1lng = (219.8662) * Math.PI / 180;

let RLC1x = Math.cos(RLC1lng) * Math.sin(RLC1lat) * 5.05;
let RLC1y = Math.sin(RLC1lng) * Math.sin(RLC1lat) * 5.05; 
let RLC1z = Math.cos(RLC1lat) * 5.05;
RLC1.position.set(RLC1x, RLC1y, RLC1z);
scene.add(RLC1);

let RLC2 = new THREE.Mesh(
  new THREE.OctahedronGeometry(0.05),
  new THREE.MeshBasicMaterial({color:0xff0000})
);

let RLC2lat = (40.7604) * Math.PI / 180;
let RLC2lng = (72.8662) * Math.PI / 180;

let RLC2x = Math.cos(RLC2lng) * Math.sin(RLC2lat) * 5.05;
let RLC2y = Math.sin(RLC2lng) * Math.sin(RLC2lat) * 5.05; 
let RLC2z = Math.cos(RLC2lat) * 5.05;
RLC2.position.set(RLC2x, RLC2y, RLC2z);
scene.add(RLC2);

//--ULA

let SLC3E = new THREE.Mesh(
  new THREE.OctahedronGeometry(0.05),
  new THREE.MeshBasicMaterial({color:0xff0000})
);

let SLC3Elat = (42.8522) * Math.PI / 180;
let SLC3Elng = (125.6437) * Math.PI / 180;

let SLC3Ex = Math.cos(SLC3Elng) * Math.sin(SLC3Elat) * 5.05;
let SLC3Ey = Math.sin(SLC3Elng) * Math.sin(SLC3Elat) * 5.05; 
let SLC3Ez = Math.cos(SLC3Elat) * 5.05;
SLC3E.position.set(SLC3Ex, SLC3Ey, SLC3Ez);
scene.add(SLC3E);

let SLC41 = new THREE.Mesh(
  new THREE.OctahedronGeometry(0.05),
  new THREE.MeshBasicMaterial({color:0xff0000})
);

let SLC41lat = (29.4617) * Math.PI / 180;
let SLC41lng = (74.3918) * Math.PI / 180;

let SLC41x = Math.cos(SLC41lng) * Math.sin(SLC41lat) * 5.05;
let SLC41y = Math.sin(SLC41lng) * Math.sin(SLC41lat) * 5.05; 
let SLC41z = Math.cos(SLC41lat) * 5.05;
SLC41.position.set(SLC41x, SLC41y, SLC41z);
scene.add(SLC41);

//--ArianeSpace
let ELA34 = new THREE.Mesh(
  new THREE.OctahedronGeometry(0.05),
  new THREE.MeshBasicMaterial({color:0xff0000})
);

let ELA34lat = (37.4617) * Math.PI / 180;
let ELA34lng = (5.3918) * Math.PI / 180;

let ELA34x = Math.cos(ELA34lng) * Math.sin(ELA34lat) * 5.05;
let ELA34y = Math.sin(ELA34lng) * Math.sin(ELA34lat) * 5.05; 
let ELA34z = Math.cos(ELA34lat) * 5.05;
ELA34.position.set(ELA34x, ELA34y, ELA34z);
scene.add(ELA34);

//--Russian Military

let LC434 = new THREE.Mesh(
  new THREE.OctahedronGeometry(0.05),
  new THREE.MeshBasicMaterial({color:0xff0000})
);

let LC434lat = (106.5) * Math.PI / 180;
let LC434lng = (68.3918) * Math.PI / 180;

let LC434x = Math.cos(LC434lng) * Math.sin(LC434lat) * 5.05;
let LC434y = Math.sin(LC434lng) * Math.sin(LC434lat) * 5.05; 
let LC434z = Math.cos(LC434lat) * 5.05;
LC434.position.set(LC434x, LC434y, LC434z);
scene.add(LC434);

//--NASA
//ARTEMIS 1 LAUNCHES ON NOV/22

//--Mitsubishi Heavy Industries

let LAY1 = new THREE.Mesh(
  new THREE.OctahedronGeometry(0.05),
  new THREE.MeshBasicMaterial({color:0xff0000})
);

let LAY1lat = (131.5665) * Math.PI / 180;
let LAY1lng = (136.9780) * Math.PI / 180;

let LAY1x = Math.cos(LAY1lng) * Math.sin(LAY1lat) * 5.05;
let LAY1y = Math.sin(LAY1lng) * Math.sin(LAY1lat) * 5.05; 
let LAY1z = Math.cos(LAY1lat) * 5.05;
LAY1.position.set(LAY1x, LAY1y, LAY1z);
scene.add(LAY1);

//--Virgin Orbit

let MASP = new THREE.Mesh(
  new THREE.OctahedronGeometry(0.05),
  new THREE.MeshBasicMaterial({color:0xff0000})
);

let MASPlat = (44.3522) * Math.PI / 180;
let MASPlng = (122) * Math.PI / 180;

let MASPx = Math.cos(MASPlng) * Math.sin(MASPlat) * 5.05;
let MASPy = Math.sin(MASPlng) * Math.sin(MASPlat) * 5.05; 
let MASPz = Math.cos(MASPlat) * 5.05;
MASP.position.set(MASPx, MASPy, MASPz);
scene.add(MASP);

//--Blue Origin

let LC36 = new THREE.Mesh(
  new THREE.OctahedronGeometry(0.05),
  new THREE.MeshBasicMaterial({color:0xff0000})
);

let LC36lat = (29.3) * Math.PI / 180;
let LC36lng = (73) * Math.PI / 180;

let LC36x = Math.cos(LC36lng) * Math.sin(LC36lat) * 5.05;
let LC36y = Math.sin(LC36lng) * Math.sin(LC36lat) * 5.05; 
let LC36z = Math.cos(LC36lat) * 5.05;
LC36.position.set(LC36x, LC36y, LC36z);
scene.add(LC36);


//scheduled launch locations
let scheduledLaunchAug = [RLC1];
let scheduledLaunchSep = [SLC4E, LC39A, BOCA, RLC1, SLC3E, ELA34, LC434];
let scheduledLaunchOct = [SLC40, LC39A, RLC1, SLC41, MASP];
let scheduledLaunchNov = [LC39A, SLC4E, SLC41, ELA34];
let scheduledLaunchDec = [LC39A, LAY1, MASP];
let scheduledLaunchJan = [RLC1, SLC41];
let scheduledLaunchFeb = [RLC1];

 var today = new Date();
 var month = today.getMonth() + 1;

if (month == 8) {
  for (let i = 0; i < scheduledLaunchAug.length; i++){
    scheduledLaunchAug[i].material.color = {r: 0, g: 1, b: 0};
  }
};

if (month == 9) {
  for (let i = 0; i < scheduledLaunchSep.length; i++){
    scheduledLaunchSep[i].material.color = {r: 0, g: 1, b: 0};
  }
};

if (month == 10) {
  for (let i = 0; i < scheduledLaunchOct.length; i++){
    scheduledLaunchOct[i].material.color = {r: 0, g: 1, b: 0};
  }
};

if (month == 11) {
  for (let i = 0; i < scheduledLaunchNov.length; i++){
    scheduledLaunchNov[i].material.color = {r: 0, g: 1, b: 0};
  }
};

if (month == 12) {
  for (let i = 0; i < scheduledLaunchDec.length; i++){
    scheduledLaunchDec[i].material.color = {r: 0, g: 1, b: 0};
  }
};

if (month == 1) {
  for (let i = 0; i < scheduledLaunchJan.length; i++){
    scheduledLaunchJan[i].material.color = {r: 0, g: 1, b: 0};
  }
};

if (month == 2) {
  for (let i = 0; i < scheduledLaunchFeb.length; i++){
    scheduledLaunchFeb[i].material.color = {r: 0, g: 1, b: 0};
  }
};

//--Animation 
function animate() {

  requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );
}

animate();



