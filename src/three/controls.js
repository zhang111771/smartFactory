import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {FlyControls } from 'three/examples/jsm/controls/FlyControls'
import {FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'

import CameraModule from './camera'
import rendererModule from './renderer'
import eventHub from '@/utils/EeventHub'
class ControlsModule{
    constructor(){
        this.setOrbitControls()
        eventHub.on('toggleControls',(name)=>{
            this[`set${name}Controls`]()
        })
    }
    setOrbitControls(){
       this.controls=new OrbitControls(CameraModule.activeCamera,rendererModule.renderer.domElement)
        this.controls.enableDamping=true
        this.controls.maxPolarAngle=Math.PI/2
        this.controls.minPolarAngle=0

    }
    setFlyControls(){
        this.controls=new FlyControls(CameraModule.activeCamera,rendererModule.renderer.domElement)
        this.controls.movementSpeed=100
        this.controls.rollSpeed =Math.PI/3
    }
    setFirstPersonControls(){
        this.controls=new FirstPersonControls(CameraModule.activeCamera,rendererModule.renderer.domElement)
        this.controls.movementSpeed=100
        this.controls.rollSpeed =Math.PI/3
    }
}
export default new ControlsModule()
