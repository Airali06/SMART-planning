<template>
  <div>
    <canvas ref="canvas" :width="width" :height="height"></canvas>
    <button @click="generateCaptcha">Ricarica</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const canvas = ref(null);
const width = 150;
const height = 50;
const captchaText = ref('');

function getRandomChar() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

function generateCaptchaText(length = 5) {
  let text = '';
  for (let i = 0; i < length; i++) {
    text += getRandomChar();
  }
  return text;
}

function drawCaptcha(text) {
  const ctx = canvas.value.getContext('2d');
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = `rgba(${rand(0,255)},${rand(0,255)},${rand(0,255)},0.5)`;
    ctx.beginPath();
    ctx.moveTo(rand(0, width), rand(0, height));
    ctx.lineTo(rand(0, width), rand(0, height));
    ctx.stroke();
  }

  ctx.font = '30px Arial';
  ctx.textBaseline = 'middle';

  for (let i = 0; i < text.length; i++) {
    const letter = text[i];
    ctx.fillStyle = randomColor();
    const x = 20 + i * 25;
    const y = height / 2;
    const angle = rand(-30, 30) * Math.PI / 180;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillText(letter, 0, 0);
    ctx.restore();
  }

  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = randomColor();
    ctx.beginPath();
    ctx.arc(rand(0, width), rand(0, height), 1, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
  return `rgb(${rand(0,255)}, ${rand(0,255)}, ${rand(0,255)})`;
}

function generateCaptcha() {
  captchaText.value = generateCaptchaText();
  drawCaptcha(captchaText.value);
}

// 👇 Funzione per controllare se l'input è corretto
function verifyCaptcha(input) {
  return input.trim() === captchaText.value;
}

// Esponi le funzioni al genitore
defineExpose({
  generateCaptcha,
  verifyCaptcha,
});

onMounted(() => {
  generateCaptcha();
});
</script>