uniform float uHeight;
varying vec3 vPosition;
void main(){
  float gradMix=(vPosition.y+uHeight/2.0)/uHeight;
  // vec3 gradColor=mix(vec3(1,1,0),vec3(1,0,0),gradMix);

 gl_FragColor=vec4(1,1,0,1.0-gradMix);

  
}