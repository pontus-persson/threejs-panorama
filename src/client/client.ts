import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'
import { io } from 'socket.io-client'
import Keyboard from './utils/keyboard';
import { PointerLockControls } from './utils/pointerlockcontrols.js';

const loader = new THREE.CubeTextureLoader();
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
const keyboard = new Keyboard();


const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.y = 1;
camera.position.z = 0;


renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new PointerLockControls(camera, renderer.domElement);


// Plane
// const planeGeometry = new THREE.PlaneGeometry(100, 100, 50, 50)
// const materialPlane = new THREE.MeshBasicMaterial({
//     color: 0x00ff00,
//     wireframe: true,
// })
// const plane = new THREE.Mesh(planeGeometry, materialPlane)
// plane.rotateX(-Math.PI / 2)
// scene.add(plane)

// axis helper
// scene.add(new THREE.AxesHelper(5))

//cubemap
const path = './assets/';
const format = '.jpg';
const urls = [
    path + '1' + format, path + '3' + format,
    path + 'top' + format, path + 'bottom' + format,
    path + '4' + format, path + '2' + format,
];
const reflectionCube = new THREE.CubeTextureLoader().load( urls );
const refractionCube = new THREE.CubeTextureLoader().load( urls );
refractionCube.mapping = THREE.CubeRefractionMapping;
scene.background = reflectionCube;
//lights
const ambient = new THREE.AmbientLight( 0xffffff );
scene.add( ambient );
const pointLight = new THREE.PointLight( 0xffffff, 2 );
scene.add( pointLight );


// const geometry = new THREE.BoxGeometry( 200, 200, 200 );
// const material = new THREE.MeshBasicMaterial( { map: texture } );
// const controls = new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry()
// const material = new THREE.MeshBasicMaterial({
//     color: 0x00ff00,
//     wireframe: true,
// })
// const textureCube = loader.load( [
// 	'image.jpg'
// ] );

const texture = new THREE.TextureLoader().load( './assets/image.jpg' );
const material = new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture } );

const myObject3D = new THREE.Object3D()
myObject3D.position.x = Math.random() * 4 - 2
myObject3D.position.z = Math.random() * 4 - 2

// const gridHelper = new THREE.GridHelper(10, 10)
// gridHelper.position.y = -0.5
// scene.add(gridHelper)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const onKeyDown = function (event: KeyboardEvent) {
    switch (event.code) {
        case 'KeyW':
            controls.moveForward(0.25)
            break
        case 'KeyA':
            controls.moveRight(-0.25)
            break
        case 'KeyS':
            controls.moveForward(-0.25)
            break
        case 'KeyD':
            controls.moveRight(0.25)
            break
    }
}
document.addEventListener('keydown', onKeyDown, false)




const overlay = document.getElementById('overlay') as HTMLDivElement
overlay.addEventListener( 'click', function () {
    controls.lock();
} );
controls.addEventListener( 'lock', function () {
    overlay.style.display = 'none';
} );
controls.addEventListener( 'unlock', function () {
    overlay.style.display = '';
} );


let scale = 1;
// overlay.addEventListener("scroll", zoom);
// window.addEventListener("scroll", zoom);
window.onwheel = zoom;
// window.onscroll = zoom;
function zoom(event: any) {
    // event.preventDefault();
    scale += event.deltaY * -0.01;
  
    // Restrict scale
    scale = Math.min(Math.max(1, scale), 6);

    camera.zoom = scale;
    camera.updateProjectionMatrix();
}



// let myId = ''
// let timestamp = 0
// const clientCubes: { [id: string]: THREE.Mesh } = {}
// const socket = io()
// socket.on('connect', function () {
//     console.log('connect')
// })
// socket.on('disconnect', function (message: any) {
//     console.log('disconnect ' + message)
// })
// socket.on('id', (id: any) => {
//     myId = id
//     setInterval(() => {
//         socket.emit('update', {
//             t: Date.now(),
//             p: myObject3D.position,
//             r: myObject3D.rotation,
//         })
//     }, 50)
// })
// socket.on('clients', (clients: any) => {
//     // let pingStatsHtml = 'Socket Ping Stats<br/><br/>'
//     Object.keys(clients).forEach((p) => {
//         timestamp = Date.now()
//         // pingStatsHtml += p + ' ' + (timestamp - clients[p].t) + 'ms<br/>'
//         if (!clientCubes[p]) {
//             clientCubes[p] = new THREE.Mesh(geometry, material)
//             clientCubes[p].name = p
//             scene.add(clientCubes[p])
//         } else {
//             if (clients[p].p) {
//                 new TWEEN.Tween(clientCubes[p].position)
//                     .to(
//                         {
//                             x: clients[p].p.x,
//                             y: clients[p].p.y,
//                             z: clients[p].p.z,
//                         },
//                         50
//                     )
//                     .start()
//             }
//             if (clients[p].r) {
//                 new TWEEN.Tween(clientCubes[p].rotation)
//                     .to(
//                         {
//                             x: clients[p].r._x,
//                             y: clients[p].r._y,
//                             z: clients[p].r._z,
//                         },
//                         50
//                     )
//                     .start()
//             }
//         }
//     })
//     // ;(document.getElementById('pingStats') as HTMLDivElement).innerHTML = pingStatsHtml
// })
// socket.on('removeClient', (id: string) => {
//     scene.remove(scene.getObjectByName(id) as THREE.Object3D)
// })

const stats = Stats()
document.body.appendChild(stats.dom)

const animate = function () {
    requestAnimationFrame(animate)

    // if(keyboard.keyPressed('w')) {
    //     myObject3D.position.x += 0.05;
    // } else if(keyboard.keyPressed('s')) {
    //     myObject3D.position.x -= 0.05;
    // }

    // if(keyboard.keyPressed('a')) {
    //     myObject3D.position.z += 0.05;
    // } else if(keyboard.keyPressed('d')) {
    //     myObject3D.position.z -= 0.05;
    // }

    // controls.update()

    TWEEN.update()

    // if (clientCubes[myId]) {
        // camera.lookAt(clientCubes[myId].position)
        // camera.lookAt(clientCubes[myId].position)
        // camera.position.set(clientCubes[myId].position.x, clientCubes[myId].position.y, clientCubes[myId].position.z)
    // }

    render()

    stats.update()
}

const render = function () {
    renderer.render(scene, camera)
}

animate()
