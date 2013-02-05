
// set the scene size

//	var WIDTH = window.innerWidth,
//	    HEIGHT = window.innerHeight;

	// set some camera attributes
//	var VIEW_ANGLE = 45,
//	    ASPECT = WIDTH/ HEIGHT,
//	    NEAR = 0.1,
//	    FAR = 10000;



	// create a WebGL renderer, camera
	// and a scene
//	var renderer = new THREE.WebGLRenderer();
//	var camera = new THREE.PerspectiveCamera(  VIEW_ANGLE,
//	                                ASPECT,
//	                                NEAR,
//	                                FAR  );
//	var scene = new THREE.Scene();

	// the camera starts at 0,0,0 so pull it back
//	camera.position.z = 300;

	// start the renderer
//	renderer.setSize(WIDTH, HEIGHT);
	
	var gameArea = new GameArea();
	var targets = { gameTable: [], table: [], flip: [], memory: []};
	var cardObjects = [];
	
	
	// get the DOM element to attach to
	// - assume we've got jQuery to hand
	var $container = $('#container');

	// attach the render-supplied DOM element
	//$container.append(gameArea.webGLRenderer.domElement);
	$container.append(gameArea.css3DRenderer.domElement);
	


	// create the sphere's material
	var sphereMaterial = new THREE.MeshLambertMaterial(
	{
	    color: 0xCC0000
	});

	// set up the sphere vars
	var radius = 50, segments = 16, rings = 16;

	// create a new mesh with sphere geometry -
	// we will cover the sphereMaterial next!
	var sphere = new THREE.Mesh(
	   new THREE.SphereGeometry(radius, segments, rings),
	   sphereMaterial);

	// add the sphere to the scene
	gameArea.scene.add(sphere);
	
	var cube = new THREE.Mesh(
		new THREE.PlaneGeometry(125, 175, 1, 1),
		sphereMaterial);
	
	cube.position.x += 200;
	
	gameArea.scene.add(cube);
	
	for( var i = 0; i < 12; i++){
		var card = document.createElement('div');
		card.className = 'card';
		
		card.style['width'] = '250px';
		card.style['height'] = '350px';
		card.id = 'card'+ i;
		
		
		
		
		
		
		/*
		card.style['backgroundColor'] = 'rgba (0, 127, 127, .5)';
		card.style['box-shadow'] = "0px 0px 20px 5px rgba(0,255,255,0.5)";
		card.style['border'] = "2px solid rgba(127,255,255,0.25)";
		card.style['cursor'] = "default";
		card.style['transition'] = "all 1s linear";
		card.style['background-color'] = "rgba(0,255,255,0.5)";
		card.style['-webkit-transition'] = "all 2s linear";
		card.style['-o-transition'] = "all 2s linear";
		card.style['-moz-transition:'] = "all 2s linear";
		card.style['-ms-transition'] = "all 2s linear";
		card.style['-kthtml-transition'] = "all 2s linear";
		*/
						/*

			.card:hover {
				box-shadow: 0px 0px 20px 5px rgba(255,255,255,0.5);
				border: 2px solid rgba(127,255,255,0.75);
				transition: all .5s linear;
				-webkit-transition: all .5s linear;
			    -o-transition: all .5s linear;
			    -moz-transition: all .5s linear;
			    -ms-transition: all .5s linear;
			    -kthtml-transition: all .5s linear;
			}
		border: 2px solid rgba(127,255,255,0.25);
		cursor: default;
		transition: all 1s linear;
		background-color: rgba(0,255,255,0.5);
		
		-webkit-transition: all 2s linear;
	    -o-transition: all 2s linear;
	    -moz-transition: all 2s linear;
	    -ms-transition: all 2s linear;
	    -kthtml-transition: all 2s linear;
	    transition: all 2s linear;
	}

	.card:hover {
		box-shadow: 0px 0px 20px 5px rgba(255,255,255,0.5);
		border: 2px solid rgba(127,255,255,0.75);
		transition: all .5s linear;
		-webkit-transition: all .5s linear;
	    -o-transition: all .5s linear;
	    -moz-transition: all .5s linear;
	    -ms-transition: all .5s linear;
	    -kthtml-transition: all .5s linear;
	}
		*/
		
		var nameElement = document.createElement('div');
		nameElement.className = 'name';
		nameElement.textContent = 'Yo';
		card.appendChild(nameElement);
	
		
		
		var description = document.createElement( 'div' );
		description.className = 'description';
		description.textContent = 'Desc';
		//card.appendChild( description);
		
		
		var object = new THREE.CSS3DObject( card );
		object.position.x = 50*i;
		object.position.y = 0;
		object.position.z = -1500;
		
		var clickFunc = function(){
			var myCard = card;
			var myCardObject = object;
			return function(){
				card.rotation = new THREE.Vector3( 1, 1, 0 ); 
				
				var target = new THREE.Object3D();
				target.position.x = myCardObject.position.x;
				target.position.y = myCardObject.position.y;
				target.position.z = myCardObject.position.z;
				
				target.rotation = new THREE.Vector3( 1, 1, 0 ); 
				
				transformOne(myCardObject, target, 1000);
			}
		}
		
		card.onclick = clickFunc();
		
		gameArea.scene.add(object);
		cardObjects.push(object);
	}
	
	// game table
	for (var i = 0; i < cardObjects.length; i ++){
		
		var object = new THREE.Object3D();
		object.position.x = ( i * 160) - 1000;
		object.position.y = 200;
		object.position.z = 1000;
		
		
		targets.gameTable.push(object);
	}
	
	// table
	for (var i = 0; i < cardObjects.length; i ++){
		
		var object = new THREE.Object3D();
		object.position.x = 50*i;
		object.position.y = 0;
		object.position.z = -1500;
		
		targets.table.push(object);
	}
	
		// flip
	for (var i = 0; i < cardObjects.length; i ++){
		
		var object = new THREE.Object3D();
		
		object.position.x = 50*i;
		object.position.y = 0;
		object.position.z = -1500;
		
		object.rotation = new THREE.Vector3( 1, 1, 0 ); 
		
		targets.flip.push(object);
	}
	
		var bottomLeft = {};
		bottomLeft.x = -800;
		bottomLeft.y =-450;
		bottomLeft.z = -1500;
	
	
	
	//memory
	var row = 0;
	for (var i = 1; i <= cardObjects.length; i ++){
		row++;
		
		
		var object = new THREE.Object3D();
		

		object.position.x = bottomLeft.x + (row*300);
		object.position.y = bottomLeft.y;// + (i*200);
		object.position.z = bottomLeft.z;
		
		
		
		if(i%4 == 0){
			bottomLeft.y += 500;
			row = 0;
		}
		
		
		

		
		targets.memory.push(object);
	}
	
	
	//transform( targets.gameTable, 5000 );


	// create a point light
	var pointLight = new THREE.PointLight( 0xFFFFFF );

	// set its position
	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;

	// add to the scene
	gameArea.scene.add(pointLight);


	// Add an event handler to the table button
	var button = document.getElementById( 'layout1' );
	button.addEventListener( 'click', function ( event ) {

		transform( targets.gameTable, 2000 );

	}, false );
	
	var button = document.getElementById( 'layout2' );
	button.addEventListener( 'click', function ( event ) {

		transform( targets.table, 2000 );

	}, false );

	var button = document.getElementById( 'layout3' );
	button.addEventListener( 'click', function ( event ) {

		transform( targets.flip, 2000 );

	}, false );
	
	var button = document.getElementById('layout4');
	button.addEventListener( 'click', function ( event) {
		
		transform(targets.memory, 2000);
		
	}, false);

	// draw!
	gameArea.animate();

function transformOne(object, target, duration){

	
	new TWEEN.Tween(object.position)
	.to( { x: target.position.x, y: target.position.y, z: target.position.z}, Math.random() * duration + duration)
	.easing( TWEEN.Easing.Exponential.InOut )
	.start();
	
	new TWEEN.Tween( object.rotation )
	.to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
	.easing( TWEEN.Easing.Exponential.InOut )
	.start();
	
		new TWEEN.Tween( this )
		.to( {}, duration * 2 )
		.onUpdate( gameArea.render )
		.start();
}
	
function transform( targets, duration ) {

	TWEEN.removeAll();

	for ( var i = 0; i < cardObjects.length; i ++ ) {

		var object = cardObjects[ i ];
		var target = targets[ i ];

		new TWEEN.Tween( object.position )
			.to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
			.easing( TWEEN.Easing.Exponential.InOut )
			.start();

		new TWEEN.Tween( object.rotation )
			.to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
			.easing( TWEEN.Easing.Exponential.InOut )
			.start();

	}

	new TWEEN.Tween( this )
		.to( {}, duration * 2 )
		.onUpdate( gameArea.render )
		.start();
}
