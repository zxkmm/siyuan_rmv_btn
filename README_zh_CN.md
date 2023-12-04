# 思源隐藏菜单项

一个SiYuan插件，可以删除菜单中你不使用的按钮。  
现阶段支持三个id为`commonMenu` 的地方，即文档右上角的两个按钮，还有每个段落右侧的唤起图标。    

# 链接
repo/源码：https://github.com/zxkmm/siyuan_rmv_btn  

下载：https://github.com/zxkmm/siyuan_rmv_btn/releases/tag/v0.0.3  

汇报 bug / 提交功能请求：https://github.com/zxkmm/siyuan_rmv_btn/issues  

论坛thread：https://ld246.com/article/1701669406727  
# 警告

- handler 在 DOM 发生变化时会立即注入思源的主界面。在这种情况下，如果添加的项目过多，性能将受到影响。  

- 这个插件没有做额外的工作来防止JS注入，在这种情况下，当你在浏览器或公共网络中使用它时，你应该更加小心。  

- 如果你试图隐藏的菜单项目与思源的商业部分有关，请考虑捐赠给@D和@V（不是我），因为他们靠写开源代码生活。  

- 只保证默认的两个主题正常使用  

# TODO
 - i18n   
 - do more than `commonMenu` in the future   
