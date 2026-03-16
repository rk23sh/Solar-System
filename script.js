import * as THREE from 'three'
import { getSphere, getSolarBody } from './component';

const w = innerWidth;
const h = innerHeight;
const canvas = document.querySelector("#c");
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas
});
renderer.setSize(w, h);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;

const scene = new THREE.Scene();
const texture = new THREE.TextureLoader().load('stars.jpg');
scene.background = texture;

const sun = getSolarBody(2, 0, 0, 0, 'sun.jpg', renderer);
scene.add(sun);

const earth = getSolarBody(0.05, -0.5, -0.3, 3, 'earth-day.jpg', renderer);
const earthOrbit = new THREE.Object3D()
earthOrbit.add(earth);
scene.add(earthOrbit);


// lighting
// const light = new THREE.PointLight(0xffffff, 10);
// light.position.set(1, 1, 2.5);
// scene.add(light);


// this is lowest level
function renderAnimation(time){
    time = time / 1000;
    sun.rotation.y = time * 0.04;
    earth.rotation.y = time * 1;
    earthOrbit.rotation.y = time * 0.3;
    renderer.render(scene, camera);
    const nextFrame = renderAnimation;
    requestAnimationFrame(nextFrame);
}

renderAnimation();