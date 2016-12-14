var $draggable = $('.planchette').draggabilly({
  
})


var tl = new TimelineMax({
  repeat: 0,
  delay: 0,
  repeatDelay:3,
});

tl.to(".planchette", 4, {x:400, y:-90, delay:2});
tl.to(".planchette", 2, {x:335, y:-30, delay:1});
tl.to(".planchette", 2.5, {x:300, y:-25, delay:2, rotation:10});
tl.to(".planchette", 2.5, {x:530, y:-45, delay:2, rotation:-10});
tl.to(".planchette", 2.5, {x:270, y:-85, delay:2, rotation:0});
tl.to(".planchette", 2.5, {x:370, y:-95, delay:2});
tl.to(".planchette", 2.5, {x:140, y:-40, delay:2, rotation:10});
tl.to(".planchette", 2.5, {x:270, y:-20, delay:2, rotation:-5});
tl.to(".planchette", 2.5, {x:140, y:-40, delay:2, rotation:5});
tl.to(".planchette", 2.5, {x:530, y:-40, delay:2, rotation:-10});
tl.to(".planchette", 2.5, {x:170, y:-60, delay:2, rotation:10});
tl.to(".planchette", 2.5, {x:270, y:-85, delay:2, rotation:-5});
tl.to(".planchette", 2.5, {x:0, y:0, delay:2, rotation:0});
tl.to("body", 0, {className:"+=ghost", delay:0});
tl.to("body", 0, {className:"-=ghost", delay:3});

$('.planchette').click(function(){
  tl.kill();
});