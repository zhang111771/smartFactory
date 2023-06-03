import * as THREE from 'three'
import gsap from 'gsap'
import camera from '../camera'
export default class AlarmSprite{
   constructor(type='火警',position={x:-1.8,z:3},color=0xffffff){
    const textureLoader=new THREE.TextureLoader()
    const typeObj={
        火警:'./textures/tag/fire.png',
        治安:'./textures/tag/jingcha.png',
        电力:'./textures/tag/e.png'
    }
    const map=textureLoader.load(typeObj[type])
    this.material=new THREE.SpriteMaterial({
        map:map,
        transparent:true,
        depthWrite:false,
        color:color
    })
    this.mesh=new THREE.Sprite(this.material)
    //设置位置
    this.mesh.position.set(position.x,3.5,position.z)
   //封装点击事件
    this.fns=[]
    const mouse={}
    this.raycaster=new THREE.Raycaster()
    //事件的监听
    window.addEventListener('click',(event)=>{
        mouse.x=(event.clientX/window.innerWidth)*2-1
        mouse.y=1-(event.clientY/window.innerHeight)*2
        this.raycaster.setFromCamera(mouse,camera)
        event.mesh=this.mesh
        event.alarm=this
        const intersects=this.raycaster.intersectObject(this.mesh)
        if(intersects.length>0){
            this.fns.forEach((fn)=>{
                fn(event)
            })
        }
        
    })
   }
   onClick(fn){
    this.fns.push(fn)
   }
   remove(){
    this.mesh.remove()
    this.mesh.removeFromParent()
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
   }
}