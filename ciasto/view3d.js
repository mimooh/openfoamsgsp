var scene, camera, renderer, controls, fireMesh, rings, particles, spheres=[], frame=1, alpha=0, paused=0;

var LERP_STEPS = LS = 10;
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
	var grid = new THREE.GridHelper(100, 100, 100);
	grid.geometry.rotateX( Math.PI / 2 );
	//scene.add(grid);
	//scene.add(new THREE.AxesHelper());
}
//}}}
function createPoly(points) {//{{{
	var material = new THREE.LineBasicMaterial({ color: 0x555555});

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
	if(LS==0) { 
        LS=LERP_STEPS;
		if(frame<particles.length-1) { frame++; } else { frame=1; }
	}
	alpha = 1 / LS--; // 1/5, 1/4, 1/3, 1/2, 1/1
    for (var i=0; i<spheres.length; i++) {
		spheres[i].position.lerp(new THREE.Vector3(particles[frame][i]['x'], particles[frame][i]['y'], particles[frame][i]['z'] ), alpha);
    }

	requestAnimationFrame(loop);
	controls.update();
	renderer.render( scene, camera );
}
//}}}
function createMeshes() {//{{{
	//var color = new THREE.Color( 0xffffff );
	//color=color.setHex( Math.random() * 0xffffff );
	color=0xaa2288;
	//createPoly(particles[0]);

	createSphere(particles[0][0]['x'], particles[0][0]['y'], 0xff8800); 
	for (var i=1; i<particles[0].length; i++) { 
		createSphere(particles[0][i]['x'], particles[0][i]['y'], color); 
	}
	//}
}
//}}}
