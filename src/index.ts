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
const targetNode = document.getElementById('commonMenu');

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
            console.log('siyuan_rmv_btn: you never define which items to hide. 移除按钮插件：您没有指定要移除哪些按钮');
            console.log('pls go to setting and define which to hide. 请到插件设置页面指定');
            console.log('if you didn\'t meant to fill all the boxes, fill _NONE_ into blank boxes. 如果您不是想移除所有三种元素，在空白的文本框里面填_NONE_')
            return [];
        }
    }

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
            title: "Note",
            description: `
            If items you are trying to hide is related to SiYuan's commercial part, please consider to donate to @D and @V (not me) because they lives by writing open-source codes.<br>
            如果你试图隐藏的菜单项目与思源的商业部分有关，请考虑捐赠给@D和@V（而不是我），因为他们靠写开源代码生活。 <br>
            v0.1.0
            `,
        });




        this.setting.addItem({
            title: "Items' labels you don't need",
            description: "seperate by english or chinese half-width comma AKA \",\" or \"，\"",
            createActionElement: () => {
                _unwantedItems_.className = "b3-text-field fn__block note";
                _unwantedItems_.placeholder = "e.g. Copy, Paste";
                _unwantedItems_.value = this.data[unwantedItem].unwantedItems;
                return _unwantedItems_;
            },
        });

        this.setting.addItem({
            title: "Top bar icons you don't need",
            description: `❗EXPERIMENTAL❗<br>
            seperate by english or chinese half-width comma AKA \",\" or \"，\"<br>
            options:<br>
            barSync: the sync button<br>
            barBack: the back button<br>
            barForward: the forward button<br>
            barPlugins: the plugin button<br>
            barSearch: search button<br>
            barMode: daylight/night mode button<br>
            barExit: exit button (only iPad)<br>
            `,
            createActionElement: () => {
                _unwantedTopBarIcons_.className = "b3-text-field fn__block note";
                _unwantedTopBarIcons_.placeholder = "e.g. barSync, barPlugins";
                _unwantedTopBarIcons_.value = this.data[unwantedTopBarIcon].unwantedTopBarIcons;
                return _unwantedTopBarIcons_;
            },
        });

        this.setting.addItem({
            title: "Side bar icons you don't need",
            description: `❗EXPERIMENTAL❗<br>
            seperate by english or chinese half-width comma AKA \",\" or \"，\"<br>
            options:<br>
            outline: the outline icon<br>
            inbox: the inbox icon<br>
            bookmark: the bookmark icon<br>
            tag: the tag icon<br>
            backlink: the backlink icon<br>
            globalGraph: the global graph icon<br>
            graph: the single notebook graph icon<br>
            `,
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

