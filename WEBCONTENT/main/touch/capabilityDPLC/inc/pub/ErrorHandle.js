/******************************************************************
����˵�������ݴ���Ĵ�����Ϣ�����Ի�ҳ��
�������ƣ�ErrorHandle
���������
  title����ʾ�ı���
  type�� ����ҳ�������(1/2/3)������1�� ����  2���澯  3����ʾ 4: �ɹ�����ʾ
  button_type����ʾ��ť����(1/2)��
               ����1�������޷���ֵ��ֻ��ʾһ����ť��ȷ����
				     (type=1ʱ���޷���ֵ��button_type��Ϊ1)
                   2�������з���ֵ����ʾ������ť��ȷ����(����ֵ)��
                     ��ȡ����(������ֵ)
  content_name������ҳ����ʾ������
  content_message������ҳ����ʾ����ϸ����(type=2/3ʱ������Ϊ��)
���������
  �ޣ�
����ֵ��
  �����Ҫ����ֵ����button_type��2���򷵻�
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
		//���������󡱶Ի�ҳ��
		returnValue = window.showModalDialog(baseURL+"/inc/pub/PromptHandle.jsp",errorMessage,
		"dialogHeight: 200px; dialogWidth: 320px; center: Yes;resizable: yes; status: no;");
		if(errorMessage.button_type == "2" && returnValue != null)
		{
			return returnValue;
		}
	}
	else if(errorMessage.type == "2")
	{
		//�������澯���Ի�ҳ��
		returnValue = window.showModalDialog(baseURL+"/inc/pub/PromptHandle.jsp",errorMessage,
		"dialogHeight: 200px; dialogWidth:320px;center: Yes; help: no; resizable: yes; status: no;");
		if(errorMessage.button_type == "2" && returnValue != null)
		{
			return returnValue;
		}
	}
	else
	{
		//��������ʾ���Ի�ҳ��
		returnValue = window.showModalDialog(baseURL+"/inc/pub/PromptHandle.jsp",errorMessage,
		"dialogHeight: 200px; dialogWidth: 320px;center: Yes; help: no; resizable: yes; status: no;");
		if(errorMessage.button_type == "2" && returnValue != null)
		{
			return returnValue;
		}
	}
}
