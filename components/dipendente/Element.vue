<template>

        <div class = "contenitore">
            <img src = "../../img/profilo.png" style = "position: absolute; left: -70px; top: 43px; height: 140px;">
            <img src = "../../img/rectangle.svg" style = "margin-left: 35px; width: 310px; margin-top: 8px; margin-right: 12px;">
        </div>


</template>

<style scooped>

.contenitore {
    border-radius: 10px;
    background: #ffffff;
    box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.15);
    position: relative;
    padding: 12px;
    z-index: 0;
    display: block;
    justify-items: center;
    align-items: center;
    align-content: center;
    justify-content: center;
    border: 0px;
    width: fit-content;
    height: fit-content;
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
</style>