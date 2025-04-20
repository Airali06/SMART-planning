<template>

    <div style = "justify-self: center;">
        nouvo dipendente
        <div class="rectangle" style = "width: 700px; height: 500px;">

            <div class = "rectangle" style = "padding: 3px;">
                <input type = "text" class = "input" >
            </div>
            
            
            <input type = "text" class = "input" style = "width: 40px; height: 50px;">
        </div>
    </div>
</template>

<style scoped>
.rectangle {
  margin-top: 10px;
  
  border-radius: 0.865rem;
  background: #ffffff;
  box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 0;
  display: block;
  justify-items: center;
  align-items: center;
  align-content: center;
  justify-content: center;
  font-size: 23px;
  padding-left: 35px;
  transition: transform 0.3s ease-in-out;
}
.rectangle::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 0.825rem;
  padding: 0.16rem;
  background: linear-gradient(90deg, rgb(0, 120, 212), rgba(0, 47, 84, 1));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
}



.input{
    border-radius: 20px;
  padding-left: 20px;
  color: #00355C;
  font-weight: 700;
  font-size: 20px;
  border: 2px solid transparent;
  background: none;

}
.input:focus{
    background-color: #eef6fc;
    border-color: none; 
    border-width: 2px;
    transition: border 0.2s ease-in-out;
    outline: none; 
}
</style>