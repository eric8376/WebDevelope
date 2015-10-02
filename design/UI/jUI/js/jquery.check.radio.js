/* radio checkbox */
$(function(){
	$('.label-radio input').on("click",function(){
	    var $ro_dis = $(this).parent('label');
		if($ro_dis.hasClass("disabled")){	 
	    $(this).unbind("click");	
	    }else{		
		  $('.label-radio input').each(function(){
            var e = $(this);
            if(e.attr('checked')){
               e.parent('label').addClass('r-on');
			   $(this).attr("checked", true);
            }else{
              e.parent('label').removeClass('r-on');
		      $(this).attr("checked", false);
            }
         }); 	
	 }
   });

   $('.label-check input').on("click",function(){
	 var $ck_dis = $(this).parent('label');
	 if($ck_dis.hasClass("disabled")){	 
        $(this).unbind("click");
     }else{
    $(this).each(function(){
		if($(this).is(":checked")){
			$(this).attr("checked", true);
			$(this).parent('label').addClass('c-on');
		}else {
			$(this).attr("checked", false);
			$(this).parent('label').removeClass("c-on");		
			}
		})
	}	
})
});
/* 全选 单选 数据表格*/
$(function(){ 
$('.table .group-checkable').on("click",function () {
		var set = $(this).attr("data-set");
		var checked = $(this).is(":checked");
		$(set).each(function () {
				if (checked) {
						$('.table tbody tr .checkboxes').attr("checked", true);
						$('.table .group-checkable').parents('span').addClass("checked");
						$(this).parents('tr').addClass("active");
				} else {
				   	   $('.table tbody tr .checkboxes').attr("checked", false);
						$('.table .group-checkable').parents('span').removeClass("checked");
						$(this).parents('tr').removeClass("active");
				}					
		});
		jQuery.uniform.update(set);
});

$('.table tbody tr .checkboxes').on("click",function(){
		 $(this).parents('tr').toggleClass("active");	
		  if ($(this).attr(":checked",false)) {
			  $('#sample_1 .group-checkable').parents('span').removeClass("checked");	
			};
});
});
/* table 斑马线 */
$(function(){  
     $(".table-striped tbody>tr:odd").addClass("odd_row");  
     $(".table-striped tbody>tr:even").addClass("even_row");  
});