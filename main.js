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
camera.position.set(0, 0, 15);

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
let mesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.05, 20, 20),
  new THREE.MeshBasicMaterial({color:0x00ff00})
);

let lat = (25.7617) * Math.PI / 180;
let lng = (80.1918) * Math.PI / 180;

let x1 = Math.cos(lng) * Math.sin(lat) * 5;
let y1 = Math.sin(lng) * Math.sin(lat) * 5; 
let z1 = Math.cos(lat) * 5;
mesh.position.set(x1, y1, z1);
scene.add(mesh)

let mesh2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.05, 20, 20),
  new THREE.MeshBasicMaterial({color:0xff0000})
);

let lat2 = (40.7128) * Math.PI / 180;
let lng2 = (74.0060) * Math.PI / 180;

let x2 = Math.cos(lng2) * Math.sin(lat2) * 5;
let y2 = Math.sin(lng2) * Math.sin(lat2) * 5; 
let z2 = Math.cos(lat2) * 5;
mesh2.position.set(x2, y2, z2);
scene.add(mesh2)

let mesh3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.05, 20, 20),
  new THREE.MeshBasicMaterial({color:0xffff00})
);

let lat3 = (34.0522) * Math.PI / 180;
let lng3 = (118.2437) * Math.PI / 180;

let x3 = Math.cos(lng3) * Math.sin(lat3) * 5;
let y3 = Math.sin(lng3) * Math.sin(lat3) * 5; 
let z3 = Math.cos(lat3) * 5;
mesh3.position.set(x3, y3, z3);
scene.add(mesh3)

//--Animation 
function animate() {

  requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );
}

animate();



