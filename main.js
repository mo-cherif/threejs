import * as THREE from 'three'
import './style.css';
import gsap from 'gsap';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
// creating a scene
const scene = new THREE.Scene();

// creating a sphere
const geometry = new THREE.SphereGeometry(3,64,64);
const material = new THREE.MeshStandardMaterial({
  color: 'red',
})

// sizes 
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}


// mesh combination of geometry and material
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0,10,10)
scene.add(light)

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height)
camera.position.z = 20;
scene.add(camera)



// rendering the scene on the screen
const canvas = document.querySelector('.webgl')
const renderee = new THREE.WebGLRenderer({canvas})
renderee.setPixelRatio(2)
renderee.setSize(sizes.width,sizes.height);
renderee.render(scene, camera)

// controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
controls.enablePan= false;
controls.enableZoom= false;
controls.autoRotate = true;
controls.autoRotateSpeed= 8;

// Resize

window.addEventListener('resize', ()=> {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight
  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix()
  renderee.setSize(sizes.width, sizes.height)
})


const loop = () => {
  controls.update()
  renderee.render(scene, camera)
  window.requestAnimationFrame(loop)
}

loop()


// Timeline

const tl = gsap.timeline({defaults: {duration: 1}})
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})
tl.fromTo(".title", {opacity: 0}, {opacity: 1})


