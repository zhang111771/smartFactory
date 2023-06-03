import * as THREE from 'three'
import ControlsModule from './controls'
import CameraModule from './camera'
import rendererModule from './renderer'
import scene from './scene'
import { updateMesh } from '../three/createMesh'
const clock=new THREE.Clock()
function animate(t){

  const time=clock.getDelta()
  ControlsModule.controls.update(time)
  updateMesh(time*2)
  rendererModule.renderer.render(scene,CameraModule.activeCamera)
  rendererModule.css3drenderer.render(scene,CameraModule.activeCamera)

  requestAnimationFrame(animate)
}
export default animate