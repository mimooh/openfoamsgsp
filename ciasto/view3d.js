var scene, camera, renderer, controls, fireMesh, rings;

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

    //cube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), new THREE.MeshNormalMaterial());
    //scene.add(cube);
}
//}}}
function createSphere(x,y,color) {//{{{
	var geometry = new THREE.SphereGeometry(0.1, 20, 20 );
	var material = new THREE.MeshBasicMaterial( {color: color } );
	var sphere = new THREE.Mesh( geometry, material );
	geometry.translate(x, y, 0)
	scene.add(sphere);
}
//}}}

function rotateCube() {//{{{
    cube.rotation.x -= SPEED * 2;
    cube.rotation.y -= SPEED;
    cube.rotation.z -= SPEED * 3;
}
//}}}

function view3d() {//{{{
	if(scene === undefined) {
		createScene();
		createMeshes(); 
		animate();
	} else {
		removeMeshes();
		createMeshes(); 
		animate();
	}
}

//}}}
function moveDots() {//{{{
	_.each(rings, function(x) {
		console.log(x);
	});

}
//}}}
function animate() {//{{{
	requestAnimationFrame(animate);
	//if(fireMesh!=undefined) { animFire(); }
	controls.update();
	moveDots();
    //rotateCube();
	renderer.render( scene, camera );
}
//}}}
function createMeshes() {//{{{
	rings=[];
	for (var r=2; r<=2; r++) { 
		rings[r]=[];
		var count=r*10;
		var color = new THREE.Color( 0xffffff );
		color=color.setHex( Math.random() * 0xffffff );
		for (var i=0; i<count; i++) { 
			var x = r * Math.cos(i * 2*Math.PI / count);
			var y = r * Math.sin(i * 2*Math.PI / count);
			rings[r].push([x,y]);
			createSphere(x, y, color); 
		}
	}
}
//}}}

