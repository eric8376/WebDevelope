// zuo-you-xuan-zhe js

(function($){  
    $.fn.extend = function(options){  
        return this.each(function(){  
            var $this = $(this);
            var $l_box = $this.find(".left_box");						
            var $r_box = $this.find(".right_box");
						var $l_box_li = $l_box.find('ul');
						var $l_li = $l_box.find('ul > li');
					  var $r_box_li = $r_box.find('ul');
						var $r_li = $r_box.find('ul > li'); 						  
            var $list_con = $l_box_li.html();
                                    
            $r_box_li.append($list_con).children().hide();
						
            $l_li.on("click",function(e){
               var ind = $(this).index();	
                 index = ind;  
                 $(this).hide();
						if($r_box.find('ul > li').hasClass('active')){
							$r_box.find('ul > li').removeClass('active');
							$r_box.find('ul > li').eq(index).addClass('active').show();
						}else{
							 $r_box.find('ul > li').eq(index).addClass('active').show();
							  e.stopPropagation(); 
						}
						});
								 
						$r_box.find('ul > li').on("click",function(){
						   var ind = $(this).index();	
                 index = ind;
								$(this).hide();
								$r_box.find('ul > li').removeClass('active');
								$l_li.eq(index).show();
						});	
																		 
        //each End    
        });  
          
    }  
      
})(jQuery);  