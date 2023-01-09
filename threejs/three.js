import './style.css'

import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


//basics
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1,1000 )
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})
//setting render set
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);

//camera
camera.position.setZ(100);
camera.position.setY(40);
camera.position.setX(-40);


renderer.render(scene,camera)

//model loading
const gltfLoader = new GLTFLoader();
gltfLoader.load('./model/bunnybadge.gltf',(gltf) => {
    gltf.scene.scale.set(4,4,4);

    const root = gltf.scene;
    scene.add(root)})
gltfLoader.load('./model/buliding.gltf',(gltf)=>{
    gltf.scene.scale.set(2,2,2)

    const root = gltf.scene;
    scene.add(root)
})

/*gltfLoader.load('./model/studioapart.gltf',(gltf)=>{
    gltf.scene.scale.set(6,6,6)

    const root = gltf.scene;
    scene.add(root)
})*/


//torus
const  geometry = new THREE.TorusGeometry(15,3,20,100);
const material = new THREE.MeshStandardMaterial({color: 0xffb533});
const torus = new THREE.Mesh(geometry,material);
torus.position.set(-60,18,10);

scene.add(torus)


//random generator
function addstar(){
    const geometry = new THREE.SphereGeometry(5,32,16);
    const material = new THREE.MeshStandardMaterial(0X33fff9);
    const star = new THREE.Mesh(geometry,material);

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000));
    star.position.set(x,y,z);
    scene.add(star);


}
Array(900).fill().forEach(addstar);

//lights
const pointLight = new THREE.PointLight(0XFFFFFF)
pointLight.position.set( 10,30,30)
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xFFFFFF,0.5);
scene.add(ambientLight);


//helpers
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(1000,50)
scene.add(lightHelper,gridHelper)



const controls = new OrbitControls(camera,renderer.domElement);


//Background
const spaceTexture = new THREE.TextureLoader().load('public/Assets/silk.png');
scene.background = spaceTexture;


//billieCube
const myTexture = new THREE.TextureLoader().load('billie.png');
const billieCube = new THREE.Mesh(
    new THREE.BoxGeometry(10,10,10),
    new THREE.MeshBasicMaterial({map: myTexture})
);
scene.add(billieCube);


function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    /*moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    jeff.rotation.y += 0.01;
    jeff.rotation.z += 0.01;*/

    camera.position.z = t * -0.07;
   /* camera.position.x = t * 0.02;
    camera.rotation.y = t * 0.02;*/
}

document.body.onscroll = moveCamera;
moveCamera();



function animate(){
    requestAnimationFrame(animate);

    torus.rotation.x +=0.01;
    torus.rotation.y +=0.01;
    torus.rotation.z +=0.01;
    //to rotate the background
    // spaceTexture.rotation +=0.01;
    billieCube.position.set(0,7,50);
    billieCube.rotation.z +=0.01;




    controls.update()

    renderer.render(scene,camera);

}

animate()