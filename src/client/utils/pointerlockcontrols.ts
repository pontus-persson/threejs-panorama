import {
	Euler,
	EventDispatcher,
	Vector3
} from 'three';

const _euler = new Euler( 0, 0, 0, 'YXZ' );
const _vector = new Vector3();

const _changeEvent = { type: 'change' }
const _lockEvent = { type: 'lock' }
const _unlockEvent = { type: 'unlock' }

const _PI_2 = Math.PI / 2;

class PointerLockControls extends EventDispatcher {

	
	private domElement: any;
	private isLocked: any = false;
	private minPolarAngle: any = 0; // radians
	private maxPolarAngle: any = Math.PI; // radians
	private camera: any;


	constructor( camera: any, domElement: any ) {
		
		super();

		if ( domElement === undefined ) {
			console.warn( 'THREE.PointerLockControls: The second parameter "domElement" is now mandatory.' );
			domElement = document.body;
		}

		this.domElement = domElement;
		this.camera = camera;

		this.connect();
	}

	
	onMouseMove( event: any ) {

		if ( this.isLocked === false ) return;

		const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		_euler.setFromQuaternion( this.camera.quaternion );

		_euler.y -= movementX * 0.002;
		_euler.x -= movementY * 0.002;

		_euler.x = Math.max( _PI_2 - this.maxPolarAngle, Math.min( _PI_2 - this.minPolarAngle, _euler.x ) );

		this.camera.quaternion.setFromEuler( _euler );

		this.dispatchEvent( _changeEvent );

	}

	onPointerlockChange() {

		if ( this.domElement.ownerDocument.pointerLockElement === this.domElement ) {

			this.dispatchEvent( _lockEvent );

			this.isLocked = true;

		} else {

			this.dispatchEvent( _unlockEvent );

			this.isLocked = false;

		}

	}

	onPointerlockError() {
		console.error( 'THREE.PointerLockControls: Unable to use Pointer Lock API' );
	}

	connect() {
		this.domElement.ownerDocument.addEventListener( 'mousemove', this.onMouseMove );
		this.domElement.ownerDocument.addEventListener( 'pointerlockchange', this.onPointerlockChange );
		this.domElement.ownerDocument.addEventListener( 'pointerlockerror', this.onPointerlockError );
	}

	disconnect() {
		this.domElement.ownerDocument.removeEventListener( 'mousemove', this.onMouseMove );
		this.domElement.ownerDocument.removeEventListener( 'pointerlockchange', this.onPointerlockChange );
		this.domElement.ownerDocument.removeEventListener( 'pointerlockerror', this.onPointerlockError );
	}

	dispose() {
		this.disconnect();
	}

	getObject() { // retaining this method for backward compatibility
		return this.camera;
	}

	getDirection() {
		const direction = new Vector3( 0, 0, - 1 );

		return _vector.copy( direction ).applyQuaternion( this.camera.quaternion );
	}

	moveForward( distance:number ) {
		// move forward parallel to the xz-plane
		// assumes this.camera.up is y-up
		_vector.setFromMatrixColumn( this.camera.matrix, 0 );
		_vector.crossVectors( this.camera.up, _vector );
		this.camera.position.addScaledVector( _vector, distance );
	}

	moveRight( distance:number ) {
		_vector.setFromMatrixColumn( this.camera.matrix, 0 );
		this.camera.position.addScaledVector( _vector, distance );
	}

	lock() {
		this.domElement.requestPointerLock();
	}

	unlock() {
		this.domElement.ownerDocument.exitPointerLock();
	}

}

export { PointerLockControls }