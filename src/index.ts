//created by zxkmm at 2023.12.4 under MIT license
//repo: https://github.com/zxkmm/siyuan_rmv_btn
import {
    Plugin,
    Setting
} from "siyuan";
import "./index.scss";

let unwantedLabels = [''];
// console.log("pla-ce1:");//DBG
// console.log(unwantedLabels);//DBG
let ForUnwantedTopBarIcons = [''];
let ForUnwantedSideBarIcons = [''];
const targetNode = document.getElementById('commonMenu'); //it's the menu's id

const unwantedItem = "unwantedItem";
const unwantedTopBarIcon = "unwantedTopBarIcon";
const unwantedSideBarIcon = "unwatedSideBarIcon";

export default class siyuan_rmv_btn extends Plugin {

    convertStringToArray(userInput) {
        if (userInput) {
            var inputArray = userInput.split(/[,，]/);
            for (let i = 0; i < inputArray.length; i++) {
                inputArray[i] = inputArray[i].trim();
            }
            return inputArray;
        } else if (userInput === "_NONE_") {

            return [];
        } else {
            // 处理 undefined
            console.log(this.i18n.console_hint);
            return [];
        }
    }

    //new
    
    //new

    async onLayoutReady() {

        //topbars

        ForUnwantedTopBarIcons = this.convertStringToArray(this.data[unwantedTopBarIcon].unwantedTopBarIcons);

        ForUnwantedTopBarIcons.forEach(elementType => {
            const styleElement = document.createElement('style');
            styleElement.textContent = `
                #${elementType} {
                    display: none;
                }
            `;

            document.head.appendChild(styleElement);
        });



        //sidebars

        ForUnwantedSideBarIcons = this.convertStringToArray(this.data[unwantedSideBarIcon].unwantedSideBarIcons);

        ForUnwantedSideBarIcons.forEach(elementType => {
            const styleElement = document.createElement('style');
            styleElement.textContent = `
            span[data-type="${elementType}"] {
                display: none;
            }
            `;
            document.head.appendChild(styleElement);
            //created by zxkmm at 2023.12.4 under MIT license
            //repo: https://github.com/zxkmm/siyuan_rmv_btn
        });


        //mobile
        ForUnwantedSideBarIcons.forEach(elementType => {
            const styleElement = document.createElement('style');
            styleElement.textContent = `
                    .toolbar__icon[data-type="sidebar-${elementType}-tab"] {
                        display: none;
                      }
                    `;

            document.head.appendChild(styleElement);
        });

    }

    async onload() {

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

        const _unwantedItems_ = document.createElement("textarea");
        const _unwantedTopBarIcons_ = document.createElement("textarea");
        const _unwantedSideBarIcons_ = document.createElement("textarea");


        this.setting = new Setting({
            confirmCallback: () => {
                this.saveData(unwantedItem, { unwantedItems: _unwantedItems_.value });
                this.saveData(unwantedTopBarIcon, { unwantedTopBarIcons: _unwantedTopBarIcons_.value })
                this.saveData(unwantedSideBarIcon, { unwantedSideBarIcons: _unwantedSideBarIcons_.value })
                window.location.reload();
            }
        });
        this.setting.addItem({
            title: this.i18n.note_title,
            description: this.i18n.note_desc,
        });




        this.setting.addItem({
            title: this.i18n.rm_menu_title,
            description: this.i18n.rm_menu_desc,
            createActionElement: () => {
                _unwantedItems_.className = "b3-text-field fn__block note";
                _unwantedItems_.placeholder = "e.g. Copy, Paste";
                _unwantedItems_.value = this.data[unwantedItem].unwantedItems;
                return _unwantedItems_;
            },
        });

        this.setting.addItem({
            title: this.i18n.rm_top_title,
            description: this.i18n.rm_top_desc,
            createActionElement: () => {
                _unwantedTopBarIcons_.className = "b3-text-field fn__block note";
                _unwantedTopBarIcons_.placeholder = "e.g. barSync, barPlugins";
                _unwantedTopBarIcons_.value = this.data[unwantedTopBarIcon].unwantedTopBarIcons;
                return _unwantedTopBarIcons_;
            },
        });

        this.setting.addItem({
            title: this.i18n.rm_side_title,
            description: this.i18n.rm_side_desc,
            createActionElement: () => {
                _unwantedSideBarIcons_.className = "b3-text-field fn__block note";
                _unwantedSideBarIcons_.placeholder = "e.g. backlink, globalGraph";
                _unwantedSideBarIcons_.value = this.data[unwantedSideBarIcon].unwantedSideBarIcons;
                return _unwantedSideBarIcons_;
            },
        });
        //created by zxkmm at 2023.12.4 under MIT license
        //repo: https://github.com/zxkmm/siyuan_rmv_btn
        unwantedLabels = this.convertStringToArray(this.data[unwantedItem].unwantedItems);
        // console.log("pla-ce1:");//DBG
        // console.log(unwantedLabels);//DBG


        //TODO use MutationObserver instead of DOMNodeInserted
        targetNode.addEventListener('DOMNodeInserted', function (e) {
            const buttons = Array.from(targetNode.getElementsByTagName('button'));

            buttons.forEach((button) => {
                let labelElement = button.getElementsByClassName('b3-menu__label')[0];
                if (labelElement) {
                    //created by zxkmm at 2023.12.4 under MIT license
                    //repo: https://github.com/zxkmm/siyuan_rmv_btn
                    let span_text = labelElement.textContent.trim();
                    if (unwantedLabels.includes(span_text)) {
                        button.style.display = 'none';
                    }
                }
            });

        }, false);

    }


}

