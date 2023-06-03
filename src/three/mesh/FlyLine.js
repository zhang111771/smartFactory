import * as THREE from 'three'
import gsap from 'gsap'
export default class FlyLine{
  constructor(){
    let linePoints=[
      new THREE.Vector3(0,0,0),
      new THREE.Vector3(8,4,0),
      new THREE.Vector3(16,0,0),

    ]
    //创建曲线
    this.lineCurve=new THREE.CatmullRomCurve3(linePoints)
    //根据曲线生成管道几何体
    this.geometry=new THREE.TubeGeometry(this.lineCurve,100,0.4,2,false)
    //创建纹理
    const textureLoader=new THREE.TextureLoader()
    this.texture=textureLoader.load('./textures/z_11.png')
    this.texture.repeat.set(1,2)
    this.texture.wrapS=THREE.RepeatWrapping
    this.texture.wrapT=THREE.MirroredRepeatWrapping

        //设置飞线材质
        this.material=new THREE.MeshBasicMaterial({
          // color:0xfff000,
          map:this.texture,
          transparent:true
        })
        //创建飞线物体
        this.mesh=new THREE.Mesh(this.geometry,this.material)
        gsap.to(this.texture.offset,{
          x:-1,
          ease:'none',
          repeat:-1,
          duration:1
        })
  }
}