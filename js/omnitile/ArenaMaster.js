'use strict'

function ArenaMaster (){
	var me = this;
	
	this.gameArea = new GameArea();	
	
	
	this.animate = function(){
	
		requestAnimationFrame( me.animate );
		me.gameArea.render();

		//TWEEN.update();
		//me.controls.update();
		console.log(me.gameArea.camera);

	}
	
	console.log('about to create cards');
	

	
	//this.createCards();
}

ArenaMaster.prototype.render = function() {
	gameArea.render();
}

ArenaMaster.prototype.initGame = function() {

	document.getElementById( 'container' ).appendChild( this.gameArea.renderer.domElement );
/*
	var newCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1000, 5000 );
	newCamera.position.z = 1800;
	console.log('camera position:');
	console.log(newCamera.position);
	this.gameArea.addCamera(newCamera);
*/
	window.addEventListener( 'resize', this.onWindowResize, false );
}

ArenaMaster.prototype.createCards = function(){
	for ( var i = 0; i < this.table.length; i ++ ) {

		var item = this.table[ i ];

		var element = document.createElement( 'div' );
		element.className = 'element';
		element.style.backgroundColor = 'rgba(256,256,256,' + ( Math.random() * 0.5 + 0.25 ) + ')';

		var number = document.createElement( 'div' );
		number.className = 'number';
		number.textContent = i + 1;
		element.appendChild( number );

		var symbol = document.createElement( 'div' );
		symbol.className = 'symbol';
		symbol.textContent = item[ 0 ];
		element.appendChild( symbol );

		var details = document.createElement( 'div' );
		details.className = 'details';
		details.innerHTML = item[ 1 ] + '<br>' + item[ 2 ];
		element.appendChild( details );

		var object = new THREE.CSS3DObject( element );
		object.position.x = 200;
		object.position.y = 200;
		object.position.z = 200;
		console.log('Adding object ' + object);
		this.gameArea.scene.add( object );

		this.objects.push( object );
	}
	console.log(this.objects);
}

	ArenaMaster.prototype.onWindowResize = function () {

		this.gameArea.camera.aspect = window.innerWidth / window.innerHeight;
		this.gameArea.camera.updateProjectionMatrix();

		this.gameArea.renderer.setSize( window.innerWidth, window.innerHeight );

	}