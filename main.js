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

//--
let SLC40 = new THREE.Mesh(
  new THREE.OctahedronGeometry(0.04),
  new THREE.MeshBasicMaterial({color:0x00ff00})
);

let SLC40lat = (28.7617) * Math.PI / 180;
let SLC40lng = (72.3918) * Math.PI / 180;

let SLC40x = Math.cos(SLC40lng) * Math.sin(SLC40lat) * 5.04;
let SLC40y = Math.sin(SLC40lng) * Math.sin(SLC40lat) * 5.04; 
let SLC40z = Math.cos(SLC40lat) * 5.04;
SLC40.position.set(SLC40x, SLC40y, SLC40z);
scene.add(SLC40)

let SLC4E = new THREE.Mesh(
  new THREE.OctahedronGeometry(0.04),
  new THREE.MeshBasicMaterial({color:0x00ff00})
);

let SLC4Elat = (43.8522) * Math.PI / 180;
let SLC4Elng = (125.6437) * Math.PI / 180;

let SLC4Ex = Math.cos(SLC4Elng) * Math.sin(SLC4Elat) * 5.04;
let SLC4Ey = Math.sin(SLC4Elng) * Math.sin(SLC4Elat) * 5.04; 
let SLC4Ez = Math.cos(SLC4Elat) * 5.04;
SLC4E.position.set(SLC4Ex, SLC4Ey, SLC4Ez);
scene.add(SLC4E)

let LC39A = new THREE.Mesh(
  new THREE.OctahedronGeometry(0.04),
  new THREE.MeshBasicMaterial({color:0x00ff00})
);

let LC39Alat = (29.7617) * Math.PI / 180;
let LC39Alng = (73.3918) * Math.PI / 180;

let LC39Ax = Math.cos(LC39Alng) * Math.sin(LC39Alat) * 5.04;
let LC39Ay = Math.sin(LC39Alng) * Math.sin(LC39Alat) * 5.04; 
let LC39Az = Math.cos(LC39Alat) * 5.04;
LC39A.position.set(LC39Ax, LC39Ay, LC39Az);
scene.add(LC39A)

let BOCA = new THREE.Mesh(
  new THREE.OctahedronGeometry(0.04),
  new THREE.MeshBasicMaterial({color:0x00ff00})
);

let BOCAlat = (27.2017) * Math.PI / 180;
let BOCAlng = (105.0918) * Math.PI / 180;

let BOCAx = Math.cos(BOCAlng) * Math.sin(BOCAlat) * 5.04;
let BOCAy = Math.sin(BOCAlng) * Math.sin(BOCAlat) * 5.04; 
let BOCAz = Math.cos(BOCAlat) * 5.04;
BOCA.position.set(BOCAx, BOCAy, BOCAz);
scene.add(BOCA);



//--Animation 
function animate() {

  requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );
}

animate();



