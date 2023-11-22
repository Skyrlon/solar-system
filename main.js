import * as THREE from 'three';

const sunRealRadius = 696342
const sunRadius = 100
const mercuryRadius = 2439.7 * sunRadius / sunRealRadius
const sunMercuryDistance = 150

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//SUN 

const sunGeometry = new THREE.SphereGeometry(sunRadius, sunRadius, sunRadius);
const sunMaterial = new THREE.MeshBasicMaterial({
    color: "yellow",
});

const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);


//MERCURY

const mercuryGeometry = new THREE.SphereGeometry(mercuryRadius, mercuryRadius, mercuryRadius);
const mercuryMaterial = new THREE.MeshBasicMaterial({
    color: "red"
});
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
scene.add(mercury);

mercury.position.set(sunMercuryDistance, 0, 0)

const axesHelper = new THREE.AxesHelper(500);
scene.add(axesHelper);

//PIVOT
const pivotPoint = new THREE.Object3D();
const pivotOrigin = new THREE.Mesh(new THREE.SphereGeometry(0, 0, 0), new THREE.MeshBasicMaterial({
    color: "blue"
}))
scene.add(pivotOrigin)
pivotOrigin.add(pivotPoint)
pivotPoint.add(mercury)


//SET CAMERA POSITION
camera.position.x = 100;
camera.position.y = 100;
camera.position.z = 200;
camera.lookAt(scene.position);


function animate() {
    requestAnimationFrame(animate);
    pivotPoint.rotation.y += 0.005;
    sun.rotation.y += 0.005;
    renderer.render(scene, camera);
}

animate();