<template>
  <div ref="container"></div>
 </template>
 
 <script setup>
 import * as THREE from 'three'
 import { onMounted,ref,watch } from 'vue'

 import Vertex from '../shader/test/Vertex.glsl'

 //导入场景
 import scene from '../three/scene'
 //导入相机
 import CameraModule from '../three/camera'
 //导入gui对象
 import gui from '../three/gui'
//导入渲染器
import rendererModule from '../three/renderer'
//添加辅助坐标轴
import helper from '../three/axesHelper'
//导入控制器
import controlsModule from '../three/controls'
//初始化屏幕大小
import '../three/init'
//导入每一帧函数
import animate from '../three/animate'
//导入添加物体函数
import createMesh from '../three/createMesh'


import gsap from 'gsap'
 const container=ref(null)
 scene.add(CameraModule.activeCamera);
const props=defineProps(['eventList'])
 scene.add(helper)
 createMesh()
 onMounted(()=>{
   container.value.appendChild(rendererModule.renderer.domElement)
   
   animate()
 })
 
 


 </script>
 
 <style>
 *{
   margin:0;
   padding:0;
 }
 canvas{
   width:100vw;
   height: 100vh;
   position: fixed;
   top:0;
   left:0;
 }
 </style>
 