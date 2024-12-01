// Importer Three.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';

// Créer une scène
const scene = new THREE.Scene();

// Ajouter une caméra
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);

// Créer un plan
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;

document.body.appendChild( renderer.domElement );


// en cas de changement de la tail de la fenetre 
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
});

// Lumière directionnelle
const lightD = new THREE.DirectionalLight(0xffffff, 0.8);
lightD.position.set(-5, 10, 5);
lightD.castShadow = true;
scene.add(lightD);

// Lumière ambiante
const lightA = new THREE.AmbientLight(0x404040, 0.5); // Couleur douce, intensité 1
scene.add(lightA); // Pas besoin de position

// Créer le sol
const planeGeometry = new THREE.PlaneGeometry(50, 20);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,
    roughness: 1,
    metalness: 1
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

// Positionner le sol
plane.rotation.x = -Math.PI / 2; // À plat
plane.position.y = -5;          // Sous l'objet

// Activer les ombres
plane.receiveShadow = true;

// Ajouter à la scène
scene.add(plane);


const geometry = new THREE.DodecahedronGeometry(0.5, 5);
const material = new THREE.MeshStandardMaterial({
    color: 0x00f0c0,
    metalness: 1,
    roughness: 0.2,
    emissive: 0x00f10 // Émet une lumière rouge
});
material.emissiveIntensity = 2; // Intensité plus forte

const cercler = new THREE.Mesh( geometry, material );
cercler.castShadow = true;
cercler.receiveShadow = true; // Si tu as un sol, il recevra les ombres

scene.add( cercler );

camera.position.z = 10;


let dircetion = 1;
const speed = 0.05;
let time = 0;

// Boucle d'animation
function animate() {
	requestAnimationFrame( animate );
    cercler.rotation.x += 0.01;
    cercler.rotation.y -= dircetion * speed;
    if (cercler.rotation.y > Math.PI * 2 || cercler.rotation.y < -Math.PI * 2) {
        dircetion *= -1;
    }
    cercler.position.y = Math.sin(time) * 3; // Mouvement fluide
    time += speed;
    renderer.render( scene, camera );
}


animate();