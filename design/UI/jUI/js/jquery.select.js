// JavaScript Document
(function($){  
  
    jQuery.fn.select = function(options){  
        return this.each(function(){  
            var $this = $(this);  
            var $shows = $this.find(".shows");  
            var $selectOption = $this.find(".selectoption");  
            var $el = $this.find("ul > li");  
                                      
            $this.click(function(e){ 
            if($(this).hasClass("disabled")){	 
	              $(this).unbind("click");	
	          }else{
                $(this).toggleClass("zindex");  
                $(this).children("ul").toggleClass("dis");  
                e.stopPropagation(); 
		        } 
            });       
            $el.bind("click",function(){  
                var $this_ = $(this);                     
                $this.find("span").removeClass("gray");  
                $this_.parent().parent().find(".selectoption").text($this_.text());  
            });  
              
						$this.mouseleave(function(){
                $this.removeClass("zindex");  
                $this.find("ul").removeClass("dis");      
            })              
        //each End    
        });  
          
    }  
      
})(jQuery);  