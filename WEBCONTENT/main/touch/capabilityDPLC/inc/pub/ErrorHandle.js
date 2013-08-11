/******************************************************************
函数说明：根据传入的错误信息弹出对话页面
函数名称：ErrorHandle
传入参数：
  title：显示的标题
  type： 弹出页面的类型(1/2/3)，其中1： 错误  2：告警  3：提示 4: 成功后提示
  button_type：显示按钮类型(1/2)，
               其中1：函数无返回值，只显示一个按钮“确定”
				     (type=1时，无返回值，button_type必为1)
                   2：函数有返回值，显示两个按钮“确定”(返回值)，
                     “取消”(不返回值)
  content_name：弹出页面显示的内容
  content_message：弹出页面显示的详细内容(type=2/3时，此项为空)
输出参数：
  无；
返回值：
  如果需要返回值，即button_type＝2，则返回
**********************************************************************/
function ErrorHandle(title,type,button_type,content_name,content_message)
{
	var returnValue = "";
	var errorMessage = new Object();
	errorMessage.title = title;
	errorMessage.type = type;
	errorMessage.button_type = button_type;
	errorMessage.content = content_name;
	errorMessage.contentDetail = content_message;

	if(errorMessage.type == "1")
	{
		//弹出“错误”对话页面
		returnValue = window.showModalDialog(baseURL+"/inc/pub/PromptHandle.jsp",errorMessage,
		"dialogHeight: 200px; dialogWidth: 320px; center: Yes;resizable: yes; status: no;");
		if(errorMessage.button_type == "2" && returnValue != null)
		{
			return returnValue;
		}
	}
	else if(errorMessage.type == "2")
	{
		//弹出“告警”对话页面
		returnValue = window.showModalDialog(baseURL+"/inc/pub/PromptHandle.jsp",errorMessage,
		"dialogHeight: 200px; dialogWidth:320px;center: Yes; help: no; resizable: yes; status: no;");
		if(errorMessage.button_type == "2" && returnValue != null)
		{
			return returnValue;
		}
	}
	else
	{
		//弹出“提示”对话页面
		returnValue = window.showModalDialog(baseURL+"/inc/pub/PromptHandle.jsp",errorMessage,
		"dialogHeight: 200px; dialogWidth: 320px;center: Yes; help: no; resizable: yes; status: no;");
		if(errorMessage.button_type == "2" && returnValue != null)
		{
			return returnValue;
		}
	}
}
