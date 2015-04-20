${title}
======================
#foreach($user in $userList)
userid:${user.userid}
username:${user.username}
#if(${user.usertype}=="1")
usertype:经办员
#else
usertype:管理员
#end
#end