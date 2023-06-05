
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import eventHub from "@/utils/EeventHub";
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import * as THREE from 'three'
import gsap from 'gsap'
import CameraModule from "../camera";
import {CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer'
import { PointsMaterial } from "three";
import fragmentShader from '../../shader/fighter/fragmentShader.glsl'
import vertexShader from '../../shader/fighter/vertexShader.glsl'

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
    this.floor1Group
    this.floor2Group
    this.wallGroup
    this.floor2Tags=[]
    this.loader.load('./model/floor2.glb',(gltf)=>{
      
      this.floor2Group=gltf.scene
      let array=['小型会议室','核心科技室','科技展台','设计总监办公室']
      gltf.scene.traverse((child)=>{
     
        if(child.isMesh){

          child.material.emissiveIntensity=10
        }
        if(array.indexOf(child.name)!=-1){
         const css3dObject= this.createTag(child)
         css3dObject.visible=false
         this.floor2Tags.push(css3dObject)
         this.floor2Group.add(css3dObject)
        }
      })
      this.floor2Group.visible=false
      this.scene.add(this.floor2Group)
      
      
    })
    this.loader.load('./model/floor1.glb',(gltf)=>{
      this.floor1Group=gltf.scene
      gltf.scene.traverse((child)=>{
        if(child.isMesh){

          child.material.emissiveIntensity=15
        }
      })
      // this.showFighter()
      this.floor1Group.visible = false;
      this.scene.add(gltf.scene)
    })    
    this.loader.load('./model/wall.glb',(gltf)=>{
      this.wallGroup=gltf.scene
      this.scene.add(gltf.scene)
    
     
    }) 
    this.loader.load('./model/Fighter.glb',(gltf)=>{
      this.fighterGroup=gltf.scene
      this.fighterGroup.visible=false
      scene.add(this.fighterGroup)
      this.fighterGroup.position.set(3,42,68)

      this.fighterGroup.traverse((child)=>{
        if(child.isMesh){
          child.material.emissiveIntensity=15
          child.position2 = child.position.clone();
        }
      })

      const mouse={}
      this.raycaster=new THREE.Raycaster()
      //事件的监听
      window.addEventListener('click',(event)=>{
          mouse.x=(event.clientX/window.innerWidth)*2-1
          mouse.y=1-(event.clientY/window.innerHeight)*2
          this.raycaster.setFromCamera(mouse,CameraModule.activeCamera)
          event.mesh=this.mesh
          event.alarm=this
          const intersects=this.raycaster.intersectObject(this.fighterGroup)
          if(intersects.length>0){
             console.log(111)
             if(this.floor2Group.visible){
              this.floor2Group.visible=false
              this.floor2Tags.forEach((item)=>{
                item.visible=false
              })
             }else{
              this.floor2Group.visible=true
              this.floor2Group.visible = true;
              this.floor2Tags.forEach((tag) => {
                tag.visible = true;
              });
             }
          }
          
      })
      // this.showFighter();
   
    })   

    this.initEvent()
  

 
  }
  
  createTag(object3d){
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
    objectCSS3D.scale.set(0.2,0.2,0.2)
    objectCSS3D.position.copy(object3d.position)
    // this.scene.add(objectCSS3D)
    return objectCSS3D
  }
  update(time) {
    if (this.mixer) {
      // console.log(time);
      this.mixer.update(time);
    }
  }
  showFloor1(){
    this.floor1Group.visible=true
  }
  showFloor2(){
    this.floor2Group.visible=true
    this.fighterGroup.visible=true
    this.floor2Tags.forEach((item)=>{
      item.visible=true
    })

  }
  hideFloor1(){
    this.floor1Group.visible=false
  }
  hideFloo2(){
    this.floor2Group.visible=false
    this.fighterGroup.visible=false
    this.floor2Tags.forEach((item)=>{
      item.visible=false
    })
  }
  hideWall(){
    this.wallGroup.visible=false
  }
  showWall(){
    this.wallGroup.visible=true
  }
  showAll(){
    this.showFloor1()
    this.showFloor2()
    this.showWall()
    gsap.to(this.wallGroup.position,{
      y:200,
      duration:1,
   
    })
    gsap.to(this.floor2Group.position,{
      y:100,
      duration:1,
      delay:1
    })
    eventHub.on('hideAll',()=>{
      console.log(111)
      gsap.to(this.wallGroup.position,{
        y:0,
        duration:1,
        delay:1,
        onComplete:()=>{
          this.hideFloor1()
          this.hideFloo2()
        }
      })
      gsap.to(this.floor2Group.position,{
        y:0,
        duration:1,
        
      })
    })

  }

  
  initEvent(){
    eventHub.on('showFloor1',()=>{
      this.showFloor1()
      this.hideWall()
      this.hideFloo2()
    })
    eventHub.on('showFloor2',()=>{
      this.showFloor2()
      this.hideWall()
      this.hideFloor1()
    })
    eventHub.on('showWall',()=>{
      this.hideFloor1()
      this.showWall()
      this.hideFloo2()
    })
    eventHub.on('showAll',()=>{
      this.showAll()
    })
    let isFlat=false
    eventHub.on('flatFighter',()=>{
      //将飞机展成立方体
      //获取立方体的点位置
      const positions=[]
      for(var i=0;i<5;i++){
        for(var j=0;j<5;j++){
          positions.push(new THREE.Vector3(i*2-2,0,j*2-2))
        }
      }
      

      if(!isFlat){
        let n=0
        this.fighterGroup.traverse((child)=>{
 
          if(child.isMesh){
            positions[n].multiplyScalar(20)
            // child.position2=child.position.clone()
            gsap.to(child.position,{
              x:positions[n].x,
              z:positions[n].z,
              duration:1
            })
            n++
          }
        })
        isFlat=true
      }else{
        this.fighterGroup.traverse((child)=>{
          console.log(child)
          if(child.isMesh){
            console.log(1)
            gsap.to(child.position,{
              x:child.position2.x,
              z:child.position2.z,
              duration:1
            })
         
          }
        })
        isFlat=false

      }
      
    })
    eventHub.on('pointsFighter',()=>{
      this.createPoints(this.fighterGroup)
    })
    eventHub.on('pointsBack',()=>{
      this.pointsBack()
    })
    eventHub.on('pointsBlast',()=>{
      this.pointsBlast()
    })
  }
  pointsBlast(){
    this.fighterPointsGroup.traverse((child)=>{
      if(child.isPoints){
        let randomPositionArray=new Float32Array(
          child.geometry.attributes.position.count*3
        )
        for(let i=0;i<child.geometry.attributes.position.count;i++){
          randomPositionArray[i*3+0]=(Math.random()*2-1)*10;
          randomPositionArray[i*3+1]=(Math.random()*2-1)*10+50;
          randomPositionArray[i*3+2]=(Math.random()*2-1)*10;
          
        }
        child.geometry.setAttribute('aPosition',new THREE.BufferAttribute(randomPositionArray,3))
        gsap.to(child.material.uniforms.uTime,{
          value:10,
          duration:10
        })
      }
    })
  }
  showFighter(){
    this.floor1Group&&(this.floor1Group.visible=false)
    this.floor2Group&&(this.floor2Group.visible=false)
    this.wallGroup&&(this.wallGroup.visible=false)

    this.fighterGroup.visible=true
  }
  createPoints(object3d){
    if(!this.fighterPointsGroup){
      this.fighterPointsGroup=this.transformPoints(object3d)
      this.fighterPointsGroup.position.set(0,50,0)
      this.scene.add(this.fighterPointsGroup)
    }
  
  }
  transformPoints(object3d){
    //创建纹理图像
    const texture=new THREE.TextureLoader().load('./assets/particles/1.png')
  
    const group=new THREE.Group()
    
    function createPoints(object3d,newObjct3d){
      if(object3d.children.length>0){
        object3d.children.forEach((child)=>{
          if(child.isMesh){
            const color=new THREE.Color(
              Math.random(),
              Math.random(),
              Math.random()
            )
            // const material=new PointsMaterial({
            //   size:0.1,
            //   color:color,
            //   map:texture,
            //   transparent:true,
            //   depthWrite:false,
            //   depthTest:false,
            //   blending:THREE.AdditiveBlending
            // })
            const material=new THREE.ShaderMaterial({
              vertexShader:vertexShader,
              fragmentShader:fragmentShader,
              uniforms:{
                uColor:{value:color},
                uTexture:{value:texture},
                uTime:{
                  value:0
                }
              },
              transparent:true,
              blending:THREE.AdditiveBlending,
              depthTest:false
            })

            const points=new THREE.Points(child.geometry,material)
            points.position.copy(child.position)
            points.rotation.copy(child.rotation)
            points.scale.copy(child.scale)
            newObjct3d.add(points)
            createPoints(child,points)
          }
        })
      }
    }
    createPoints(object3d,group)
    return group
  }
  pointsBack(){
    this.fighterPointsGroup.traverse((child)=>{
      if(child.isPoints){
        gsap.to(child.material.uniforms.uTime,{
          value:0,
          duration:10
        })
      }
    })
  }
}