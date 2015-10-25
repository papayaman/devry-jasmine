/* global console:true, TweenLite:true, Power2:true */

//++++++++++++++++++++++++++++++++++++++++++
// VARIABLES
//++++++++++++++++++++++++++++++++++++++++++

var documentWidth = 300;
var documentHeight = 250;

var person = document.getElementById("person"),
	shield_ghost = document.getElementById("shield_ghost"),
	shield = document.getElementById("shield"),
	shield_canvas = document.getElementById("shield_canvas");


var copy_01 = document.querySelectorAll(".copy")[0], 
    copy_02 = document.querySelectorAll(".copy")[1],
	copy_03 = document.querySelectorAll(".copy")[2],
	copy_04 = document.querySelectorAll(".copy")[3];

var cta = document.getElementById("cta"), 
    shimmer = document.getElementById("shimmer");

var logo = document.getElementById("logo"), 
	lockup = document.getElementById("lockup");

var chromeCover= document.getElementById("chromeCover");
var tweenDelay = 0;

//++++++++++++++++++++++++++++++++++++++++++
// BEHAVIORS & LISTENERS
//++++++++++++++++++++++++++++++++++++++++++

function cta_over(){
	TweenLite.to(shimmer, 0.6, { backgroundPosition : "120px  0px" });
}

function addListeners(){
	chromeCover.addEventListener("mouseover", cta_over);
	document.addEventListener( "canvas_done", function(){ console.log("ITS OVER"); });
}

//++++++++++++++++++++++++++++++++++++++++++
// CANVAS
//++++++++++++++++++++++++++++++++++++++++++

shield_canvas.width = documentWidth;
shield_canvas.height = documentHeight;
var shield_img = new Image();
var shield_mask = new Image();
var mask_pos = documentWidth;

var updateCanvas = function (func) {
    window.requestAnimationFrame =  window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
                                window.msRequestAnimationFrame || window.amozRequestAnimationFrame ||
                                (function (func){setTimeout(func, 5);});

    window.requestAnimationFrame(func);
};

var animate = function () { 
    var shield_canvas = document.getElementById("shield_canvas");
    var shield_ctx = shield_canvas.getContext("2d");
    
    shield_ctx .save();
        
    shield_ctx.drawImage(shield_mask, mask_pos, 0, documentWidth, documentHeight);
    shield_ctx.globalCompositeOperation = "source-in";
    shield_ctx.drawImage(shield_img, 0, 0, documentWidth, documentHeight);
    
    shield_ctx.restore();
    
    if (mask_pos >= 0) {
        mask_pos -= 1.5;
        updateCanvas(animate);
    } else {
    	document.dispatchEvent(new Event("canvas_done"), animate);
    }
};

//++++++++++++++++++++++++++++++++++++++++++
// SEQUENCE
//++++++++++++++++++++++++++++++++++++++++++

function seq05(){
	tweenDelay = 0;
	console.log("seq05");

	TweenLite.to(cta, 0.4, {alpha: 1 });

	tweenDelay += 0.4;
	TweenLite.delayedCall(tweenDelay, cta_over);
}

function seq04(){
	tweenDelay = 0;
	console.log("seq04");

	TweenLite.to(logo, 0.4, { top : -20 , delay:tweenDelay });
	
	tweenDelay += 0.3;
	TweenLite.to(lockup, 0.4, { alpha: 1, delay:tweenDelay });

	tweenDelay += 0.4;
	TweenLite.delayedCall(tweenDelay, seq05);
}

function seq03(){
	tweenDelay = 0;
	console.log("seq03");

	TweenLite.to([copy_02, person, shield], 0.4, { alpha : 0, delay:tweenDelay });

	tweenDelay += 1;
	TweenLite.to([copy_03, shield_ghost], 0.4, { alpha : 1, delay:tweenDelay });

	tweenDelay += 0.5;
	TweenLite.to([copy_04], 0.5, { alpha : 1, delay:tweenDelay });

	tweenDelay += 1;
	TweenLite.delayedCall(tweenDelay, seq04);
}

function seq02(){
	tweenDelay = 0;
	console.log("seq02");

	tweenDelay += 1;
	TweenLite.to(copy_01, 0.4, { alpha : 0, delay : tweenDelay });

	tweenDelay += 1;
	TweenLite.to(copy_02, 0.4, { alpha : 1, delay:tweenDelay });

	tweenDelay += 3;
	TweenLite.delayedCall(tweenDelay, seq03);
}

function seq01(){
	tweenDelay = 0;
	console.log("seq01");

	TweenLite.to(person, 0.9, { alpha: 1,  ease : Power2.easeOut });

	tweenDelay += 1.2;
	TweenLite.to(copy_01, 0.6, { alpha : 1, delay : tweenDelay,  onComplete:animate  });
	TweenLite.to(shield, 2, { alpha : 1, delay : tweenDelay, ease : Power2.easeIn });

	tweenDelay += 1;
	TweenLite.delayedCall(tweenDelay, seq02);
}

//++++++++++++++++++++++++++++++++++++++++++
// INITIALIZE
//++++++++++++++++++++++++++++++++++++++++++

function init(){
	console.log("Init");

	//Hide all objects, fade chromeCover out and start the sequence
	TweenLite.to([shield, shield_ghost], 0, { alpha: 0 });
	TweenLite.to([shield, shield_ghost], 0, { alpha: 0 });
	TweenLite.to([copy_01, copy_02, copy_03, copy_04], 0, { alpha: 0 });
	TweenLite.to([cta], 0, { alpha: 0 });
	TweenLite.to(lockup, 0, { alpha: 0 });
	TweenLite.to(chromeCover, 0.3, { alpha: 0 });

	addListeners();

	TweenLite.delayedCall(0.4, seq01);
}

// preload imaged before initializing animation
function preload() {
	shield_img.src = "img/shield.png";
	shield_mask.src = "img/shieldmask.png";

	init();
}

window.addEventListener("load", preload);
