
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import eventHub from "@/utils/EeventHub";
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import * as THREE from 'three'
import gsap from 'gsap'
import CameraModule from "../camera";
import {CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer'
export default class City{
  constructor(scene) {
    // 载入模型
    this.scene = scene;
    this.loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./draco/");
    dracoLoader.setDecoderConfig({ type: "js" }); //使用兼容性强的draco_decoder.js解码器
    dracoLoader.preload();
    this.loader.setDRACOLoader(dracoLoader)
    this.loader.load('./model/floor2.glb',(gltf)=>{
      this.scene.add(gltf.scene)
      
      gltf.scene.traverse((child)=>{
     
        if(child.isMesh){

          child.material.emissiveIntensity=10
        }
        if(child.type==='Object3D'&&child.children.length===0){
          console.log(child)
        }
      })
      this.createTag()
    })    
  

 
  }
  createTag(){
    const element=document.createElement('div')
    element.className='elementTag'
    element.innerHTML=`
      <div class="elementContent">
        <h3>智慧工厂</h3>
        <p>温度：26°</p>
        <p>湿度：50%</p>

      </div>
    `
    const objectCSS3D=new CSS3DObject(element)
    this.scene.add(objectCSS3D)
  }
  update(){}

  
}