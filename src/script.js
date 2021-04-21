import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('/textures/NormalMap.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const geometry = new THREE.SphereGeometry(0.5, 12, 12)

// Materials

const material = new THREE.MeshStandardMaterial()
material.color = new THREE.Color(0xff0000)
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture  // Custom texture

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


// Adds a custom light
const pointLight2 = new THREE.PointLight(0xff0000, 0.1)
pointLight2.position.set(-1.86, 1, -1.65)
pointLight2.intensity = 2
scene.add(pointLight2)
const light2 = gui.addFolder('Light 2')

// Add a controller top change vlue
light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.1)
light2.add(pointLight2.position, 'x').min(-6).max(3).step(0.1)
light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.1)
light2.add(pointLight2, 'intensity').min(0).max(10).step(0.1)

const light2color = {
    color: 0xff0000
}
light2.addColor(light2color, 'color').onChange(() => pointLight2.color.set(light2color.color))
const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1)
scene.add(pointLightHelper2)

// Ligt 3
// Adds a custom light
const pointLight3 = new THREE.PointLight(0xff0000, 0.1)
pointLight3.position.set(1.86, -1, -1.65)
pointLight3.intensity = 2
scene.add(pointLight3)
const light3 = gui.addFolder('Light 3')

// Add a controller top change vlue
light3.add(pointLight3.position, 'y').min(-3).max(3).step(0.1)
light3.add(pointLight3.position, 'x').min(-6).max(3).step(0.1)
light3.add(pointLight3.position, 'z').min(-3).max(3).step(0.1)
light3.add(pointLight3, 'intensity').min(0).max(10).step(0.1)

const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1)
scene.add(pointLightHelper3)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    // alpha: true // Background transparent
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()