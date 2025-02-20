declare global {
  var windowControls: any;
  var closeWindow: any;
  var minWindow: any;
  var maxWindow: any;
}

import { Plugin, showMessage, getFrontend } from "siyuan";
import "@/index.scss";

import { SettingUtils } from "./libs/setting-utils";
import { build_css } from "./css_injection";

import { sy_hardcoded_name_map } from "./sy_hardcoded_name_map";

import { get_human_readable_name_by_identifier_from_map } from "./dynamic_i18n";
const STORAGE_NAME = "menu-config";

const frontEnd = getFrontend();

// TODO: use User-Agent Client Hints API to get platform

// if (navigator.userAgentData) {
//     navigator.userAgentData.getHighEntropyValues(["platform"])
//         .then(platform => {
//             console.log(platform);
//         })
//         .catch(error => {
//             console.error(error);
//         });
// } else {
//     console.log('User-Agent Client Hints API not supported.');
// }

const opration_system = navigator.platform.toLocaleLowerCase();

const targetNode = document.getElementById("commonMenu"); //it's the menu's id, fetch firstly and hoping it increase some performance.

export default class siyuan_rmv_btn extends Plugin {
  private settingUtils: SettingUtils;
  private isMobile: boolean;
  private final_css: string;

  async onload() {
    this.isMobile = frontEnd === "mobile" || frontEnd === "browser-mobile";

    this.settingUtils = new SettingUtils(this, STORAGE_NAME);
    this.settingUtils.load();

    this.settingUtils.addItem({
      key: "begging",
      value: "",
      type: "hint",
      title: this.i18n.beggingTitle,
      description: this.i18n.beggingDesc,
    });
    this.settingUtils.addItem({
      key: "guide",
      value: "",
      type: "hint",
      title: this.i18n.guideTitle,
      description: this.i18n.guideDesc,
    });
    // this.settingUtils.addItem({
    //   key: "seperateHandlePolicy",
    //   value: 1,
    //   type: "select",
    //   title: this.i18n.seperateHandlePolicy,
    //   description: this.i18n.seperateHandlePolicydesc,
    //   options: {
    //     1: this.i18n.seperateHandlePolicyDontTouch,
    //     2: this.i18n.seperateHandlePolicyHideAll,
    //     3: this.i18n.seperateHandlePolicyHideIfTwoMeetEachOther,
    //     5: "@zxhd863943427",
    //   },
    // });

    for (const [key, value] of sy_hardcoded_name_map) {
      this.settingUtils.addItem({
        key: key,
        value: false,
        type: "checkbox",
        title: get_human_readable_name_by_identifier_from_map(
          key,
          sy_hardcoded_name_map
        ),
      });
    }

    this.settingUtils.addItem({
      key: "hint",
      value: "",
      type: "hint",
      title: this.i18n.hintTitle,
      description: this.i18n.hintDesc,
    });

    if (this.isMobile) {
      this.addTopBar({
        icon: "iconDock",
        title: this.isMobile
          ? this.i18n.rmvBtnSetting
          : this.i18n.rmvBtnSetting,
        position: "right",
        callback: () => {
          if (this.isMobile) {
            this.openSetting();

            // this.addMenu();
            // console.log("mobile");

            //   } else {
            //     let rect = topBarElement.getBoundingClientRect();
            //     if (rect.width === 0) {
            //       rect = document.querySelector("#barMore").getBoundingClientRect();
            //     }
            //     if (rect.width === 0) {
            //       rect = document
            //         .querySelector("#barPlugins")
            //         .getBoundingClientRect();
            //     }
            //     // this.swapStreamerMode();
          }
        },
      });
    }
  }

  onLayoutReady() {
    this.loadData(STORAGE_NAME);
    this.settingUtils.load();

    build_css(this.settingUtils, sy_hardcoded_name_map);
  }

  async onunload() {
    // await this.settingUtils.save();
    // this.reloadInterface();
  }

  uninstall() {
    this.removeData(STORAGE_NAME);
    showMessage(this.i18n.uninstall_hint);
  }
}
