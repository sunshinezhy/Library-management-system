const LOG_MAP = [
  ["/character/list", "获取角色列表"],
  ["/log/list", "获取日志列表"],
  ["/user/info", "获取自己的登入信息"],
  ["/book/list?keyword=", "获取书籍列表"],
  ["/user/list?keyword=", "获取用户列表"],
  ["/auth/login", "登录"],
  ["/dashboard/bash-info", "总览页面的基本信息"],
  ["/invite/list", "邀请码列表"],
  ["/invite","删除邀请码"],
  ["/forget-password/list", "忘记密码列表"],
  ["/profile/update/password", "个人重置密码"],
  ["/user/reset/password","重置用户密码"],
  ["/book/detail/", "书籍详情"],
  ["/book/add", "添加书籍"],
];

export const getLogInfoByPath = path => {
  let title = "";

  LOG_MAP.forEach(item => {
    if (path.includes(item[0])) {
      title = item[1];
    }
  });

  return title || path;
};
