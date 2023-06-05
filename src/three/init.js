
import CameraModule from './camera'
import rendererModule from './renderer'
// 更新摄像头
CameraModule.activeCamera.aspect = window.innerWidth / window.innerHeight;
//   更新摄像机的投影矩阵
CameraModule.activeCamera.updateProjectionMatrix();
window.addEventListener('resize',()=>{
  //更新摄像头
  CameraModule.activeCamera.aspect=window.innerWidth/window.innerHeight
  //更新摄相机的投影矩阵
  CameraModule.activeCamera.updateProjectionMatrix()
  //更新渲染器
  rendererModule.renderer.setSize(window.innerWidth,window.innerHeight)

  //设置渲染器的像素比例
  rendererModule.renderer.setPixelRatio(window.devicePixelRatio)
  console.log( rendererModule.css3drenderer)
  rendererModule.css3drenderer.setSize(window.innerWidth,window.innerHeight)


})