<template>
    <div class="bigScreen">
        <div class="header">张志豪智慧工厂管理系统平台</div>
        <div class="main">
            <div class="left">
                <div class="cityEvent" >
                    <h3><span>厂房控制</span></h3>
                    <h1 @click="showWall()">
                        <img src="../assets/bg/bar.svg" class="icon" />
                        <span>厂房外形展示</span>
                    </h1>
                    <h1 @click="showAll()">
                        <img src="../assets/bg/bar.svg" class="icon" />
                        <span>厂房分层展开</span>
                    </h1>
                    <div class="footerBorder"></div>
                </div>
                <div class="cityEvent" >
                    <h3><span>展示楼层</span></h3>
                    <h1 @click="showFloor1()">
                        <img src="../assets/bg/bar.svg" class="icon" />
                        <span>展示第一层楼</span>
                    </h1>
                    <h1 @click="showFloor2()">
                        <img src="../assets/bg/bar.svg" class="icon" />
                        <span>展示第二层楼</span>
                    </h1>
                
                    <div class="footerBorder"></div>
                </div>
            </div>
            <div class="right">
              <div class="cityEvent" >
                  
                    <h1 @click="flatFighter()">
                        <img src="../assets/bg/bar.svg" class="icon" />
                        <span>展开/恢复飞机</span>
                    </h1>
                    <h1 @click="pointsFighter()">
                        <img src="../assets/bg/bar.svg" class="icon" />
                        <span>生成粒子飞机</span>
                    </h1>
                    <h1 @click="pointsBlast()">
                        <img src="../assets/bg/bar.svg" class="icon" />
                        <span>粒子爆炸</span>
                    </h1>
                    <h1 @click="pointsBack()">
                        <img src="../assets/bg/bar.svg" class="icon" />
                        <span>粒子恢复</span>
                    </h1>
                    <div class="footerBorder"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import {ref} from 'vue'
import eventHub from '@/utils/EeventHub';
let isOpen=false
const showWall=()=>{
  eventHub.emit('showWall')
}
const showFloor1=()=>{
  eventHub.emit('showFloor1')

}
const showFloor2=()=>{
  eventHub.emit('showFloor2')

}



const showAll=()=>{
  if(!isOpen){
    isOpen=true
    eventHub.emit('showAll')
  }else{
    isOpen=false
    eventHub.emit('hideAll')
  }

}
const flatFighter=()=>{
  eventHub.emit('flatFighter')
}
const pointsFighter=()=>{
  eventHub.emit('pointsFighter')
}
const pointsBlast=()=>{
  eventHub.emit('pointsBlast')
}
const pointsBack=()=>{
  eventHub.emit('pointsBack')
}
</script>
<style scoped>
#bigScreen {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;

  left: 0;
  top: 0;
  pointer-events: none;
  display: flex;
  flex-direction: column;
}
.cityEvent h1 span{
  flex: 1;
}
.header {
  /* width: 1920px;
        height: 100px; */
position: relative;
  width: 19.2rem;
  height: 1rem;
  background-image: url(@/assets/bg/title.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;
  color: rgb(226, 226, 255);
  font-size: 0.4rem;
}

.main {
  flex: 1;
  width: 19.2rem;
  display: flex;
  justify-content: space-between;
}

.left {
  width: 4rem;
  /* background-color: rgb(255,255,255,0.5); */
  background-image: url(@/assets/bg/line_img.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.4rem 0;
}

.right {
  width: 4rem;
  /* background-color: rgb(255,255,255,0.5); */
  background-image: url(@/assets/bg/line_img.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: left center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.4rem 0;
}

.cityEvent {
  position: relative;
  width: 3.5rem;
  /* height: 3rem; */
  margin-bottom: 0.5rem;
  background-image: url(@/assets/bg/bg_img03.png);
  background-repeat: repeat;
}

.cityEvent::before {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  left: 0;
  top: 0;
  border-top: 4px solid rgb(34, 133, 247);
  border-left: 4px solid rgb(34, 133, 247);
  content: "";
  display: block;
}

.cityEvent::after {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  right: 0;
  top: 0;
  border-top: 4px solid rgb(34, 133, 247);
  border-right: 4px solid rgb(34, 133, 247);
  content: "";
  display: block;
}
.footerBorder {
  position: absolute;
  bottom: 0;
  bottom: 0;
  width: 3.5rem;
  height: 0.4rem;
}
.footerBorder::before {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  left: 0;
  top: 0;
  border-bottom: 4px solid rgb(34, 133, 247);
  border-left: 4px solid rgb(34, 133, 247);
  content: "";
  display: block;
}

.footerBorder::after {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  right: 0;
  top: 0;
  border-bottom: 4px solid rgb(34, 133, 247);
  border-right: 4px solid rgb(34, 133, 247);
  content: "";
  display: block;
}

.icon {
  width: 40px;
  height: 40px;
}

h1 {
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 0.3rem 0.3rem;
  justify-content: space-between;
  font-size: 0.2rem;
}
h3 {
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0.3rem 0.3rem;
}

h1 > div {
  display: flex;
  align-items: center;
}
h1 span.time {
  font-size: 0.2rem;
  font-weight: normal;
}

.cityEvent li > p {
  color: #eee;
  padding: 0rem 0.3rem 0.3rem;
}
.list h1 {
  padding: 0.1rem 0.3rem;
}
.cityEvent.list ul {
  pointer-events: auto;
  cursor: pointer;
}

.cityEvent li.active h1 {
  color: red;
}
.cityEvent li.active p {
  color: red;
}

ul,
li {
  list-style: none;
}
</style>