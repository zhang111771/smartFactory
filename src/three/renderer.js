import * as THREE from 'three'
import {CSS3DRenderer} from 'three/examples/jsm/renderers/CSS3DRenderer'

 class rendererModule{
    constructor(){
        this.renderer=new THREE.WebGLRenderer({
            antialias:true,
            //闪烁处理depthbuffer
            logarithmicDepthBuffer:true,
        physicallyCorrectLight:true
        })
         this.renderer.setSize(window.innerWidth,window.innerHeight)
         this.renderer.shadowMap.enabled=true
         this.renderer.toneMapping=THREE.ACESFilmicToneMapping
         this.renderer.toneMappingExposure=0.2
         this.css3drenderer=new CSS3DRenderer()
         this.css3drenderer.setSize(window.innerWidth,window.innerHeight)
         document.querySelector('#cssrender').appendChild(this.css3drenderer.domElement)
    }
 }
 export default new rendererModule()