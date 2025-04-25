<script setup>
import { ref, onMounted } from "vue";

const canvas = ref(null);
const width = 265;
const height = 95;
const captchaText = ref("");
const userInput = ref("");
const aggiorna = ref("");
let result = null;


import { defineEmits } from "vue";
const emit = defineEmits(["notifica"]);
const notifica = () => {
  emit("notifica","corretto");
};


function getRandomChar() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz123456789";
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

function generateCaptchaText(length = 6) {
  let text = "";
  for (let i = 0; i < length; i++) {
    text += getRandomChar();
  }
  return text;
}

function drawCaptcha(text) {
  const ctx = canvas.value.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < 10; i++) {
    ctx.strokeStyle = "#00355C";/*`rgba(${rand(0, 255)},${rand(0, 255)},${rand(
      0,
      255
    )},0.5)`;*/
    ctx.beginPath();
    ctx.moveTo(rand(0, width), rand(0, height));
    ctx.lineTo(rand(0, width), rand(0, height));
    ctx.stroke();
  }

  ctx.font = "50px Arial";
  ctx.textBaseline = "middle";

  for (let i = 0; i < text.length; i++) {
    const letter = text[i];
    ctx.fillStyle =  "#00355C";//randomColor();
    const x = 50 + i * 30;
    const y = height / 2;
    const angle = (rand(-30, 30) * Math.PI) / 180;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillText(letter, 0, 0);
    ctx.restore();
  }

  for (let i = 0; i < 30; i++) {
    ctx.fillStyle =  "#00355C";//randomColor();
    ctx.beginPath();
    ctx.arc(rand(4, width), rand(4, height), 1, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
  return `rgb(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)})`;
}

function generateCaptcha() {
  userInput.value = "";
  captchaText.value = generateCaptchaText();
  result = null;
  drawCaptcha(captchaText.value);
}

// 👇 Funzione per controllare se l'input è corretto
function verifyCaptcha() {
  if(userInput.value.trim() == "")
  return;

  result = userInput.value.trim() === captchaText.value;
  console.log(result);
  aggiorna.value+=" ";
  if(result){
    notifica();
  }else{
    userInput.value = "";
  }
}



onMounted(() => {
  generateCaptcha();
});
</script>

<template>
  <input type = "text" v-model = "aggiorna" style = "display:none">

  <div class = "contenitore-2" style = "padding: 50px;">

    <div style = "display: flex; flex-direction: row; justify-self: center;"> 
      <div style = "font-size: 30px; font-weight: 700; margin-right:10px;" >Captcha</div>
      <div @click="generateCaptcha" class = "ricarica"> 
        <img src = "../../img/ricarica.png" width="16px" style = "filter: invert(1) brightness(9999);">
      </div>
    </div>
      
 

  <div style = "z-index: 300;">
    <canvas style = "display: block; z-index: 300;" ref="canvas" :width="width" :height="height"></canvas>
   
  </div>
    

    <div style = "display: flex; flex-direction: column;">
      <div style = "font-weight: 700; margin-left: 7px; margin-top: 10px; opacity: 0.8; font-size: 15px;">individua le lettere</div>
        <div class = "input">
          <input v-model="userInput" />
        </div>

        <div class = "errato" v-if = "result == false">errato</div>
        <div class = "corretto" v-if = "result == true">corretto</div>

        <button @click="verifyCaptcha" class = "verifica">verifica</button>
    </div>

    
  </div>
</template>

<style scoped>
*{
  color: #00355C;
  font-family: "Sulphur Point", serif;
}
.input{
  margin-top: 0px;
  border-radius: 0.625rem;
  background: #ffffff;
  box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 1;
  padding: 2px;
  
width: fit-content;
height: fit-content;

}

.input::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 0.625rem;
  padding: 0.125rem; 
  background: linear-gradient(
    to bottom, 
    white 0%, 
    white 20%, 
    white 50%, 
    rgba(0, 47, 84, 1) 50%, 
    rgba(0, 105, 186, 1) 100%
  ); 
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
}

input{
  padding: 3px;
  padding-left: 12px;
  border-radius: 14px;
  color: #00355C;
  font-weight: 700;
  font-size: 20px;
  border:none;
  background: none;
  width: 250px;

}
input:focus{
  border:none;
    background-color: #eef6fc;
    border-color: none; 
    border-width: 0px;
    transition: border 0.2s ease-in-out;
    outline: none; 
      border:none;
}


.verifica {
  background: linear-gradient(
    90deg,
    rgb(0, 86, 151) 0%,
    rgba(0, 47, 84, 1) 100%
  );

  margin-top: 20px;
  margin-bottom: 15px;
  border: 0px;
  padding: 5px;
  color: white;
  border-radius: 13px;
  width: 280px;
  font-family: "Sulphur Point", serif;
  font-weight: 400;
  font-style: normal;
  justify-self: center;
  font-size: 18px;
  font-weight: 700;
  display: block;
  cursor:pointer
}

.ricarica {
  background: linear-gradient(
    90deg,
    rgb(1, 78, 138) 0%,
    rgba(0, 47, 84, 1) 100%
  );

  margin-top: 7px;
  border: 0px;
  padding: 5px;
  color: white;
  border-radius: 10px;
  width: fit-content;
  height: 18px;
  font-family: "Sulphur Point", serif;
  font-weight: 400;
  font-style: normal;
  justify-self: center;
  font-size: 18px;
  font-weight: 700;
  display: block;
  cursor:pointer
}


.contenitore {
    border-radius: 10px;
    background: #ffffff;
    box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.15);
    position: relative;
    padding: 5px;
    z-index: 0;
    display: block;
    justify-items: center;
    align-items: center;
    align-content: center;
    justify-content: center;
    border: 0px;
    width: fit-content;
    height: fit-content;
    
    overflow: hidden;
  }
  
  .contenitore::before {
    content: "";
    border: 0px;
    position: absolute;
    inset: 0;
    border-radius: 10px;
    padding: 0.13rem;
    background: linear-gradient(90deg, rgba(0, 105, 186, 1), rgb(0, 60, 105));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: -1;
  }

  .contenitore-2{
    background: rgba(255, 255, 255, 0.94);
    border-radius: 0.625rem;
    width: fit-content;
    height: fit-content;
    box-shadow: 0rem 0rem 2.6rem 0rem rgba(0, 86, 152, 0.32);
    padding: 30px;
    overflow: hidden;
  }

  .errato{
    color: #860012; 
    font-weight: 900; 
    font-size: 20px; 
    background: linear-gradient(
    90deg,
    rgb(255, 203, 203) 0%,
    rgb(255, 167, 174) 100%
  );
  text-align: center;
  margin-top: 7px;
  margin-bottom: -12px;
  border: 0px;
  padding: 5px;
  border-radius: 13px;
  width: 265px;
  font-family: "Sulphur Point", serif;
  }

  .corretto{
    color: #005c0c; 
    font-weight: 900; 
    font-size: 20px; 
    background: linear-gradient(
    90deg,
    rgb(209, 255, 203) 0%,
    rgb(174, 255, 167) 100%
  );
  text-align: center;
  margin-top: 7px;
  margin-bottom: -12px;
  border: 0px;
  padding: 5px;
  border-radius: 13px;
  width: 265px;
  font-family: "Sulphur Point", serif;
  }
</style>
