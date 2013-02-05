'use strict'

function GameArea (){
	var me = this;
	
	me.width = window.innerWidth,
    me.height = window.innerHeight;

	// set some camera attributes
	var viewAngle = 45,
	    aspect = me.width/ me.height,
	    near = 0.1,
	    far = 10000;
	
	
	me.css3DRenderer = new THREE.CSS3DRenderer();
	me.webGLRenderer = new THREE.WebGLRenderer();
	me.camera = new THREE.PerspectiveCamera(  viewAngle,
	                                aspect,
	                                near,
	                                far  );
	me.scene = new THREE.Scene();
	
	// the camera starts at 0,0,0 so pull it back
	me.camera.position.z = 300;

	// start the renderer
	me.webGLRenderer.setSize(me.width, me.height);
	me.css3DRenderer.setSize(me.width, me.height);
	
	me.controls = new THREE.TrackballControls( me.camera, me.css3DRenderer.domElement );

	me.controls.rotateSpeed = 1.0;
	me.controls.zoomSpeed = 1.2;
	me.controls.panSpeed = 0.8;

	me.controls.noZoom = false;
	me.controls.noPan = false;

	me.controls.staticMoving = true;
	me.controls.dynamicDampingFactor = 0.3;

	me.controls.keys = [ 65, 83, 68 ];

	me.controls.addEventListener( 'change', me.render );
	
	me.scene.add(me.camera);
	
	
	
	
	me.render = function(){
		me.webGLRenderer.render(me.scene, me.camera);
		me.css3DRenderer.render(me.scene, me.camera);
	}
	
	me.animate = function animate() {
		requestAnimationFrame( animate );
		//me.controls.update();
		TWEEN.update();
		me.render(me.scene, me.camera);
		
		console.log(me.scene);
	}
}