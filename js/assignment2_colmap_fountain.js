import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';

const container = document.getElementById( 'container1' );
container.style.position = 'relative';
let renderer, stats, gui;
let scene, camera, controls, points;

function initScene() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	controls = new OrbitControls( camera, renderer.domElement );
	controls.autoRotate = true;
	controls.minDistance = 2;
	controls.maxDistance = 10;
	controls.addEventListener( 'change', function() { renderer.render( scene, camera ); });
	
	// let geometry = new THREE.BoxGeometry( 1, 1, 1 );
	// let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	let material = new THREE.PointsMaterial({size: 0.1, vertexColors: THREE.vertexColors});
	// cube = new THREE.Mesh( geometry, material );
	const loader = new PLYLoader()
	loader.load(
    '../assignments/assignment2/assets/results/fountain-P11/point-clouds/colmap_fountain.ply',
    function (geometry) {
		points = new THREE.Points(geometry, material);
		scene.add(points);
        // geometry.computeVertexNormals()
        // const mesh = new THREE.Mesh(geometry, material)
        // mesh.rotateX(-Math.PI / 2)
        // scene.add(mesh)
		camera.position.set(0,0,10);
    }
)
	// scene.add( mesh );
	
	camera.position.z = 5;
}

function initSTATS() {
	stats = new Stats();
	stats.showPanel( 0 );
	stats.dom.style.position = 'absolute';
	stats.dom.style.top = 0;
	stats.dom.style.left = 0;
	container.appendChild( stats.dom );
}

function initGUI() {
	gui = new GUI();
	// points = scene.getObjectByName( "points" );
	gui.add( points.position, 'x', -1, 1 );
	gui.add( points.position, 'y', -1, 1 );
	gui.add( points.position, 'z', -1, 1 );
	gui.domElement.style.position = 'absolute';
	gui.domElement.style.top = '0px';
	gui.domElement.style.right = '0px';
	container.appendChild( gui.domElement );
}

function animate() {
	requestAnimationFrame( animate );

	points.rotation.x += 0.01;
	points.rotation.y += 0.01;

	renderer.render( scene, camera );
	stats.update();
	controls.update();
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
};

window.addEventListener( 'resize', onWindowResize, false );

initScene();
initSTATS();
// initGUI();
animate();