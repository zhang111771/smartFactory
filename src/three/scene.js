import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
//初始化场景
const scene=new THREE.Scene()
//场景天空盒子
// const textureCubeLoader=new THREE.CubeTextureLoader()
// const textureCube=textureCubeLoader.load([
//     './textures/1.jpg','./textures/2.jpg','./textures/3.jpg',
//     './textures/4.jpg','./textures/5.jpg','./textures/6.jpg',
// ])
const hdrLoader=new RGBELoader()
hdrLoader.loadAsync('./textures/2k.hdr').then((texture)=>{
    texture.mapping=THREE.EquirectangularReflectionMapping
    scene.background=texture
    scene.environment=texture
})
//添加平行光
const light=new THREE.DirectionalLight(0xffffff,1)
scene.add(light)

export default scene