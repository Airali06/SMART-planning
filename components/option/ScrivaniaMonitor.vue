<template>

    <div class="rectangle"
    style = " width: 8.25rem;
    height: 7.8125rem;">

            <img src = "../../img/scrivania_con_monitor.png" height="65px" style = "display:block; margin-top: 5px;">

            <div style = "line-height: 0.8; margin-top: 4px;">scrivania<br>con
                 <span style = "font-size: 20px; ">Monitor</span>
            </div>

            <div class = "add">
                <img src = "../../img/add.png" height="30px">
            </div>
        

    </div>



</template>

<style scoped>

.add{
padding: 2px;
background: linear-gradient(
90deg,
rgba(0, 105, 186, 1) 0%,
rgba(0, 47, 84, 1) 100%
);
border-radius: 0.625rem;

position:absolute;
top: 20px;
left: -15px;
height: 30px;
}

.rectangle{

border-radius: 0.625rem;
background: #ffffff;
box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.15);
position: relative;
padding: 2px;
z-index: 0;
display: block;
justify-items: center;
align-items: center;
align-content: center;
justify-content: center;
}

.rectangle::before {
content: "";
position: absolute;
inset: 0;
border-radius: 0.625rem;
padding: 0.18rem; 
background: linear-gradient( 
90deg,
rgba(0, 105, 186, 1),
rgba(0, 47, 84, 1)
); 
-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
-webkit-mask-composite: xor;
mask-composite: exclude;
z-index: -1;
}
</style>