export default [
  {
    title: "总览",
    url: "/dashboard",
    onlyAdmin: true
  },
  {
    title: "书籍管理",
    url: "/books",
    onlyAdmin: false
  },
  {
    title: "用户管理",
    url: "/user",
    onlyAdmin: true
  },
  {
    title: "操作日志",
    url: "/log",
    onlyAdmin: true
  },
  {
    title: "杂项",
    onlyAdmin: true,
    children: [
      {
        title: "重置密码",
        url: "/reset/password",
        onlyAdmin: true
      },
      {
        title: "邀请码",
        url: "/invite-code",
        onlyAdmin: true
      }
    ]
  },
  {
    title: "个人设置",
    url: "/profile",
    onlyAdmin: false
  }
];
