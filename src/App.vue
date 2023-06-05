<template>
   <div class="class">
      <Scene :eventList="eventList"/>
      <BigScreen ></BigScreen>
   </div>

</template>

<script setup>
import Scene from './components/Scene.vue'
import BigScreen from './components/BigScreen.vue'



</script>

<style>
*{
  margin:0;
  padding:0;
}
#cssrender{
   position: fixed;
   top:0;
   left:0;
   z-index: 100;
   pointer-events: none;
}
.elementTag{
   position:relative;
   left:-30px;
   top:15px;
}
.elementTag::before{
   content: '';
   display: block;
   position:absolute;
   width:100px;
   height: 1px;
   background: rgb(127 177 255/75%);
   right:-100px;
   bottom:0;
   transform: rotate(30deg);
   transform-origin: 0 0;
}
.elementTag::after{
   content: '';
   display: block;
   position:absolute;
   width:20px;
   height: 20px;
   border-radius: 50%;
   background: rgb(127 177 255/75%);
   right:-100px;
   bottom:-50px;
   transform: rotate(30deg);
   transform-origin: 0 0;
}
.elementContent{
   background-color: rgb(20,143,221,0.68);
   box-shadow: 0,0,12px rgba(0,128,255,0.75);
   border:1px solid rgb(127,177,255,0.75);
   padding:20px;
   color:#efefef
}
</style>
