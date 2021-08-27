import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'
import vertex from './shader/vertex.glsl'
import fragment from './shader/fragment.glsl'
import atmovertex from './shader/atmovertex.glsl'
import atmofragment from './shader/atmofrag.glsl'
import gsap from './node_modules/gsap'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75, 
  innerWidth / innerHeight, 
  0.1, 
  1000
)

const renderer = new THREE.WebGLRenderer(
  {
    antialias: true,
    canvas: document.querySelector('canvas')
  }
)

renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

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

const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader: atmovertex,
    fragmentShader: atmofragment,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  })
)

atmosphere.scale.set(1.1, 1.1, 1.1)

scene.add(atmosphere)

const starGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff
})

const starVertices = []
for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 2000
  const y = (Math.random() - 0.5) * 2000
  const z = -Math.random() * 2000
  starVertices.push(x, y, z)
}

starGeometry.setAttribute('position',
  new THREE.Float32BufferAttribute(starVertices, 3))

const stars = new THREE.Points(
  starGeometry, starMaterial)
scene.add(stars)

const group = new THREE.Group()
group.add(sphere)
scene.add(group)

camera.position.z = 15 

const mouse = {
  x: undefined,
  y: undefined
}

function animate(){
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  sphere.rotation.y += 0.001
  gsap.to(group.rotation,
   {y: mouse.x * 0.5,
    duration: 2
  })
}

animate()

addEventListener('mousemove', () => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1
  mouse.y = -(event.clientY / innerHeight) * 2 + 1
})
