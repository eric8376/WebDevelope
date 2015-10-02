<!--文本框焦点js-->
$(document).ready(function(){
		$("input[type=text]").focus(function(){
			  $(this).addClass("bor-box-focus");
			  if($(this).val() ==this.defaultValue){  
                  $(this).val("");           
			  } 
		}).blur(function(){
			 $(this).removeClass("bor-box-focus");
			 if ($(this).val() == '') {
                $(this).val(this.defaultValue);
        }
		});
		$(".shows").focus(function(){
			  $(this).addClass("bg-focus");
		}).blur(function(){
			  $(this).removeClass("bg-focus");
		});
})
