import {
    Plugin,
    showMessage,
    getFrontend,
} from "siyuan";
import "@/index.scss";

import { SettingUtils } from "./libs/setting-utils";

const STORAGE_NAME = "menu-config";

const frontEnd = getFrontend();

//old trash
const unwantedItem = "unwantedItem";
const unwantedTopBarIcon = "unwantedTopBarIcon";
const unwantedSideBarIcon = "unwatedSideBarIcon";
//old trash end

const targetNode = document.getElementById('commonMenu'); //it's the menu's id

export default class siyuan_rmv_btn extends Plugin {

    private settingUtils: SettingUtils;

    convertStringToArray(userInput) {
        if (userInput) {
            var inputArray = userInput.split(/[,，]/);
            for (let i = 0; i < inputArray.length; i++) {
                inputArray[i] = inputArray[i].trim();
            }
            return inputArray;
        } else {
            // 处理 undefined
            return [];
        }
    }

    rmvMenuItems(_toRemoveListArray_,_monitorImplementation_){
        if(_monitorImplementation_ == 1){ //DOMNodeInserted
            targetNode.addEventListener('DOMNodeInserted', function (e) {
                const buttons = Array.from(targetNode.getElementsByTagName('button'));
    
                buttons.forEach((button) => {
                    let labelElement = button.getElementsByClassName('b3-menu__label')[0];
                    if (labelElement) {
                        let span_text = labelElement.textContent.trim();
                        if (_toRemoveListArray_.includes(span_text)) {
                            button.style.display = 'none';
                        }
                    }
                });
    
            }, false);
            console.log(this.i18n.ignore_warning);
    
        }else if(_monitorImplementation_ == 2){ //MutationObserver
            var observer = new MutationObserver(function(mutationsList, observer) {
                for(let mutation of mutationsList) {
                    // if((mutation.type === 'childList') || (mutation.type === 'subtree')) {
                        if(mutation.type) {
                        const buttons = Array.from(document.getElementById('commonMenu').getElementsByTagName('button'));
                        
                        buttons.forEach((button) => {
                            let labelElement = button.getElementsByClassName('b3-menu__label')[0];
                            if (labelElement) {
                                let span_text = labelElement.textContent.trim();
                                if (_toRemoveListArray_.includes(span_text)) {
                                    button.style.display = 'none';
                                }
                            }
                        });
                    }
                }
            });
            
            observer.observe(targetNode, { childList: true, subtree: true });
        }else {
            var observer = new MutationObserver(function(mutationsList, observer) {
                for(let mutation of mutationsList) {
                    if((mutation.type === 'childList') || (mutation.type === 'subtree')) {
                        const buttons = Array.from(document.getElementById('commonMenu').getElementsByTagName('button'));
                        
                        buttons.forEach((button) => {
                            let labelElement = button.getElementsByClassName('b3-menu__label')[0];
                            if (labelElement) {
                                let span_text = labelElement.textContent.trim();
                                if (_toRemoveListArray_.includes(span_text)) {
                                    button.style.display = 'none';
                                }
                            }
                        });
                    }
                }
            });
            
            observer.observe(targetNode, { childList: true, subtree: true });
        }
    }


    rmvTopButtonBarIcons(_toRemoveListArray_){
        _toRemoveListArray_.forEach(elementType => {
            const styleElement = document.createElement('style');
            styleElement.textContent = `
                #${elementType} {
                    display: none;
                }
            `;

            document.head.appendChild(styleElement);
        });
    }

    rmvSideBarIcons(_toRemoveListArray_) {

        if (frontEnd == "desktop" || frontEnd =="browser-desktop") {
            //pc view
            _toRemoveListArray_.forEach(elementType => {
                const styleElement = document.createElement('style');
                styleElement.textContent = `
            .dock__item[data-type="${elementType}"] {
                display: none;
            }
            `;
                document.head.appendChild(styleElement);
            });
            //mobile view
        }
        if (frontEnd == "mobile" || frontEnd =="browser-mobile") {
            //mobile
            _toRemoveListArray_.forEach(elementType => {
                const styleElement = document.createElement('style');
                styleElement.textContent = `
            .toolbar__icon[data-type="sidebar-${elementType}-tab"] {
                display: none;
              }
            `;

                document.head.appendChild(styleElement);
            });
        }
    }

    checkOldComfigExist(){ //old trash detect
        if (
            this.data[unwantedTopBarIcon].unwantedTopBarIcons ||
            this.data[unwantedSideBarIcon].unwantedTopBarIcons ||
            this.data[unwantedSideBarIcon].unwantedTopBarIcons
            ){
            console.log(this.i18n.old_config_exist);
            showMessage(this.i18n.old_config_exist);
        }
        
    }

    reloadInterface(){
        window.location.reload();
        showMessage(this.i18n.reload_hint);
    }

    async onload() {


        //old trash
        try {
            const _item_ = await this.loadData(unwantedItem);
            this.data[unwantedItem].unwantedItems = _item_.unwantedItems;
        } catch (error) {
            this.data[unwantedItem] = { unwantedItems: "" };
        }

        try {
            const _item_ = await this.loadData(unwantedTopBarIcon);
            this.data[unwantedTopBarIcon].unwantedTopBarIcons = _item_.unwantedTopBarIcons;
        } catch (error) {
            this.data[unwantedTopBarIcon] = { unwantedTopBarIcons: "" }
        }

        try {
            const _item_ = await this.loadData(unwantedSideBarIcon);
            this.data[unwantedSideBarIcon].unwantedSideBarIcons = _item_.unwantedSideBarIcons;
        } catch (error) {
            this.data[unwantedSideBarIcon] = { unwantedSideBarIcons: "" }
        }
        //old trash end

        this.settingUtils = new SettingUtils(this, STORAGE_NAME);
        this.settingUtils.load();
        this.settingUtils.addItem({
            key: "totalSwitch",
            value: true,
            type: "checkbox",
            title: this.i18n.totalSwitch,
            description: this.i18n.totalSwitchDesc,
        });
        this.settingUtils.addItem({
            key: "listenImplementation",
            value: 1,
            type: "select",
            title: this.i18n.listenImplementation,
            description: this.i18n.listenImplementationdesc,
            options: {
                1: "DOMNodeInserted",
                2: "MutationObserver",
                3: "MutationObserver(type hard coded)"
            }
        });
        this.settingUtils.addItem({
            key: "unwantedMenuItem",
            value: "",
            type: "textarea",
            title: this.i18n.rm_menu_title,
            description: this.i18n.rm_menu_desc,
        });
        this.settingUtils.addItem({
            key: "unwantedTopButtonBarIcon",
            value: "",
            type: "textarea",
            title: this.i18n.rm_top_title,
            description: this.i18n.rm_top_desc,
        });
        this.settingUtils.addItem({
            key: "unwantedSideBarIcon",
            value: "",
            type: "textarea",
            title: this.i18n.rm_side_title,
            description: this.i18n.rm_side_desc,
        });

    }

    onLayoutReady() {

        this.checkOldComfigExist();
        this.loadData(STORAGE_NAME);
        this.settingUtils.load();

        console.log(frontEnd);

        // //dbg
        // console.log("menuItems2Rmv" + this.settingUtils.get("unwantedMenuItem"));
        // console.log("topbtn2rmv" + this.settingUtils.get("unwantedTopButtonBarIcon"));
        // console.log("sideBtn2mv" + this.settingUtils.get("unwantedSideBarIcon"));
        // console.log("obsImp"+ this.settingUtils.get("listenImplementation"));
        // //dbg


        if (this.settingUtils.get("totalSwitch")) {
            this.rmvTopButtonBarIcons(
                this.convertStringToArray(
                    this.settingUtils.get("unwantedTopButtonBarIcon")
                )
            );

            this.rmvSideBarIcons(
                this.convertStringToArray(
                    this.settingUtils.get("unwantedSideBarIcon")
                )
            );

            this.rmvMenuItems(
                this.convertStringToArray(
                    this.settingUtils.get("unwantedMenuItem")
                ),
                this.settingUtils.get("listenImplementation")
            )
        }
    }

    async onunload() {
        await this.settingUtils.save();
        this.reloadInterface();
    }

    uninstall(){
        //remove old trash
        this.removeData(unwantedTopBarIcon);
        this.removeData(unwantedSideBarIcon);
        this.removeData(unwantedItem);
        //remove old trash end
        showMessage(this.i18n.uninstall_hint);
    }

}
