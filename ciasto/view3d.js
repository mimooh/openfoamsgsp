var scene, camera, renderer, controls, fireMesh;
var win=[ $(window).width()-30, $(window).height()-50];

function removeMeshes() { //{{{
	while (scene.children.length > 0){ 
		scene.remove(scene.children[0]); 
	}
}
//}}}
function createScene() { //{{{
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setClearColor(0x444444);
	renderer.setSize(win[0], win[1]);
	$('view3d').append(renderer.domElement);

	camera = new THREE.OrthographicCamera(win[0]/-50, win[0]/50, win[1]/50, win[1]/-50, 1, 1000);
	camera.position.set(200, 100, -200);
	
	controls = new THREE.OrbitControls( camera, renderer.domElement );

	scene = new THREE.Scene();
	scene.add(new THREE.AxesHelper());
}
//}}}
function polyGeometry(geom) {//{{{
	// random prevents z-fighting
	var random=Math.random()/100;
	var extrudeSettings = { steps: 1, depth: (geom.z[1]-geom.z[0])/100+random, bevelEnabled: false };
	var shape = new THREE.Shape();
	var o=geom.polypoints[0];
	shape.moveTo(-o[0]/100+random, o[1]/100+random);
	_.each(geom.polypoints, function(p) {
		shape.lineTo(-p[0]/100+random, p[1]/100+random);
	});
	shape.lineTo(-o[0]/100+random, o[1]/100+random);
	var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings );
	geometry.translate(0, random, geom.z[0]/100+random);
	geometry.rotateX(THREE.Math.degToRad(270));
	if(geom.type!='fire') { scene.add(new THREE.LineSegments(new THREE.EdgesGeometry( geometry ), new THREE.LineBasicMaterial( { color: gg[geom.letter].c }))); }
	return geometry;
}
//}}}
function createSphere() {//{{{
	var geometry = new THREE.SphereGeometry( 1, 10, 10 );
	var material = new THREE.MeshBasicMaterial( {color: 0xff0000 } );
	var sphere = new THREE.Mesh( geometry, material );
	scene.add(sphere);
}
//}}}
function createWireFrame(geom) {//{{{
	polyGeometry(geom);
}
//}}}
function createBlock(geom, alpha=0) {//{{{
	if (alpha==0) { var transparent=true; } else { var transparent=false; }
	if(geom.letter=='c') { geom.z[1]+=1; }
	var material = new THREE.MeshBasicMaterial({
		color: gg[geom.letter].c,
		opacity: 0.4,
		//side: THREE.DoubleSide,
		transparent: transparent
	});
	var geometry=polyGeometry(geom);
	var mesh = new THREE.Mesh( geometry, material );
	if(geom.type=='fire') { fireMesh=mesh; }
	scene.add(mesh) ;
}
//}}}

function view3d() {//{{{
	if(scene === undefined) {
		$.getScript("three.r109.min.js", function(){
			$.getScript("OrbitControls.js", function(){
				createScene();
				createMeshes(); 
				animate();
			});
		});
	} else {
		removeMeshes();
		createMeshes(); 
		animate();
	}
}

//}}}
function animate() {//{{{
	requestAnimationFrame(animate);
	//if(fireMesh!=undefined) { animFire(); }
	controls.update();
	renderer.render( scene, camera );
}
//}}}
function createCircle(radius, translate) { //{{{
	var geometry = new THREE.CircleGeometry(radius, 12 );
	var color = new THREE.Color( 0xffffff );
	color=color.setHex( Math.random() * 0xffffff );

	var material = new THREE.MeshBasicMaterial( { opacity: 0.5, color: color, transparent: 1, side: THREE.DoubleSide } );
	var circle = new THREE.Mesh( geometry, material );

	geometry.translate(0, 0, translate)

	scene.add(circle);
}
//}}}
function createMeshes() {//{{{
	var count=20;
    for (var i=1; i<count; i++) { 
		createCircle(count-i, 0.1*i);
	}

}
//}}}
view3d();
