//created by zxkmm at 2023.12.4 under MIT license
//repo: https://github.com/zxkmm/siyuan_rmv_btn
import {
    Plugin,
    Setting
} from "siyuan";
import "./index.scss";

let unwantedLabels = [''];
console.log("pla-ce1:");//DBG
console.log(unwantedLabels);//DBG
const targetNode = document.getElementById('commonMenu');

const unwantedItem = "unwantedItem";

export default class siyuan_rmv_btn extends Plugin {

    convertStringToArray(userInput) {
        if (userInput) {
            var inputArray = userInput.split(/[,，]/);
            for (let i = 0; i < inputArray.length; i++) {
                inputArray[i] = inputArray[i].trim();
            }
            return inputArray;
        }
        else {
            // 处理 undefined
            console.error('siyuan_rmv_btn: you never define which items to hide. 移除按钮插件：您没有指定要移除哪些按钮');
            console.error('pls go to setting and define which to hide. 请到插件设置页面指定');
            return [];
        }
    }

    async onLayoutReady() {
    }

    async onload() {

        try {
            const _item_ = await this.loadData(unwantedItem);
            this.data[unwantedItem].unwantedItems = _item_.unwantedItems;
        } catch (error) {
            //created by zxkmm at 2023.12.4 under MIT license
            //repo: https://github.com/zxkmm/siyuan_rmv_btn
            this.data[unwantedItem] = { unwantedItems: "" };
        }


        const _unwantedItems_ = document.createElement("textarea");
        this.addIcons(`<symbol id="HOME" viewBox="0 0 1024 1024">
        <path d="M562.9 80.9C535.4 56 493.5 56 466 80.9L74 453.1c-14.7 13.5-15.7 36.4-2.2 51.1 13.3 14.5 35.8 15.7 50.6 2.6l6.2-5.9v388.4c0 39.9 32.3 72.4 72.2 72.4h210.5V744c0-28.1 22.7-50.9 50.8-51h99.1c28.1 0 50.9 22.8 50.9 50.9V961.7h215.4c39.9 0 72.3-32.4 72.3-72.3V505.7c16.1 14.5 38.9 13.4 52.2-1.5 13.4-14.8 12.2-37.7-2.6-51.1L562.9 80.9z" fill="#ff001a"></path>
        </symbol>
        <symbol id="iconHouse" viewBox="0 0 1024 1024">
        <path d="M562.9 80.9C535.4 56 493.5 56 466 80.9L74 453.1c-14.7 13.5-15.7 36.4-2.2 51.1 13.3 14.5 35.8 15.7 50.6 2.6l6.2-5.9v388.4c0 39.9 32.3 72.4 72.2 72.4h210.5V744c0-28.1 22.7-50.9 50.8-51h99.1c28.1 0 50.9 22.8 50.9 50.9V961.7h215.4c39.9 0 72.3-32.4 72.3-72.3V505.7c16.1 14.5 38.9 13.4 52.2-1.5 13.4-14.8 12.2-37.7-2.6-51.1L562.9 80.9z" fill="#ff001a"></path>
</symbol>
`);

        this.setting = new Setting({
            confirmCallback: () => {
                this.saveData(unwantedItem, { unwantedItems: _unwantedItems_.value });
            }
        });
        this.setting.addItem({
            title: "Note",
            description: "If items you are trying to hide is related to SiYuan's commercial part, please consider to donate to @D and @V (not me) because they lives by writing open-source codes.<br>如果你试图隐藏的菜单项目与思源的商业部分有关，请考虑捐赠给@D和@V（不是我），因为他们靠写开源代码生活。 ",
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


        unwantedLabels = this.convertStringToArray(this.data[unwantedItem].unwantedItems);
        console.log("pla-ce1:");//DBG
        console.log(unwantedLabels);//DBG
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

