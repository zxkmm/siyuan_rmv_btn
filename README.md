# siyuan_rmv_btn
A SiYuan Plugin that able to remove the buttons in menu that you don't really use.     
It currently support removing top bar icons, side bar icons, and menus with id `commonMenu`, which are two icons on top right corner of each doc, and calling from the right side of each paragraph. 

# Download
go to release page or go to SiYuan's market and search `siyuan_rmv_btn`    


## changelog 1.1.0 2024.01.12
 - Add icons for reference in setting panel.
 - Not anymore detect or read old config.
 - Delete config data after uninstall, but not when turn off plugin. 

## changelog 1.1.3 2024.01.27
- fix warning in editor
- add custom window control button reload
- add custom window control button custon position
- add custom window control button custom layout

# Warning
- If you removed too much items and end up stopped working, please go to your workspace and delete the entire ``siyuan_rmv_btn`` folder.
- The handler handle main interface of SiYuan as soon as DOM changes. In which case if you added too many items, the performance would be influenced.     
- This plugin didn't do extra work to prevent JS injection, in which case you should be more careful using it when in browser or hosted in public net.   
- If items you are trying to hide is related to SiYuan's commercial part, please consider to donate to @D and @V (not me) because they lives by writing open-source codes.    
- No garenteen for 3rd party themes.    

# Links
repo/Source Code：https://github.com/zxkmm/siyuan_rmv_btn  

Download：https://github.com/zxkmm/siyuan_rmv_btn/releases or search `siyuan_rmv_btn` in SiYuan market

Reporting Bugs / Submitting Feqture request：https://github.com/zxkmm/siyuan_rmv_btn/issues   

Forum / thread (Chinese)：https://ld246.com/article/1701669406727   

# Note
Please star⭐ my GitHub repository if you like this plugin. [https://github.com/zxkmm/siyuan_rmv_btn](https://github.com/zxkmm/siyuan_rmv_btn)

# TODO
 - friendly interface   

 # Credits   
[SiYuan](https://github.com/siyuan-note/siyuan)   ([in b3log](https://b3log.org/siyuan/))

[@muhanstudio](https://github.com/muhanstudio)   ([in b3log](https://ld246.com/member/muhanstudio))

[@TCOTC](https://github.com/TCOTC)   ([in b3log](https://ld246.com/member/a2930610542))

[@Wetoria](https://github.com/Wetoria)   ([in b3log](https://ld246.com/member/Wetoria))

[@zxhd863943427](https://github.com/zxhd863943427) ([in b3log](https://ld246.com/member/zxhd86))  


# Additional Attachment to MIT License

You are free to use the code in this repository, regardless of whether it's closed source or not, or whether it's part of paid software or not. However, I have incorporated these additional requests into the license of this repository. If you use the code, design, text, algorithms, or anything else from this repository, you must include my username "zxkmm" and the link to this repository in three places:

1. In the code comments.
2. In the settings interface related to my code.
3. On the 'About' page of your software/website/and or any other format of computer production.

