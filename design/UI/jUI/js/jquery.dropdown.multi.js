// dropdown-multi js

(function($){  
    $.fn.extend = function(options){  
    return this.each(function(){  
            var $this = $(this);  
            var $shows = $this.find(".shows");  
            var $selectOption = $this.find(".selectoption");  
            var $el = $this.find("ul > li ");                                       
            $selectOption.click(function(){ 
            if($(this).hasClass("disabled")){	 
	              $(this).unbind("click");	
	          }else{
                $this.toggleClass("zindex");   
		        } 
            });       
            $this.find('li').on("click",function(e){  
               var $this_ = $(this); 
							  $this_.find('span').toggleClass('checked');
							  $this_.toggleClass('in');
							 var $nubr = $this.find('li.in').size();                   
                $this.find(".select_nubr").text('('+ $nubr+')');     
							  e.stopPropagation();   						              
            });  
  
						  $this.mouseleave(function(){
 // $this.removeClass("zindex");     
            })       
																		 
        //each End    
        });  
          
    }  
      
})(jQuery);  