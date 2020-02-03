var scene, camera, renderer, controls, fireMesh, rings, particles, spheres=[], frame=1, paused=0;

var SPEED = 0.01;
var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;
$(function()  { view3d(); });

$(this).keydown((e) => { if (e.key== 'a') { if(paused==1) { paused=0; loop(); } else { paused=1; } } });

function removeMeshes() { //{{{
	while (scene.children.length > 0){ 
		scene.remove(scene.children[0]); 
	}
}
//}}}

function createScene() { //{{{
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setClearColor(0x444444);
	renderer.setSize(WIDTH, HEIGHT);
	$('body').append(renderer.domElement);
	scene = new THREE.Scene();
	camera = new THREE.OrthographicCamera(WIDTH/-200, WIDTH/200, HEIGHT/200, HEIGHT/-200, 1, 200);
    camera.position.set(0, 0, 10 );
    camera.lookAt(scene.position);
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	scene.add(new THREE.AxesHelper());
}
//}}}
function createTriangle(points) {//{{{
	var material = new THREE.LineBasicMaterial({ color: 0xaaaaaa });

	var geometry = new THREE.Geometry();
	for (var i=0; i<points.length; i++) {
		geometry.vertices.push( new THREE.Vector3( points[i][0], points[i][1], 0 ));
	}
	geometry.vertices.push( new THREE.Vector3(points[0][0], points[0][1], 0 ));
	var line = new THREE.Line( geometry, material );
	scene.add( line );
}
//}}}
function createSphere(x,y,color) {//{{{
	var geometry = new THREE.SphereGeometry(0.03, 20, 20 );
	var material = new THREE.MeshBasicMaterial( {color: color } );
	var sphere = new THREE.Mesh( geometry, material );
	sphere.position.x=x;
	sphere.position.y=y;
	sphere.position.z=0;
	spheres.push(sphere);
	scene.add(sphere);
}
//}}}

function view3d() {//{{{
	$.getJSON( "ciasto.json", function( dots) { 
		particles=dots;
		createScene();
		createMeshes(); 
		loop();
	});
}

//}}}
function loop() {//{{{
    if(paused==1) { return; }

    for (var i=0; i<spheres.length; i++) {
		spheres[i].position.lerp(new THREE.Vector3(particles[1][i][0], particles[1][i][1], 0 ), 0.1);
    }
    if(frame<particles.length-2) { frame++; } else { frame=1; }
	requestAnimationFrame(loop);
	controls.update();
	renderer.render( scene, camera );
}
//}}}
function createMeshes() {//{{{
	var color = new THREE.Color( 0xffffff );
	color=color.setHex( Math.random() * 0xffffff );
	createTriangle(particles[0]);
	for (var i=0; i<particles[0].length; i++) { 
		createSphere(particles[0][i][0], particles[0][i][1], color); 
	}
	//}
}
//}}}
