import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'
import vertex from './shader/vertex.glsl'
import fragment from './shader/fragment.glsl'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75, 
  innerWidth / innerHeight, 
  0.1, 
  1000
)

const renderer = new THREE.WebGLRenderer(
  {
    antialias: true
  }
)


renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

const sphere = new THREE.Mesh(
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
)

scene.add(sphere)

camera.position.z = 15 

function animate(){
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

animate()
