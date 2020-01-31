
var scene, camera, renderer, controls, fireMesh, rings, particles, spheres=[], frame=1;
var t = 0, dt = 0.001;                   // t (dt delta for demo)

var SPEED = 0.01;
var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;
$(function()  { view3d(); });

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

    //camera = new THREE.PerspectiveCamera(70, WIDTH/HEIGHT, 1, 10);
	camera = new THREE.OrthographicCamera(WIDTH/-50, WIDTH/50, HEIGHT/50, HEIGHT/-50, 1, 100);

    camera.position.set(0, 0, 10 );
    camera.lookAt(scene.position);
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	scene.add(new THREE.AxesHelper());
}
//}}}
function createSphere(x,y,color) {//{{{
	var geometry = new THREE.SphereGeometry(0.1, 20, 20 );
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
function moveDots() {//{{{

}
//}}}
function loop() {//{{{
	for (var i=0; i<spheres.length; i++) {
		var newX = lerp(spheres[i].position.x, particles[frame+1][i][0], ease(t));   // interpolate between a and b where
		var newY = lerp(spheres[i].position.y, particles[frame+1][i][1], ease(t));   // interpolate between a and b where
		spheres[i].position.set(newX, newY, 0);
		//spheres[i].position.y = particles[frame+1][i][1];
	}
	console.log(t);
	t += dt;
	if (t <= 0 || t >=1) dt = -dt;        // ping-pong for demo

	if(frame<particles.length-2) { frame++; } else { frame=1; }

	requestAnimationFrame(loop);
	controls.update();
	moveDots();
    //rotateCube();
	renderer.render( scene, camera );
}
//}}}
function createMeshes() {//{{{
	var color = new THREE.Color( 0xffffff );
	color=color.setHex( Math.random() * 0xffffff );
	for (var i=0; i<particles[0].length; i++) { 
		createSphere(particles[0][i][0], particles[0][i][1], color); 
	}
	//}
}
//}}}
function lerp(a, b, t) {return a + (b - a) * t}
    
// example easing function (quadInOut, see link above)
function ease(t) { return t<0.5 ? 2*t*t : -1+(4-2*t)*t}


