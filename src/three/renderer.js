import * as THREE from 'three'
import {CSS3DRenderer} from 'three/examples/jsm/renderers/CSS3DRenderer'

const renderer=new THREE.WebGLRenderer({
    antialias:true,
    //闪烁处理depthbuffer
    logarithmicDepthBuffer:true,
physicallyCorrectLight:true
})
 renderer.setSize(window.innerWidth,window.innerHeight)
 renderer.shadowMap.enabled=true
 renderer.toneMapping=THREE.ACESFilmicToneMapping
 renderer.toneMappingExposure=0.2
 const css3drenderer=new CSS3DRenderer()
 css3drenderer.setSize(window.innerWidth,window.innerHeight)
 document.querySelector('#cssrender').appendChild(css3drenderer.domElement)
 export default {renderer,css3drenderer}