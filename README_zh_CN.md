# 思源移除按钮

一个SiYuan插件，可以删除菜单/底栏/顶栏中你不使用的按钮。  
现阶段支持移除顶栏指定按钮，侧栏指定按钮，右键菜单项内容。     
本插件在MIT协议下开源，没有联网行为，也没有从远端fetch恶意代码的能力。  

# 下载
到release页面下载，或者到思源集市搜索“移除按钮”   

## changelog 1.1.0 2024.01.12
 - Add icons for reference in setting panel.
 - Not anymore detect or read old config.
 - Delete config data after uninstall, but not when turn off plugin. 

## changelog 1.1.1 2024.01.19
 - add seperator policy: 
    - two meet each other, hide one
    - hide all
    - don't touch

# 链接
repo/源码：https://github.com/zxkmm/siyuan_rmv_btn  

下载：集市搜索 “移除按钮” 或者 访问 https://github.com/zxkmm/siyuan_rmv_btn/releases

汇报 bug / 提交功能请求：https://github.com/zxkmm/siyuan_rmv_btn/issues  

论坛thread：https://ld246.com/article/1701669406727  

# 警告

- 如果你移除了太多东西导致无法正常操作，请到思源工作空间删除整个``siyuan_rmv_btn``文件夹。

- 插件在 DOM 发生变化时会立即注入思源的主界面。在这种情况下，如果添加的项目过多，性能将受到影响。  

- 这个插件没有做额外的工作来防止JS注入，在这种情况下，当你在浏览器或公共网络中使用它时，你应该更加小心。  

- 如果你试图隐藏的菜单项目与思源的商业部分有关，请考虑捐赠给@D和@V（而不是我），因为他们靠写开源代码生活。  

- 只保证默认的两个主题正常使用  

# 备注
如果您喜欢这个插件，请给我的 GitHub 仓库点亮免费的星星⭐（Star）。  
链接：[https://github.com/zxkmm/siyuan_rmv_btn](https://github.com/zxkmm/siyuan_rmv_btn)    

# TODO
 - friendly interface  
# 鸣谢
[SiYuan](https://github.com/siyuan-note/siyuan)   ([in b3log](https://b3log.org/siyuan/))

[@muhanstudio](https://github.com/muhanstudio)   ([in b3log](https://ld246.com/member/muhanstudio))

[@TCOTC](https://github.com/TCOTC)   ([in b3log](https://ld246.com/member/a2930610542))

[@Wetoria](https://github.com/Wetoria)   ([in b3log](https://ld246.com/member/Wetoria))

# 对MIT许可证的额外附加

您可以自由使用/ 分发此存储库中的代码，无论您打算闭源还是开源，无论您打算用在付费或免费软件的一部分，您都可以自由免费使用。然而，我已将这些额外的请求纳入了此存储库的许可证。如果您使用了来自此存储库的代码、设计、文本、算法或任何其他东西，您必须在以下三个地方包含我的用户名 "zxkmm" 和此存储库的链接：

1. 在代码注释中。
2. 在与我的代码相关的设置界面中。
3. 在您的软件/网站的 '关于' 页面以及或任何其他计算机产品的格式中。

