(function($){
	$("#memo").css("height",window.innerHeight - $("h1").outerHeight());
	var milkcocoa = new MilkCocoa('あなたのmilkcocoa id');
	var ds = milkcocoa.dataStore('memo');
	var el;
	function readMemo(){
		$(".item").remove();
		ds.stream().next(function(err, data){
			data.forEach(function(item){
				if(item.value.done){
					ds.remove(item.id);
				}else{
					el = '<li class="item" name="'+item.id+'">'+item.value.memo+'</li>';
				}
				$("#memo").append(el);
      });
		});
	}
	readMemo();
	ds.on('push', function() {
    readMemo();
  });

  $("h1").on('touchstart', onTouchStart);
  $("h1").on('touchmove', onTouchMove);
  $("h1").on('touchend', onTouchEnd);
  var direction, position;
  function onTouchStart(event) {
    position = getPosition(event);
    direction = '';
  }
  function onTouchMove(event) {
    if (position - getPosition(event) < -270) {
      direction = "reload";
    }
  }
  function onTouchEnd(event) {
    if (direction == "reload"){
      readMemo();
      setTimeout(function(){
      	window.location.reload();
      },50);
    }
  }
  function getPosition(event) {
    return event.originalEvent.touches[0].pageY;
  }
  $("#memo").on("touchend",".item",function(){
  	var id = $(this).attr("name");
  	if($(this).hasClass('done')){
  		ds.set(id,{done: false});
  		$(this).removeClass("done");
  	}else{
  		ds.set(id,{done: true});
  		$(this).addClass("done");
  	}
  });
})(jQuery);