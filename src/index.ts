declare global {
  var windowControls: any;
  var closeWindow: any;
  var minWindow: any;
  var maxWindow: any;
}

import { Plugin, showMessage, getFrontend } from "siyuan";
import "@/index.scss";

import { SettingUtils } from "./libs/setting-utils";
import { convertStringToArray } from "./helper";
import {
  rmvMenuItems,
  rmvTopButtonBarIcons,
  rmvSideBarIcons,
} from "./css_injection";

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

  async onload() {
    this.isMobile = frontEnd === "mobile" || frontEnd === "browser-mobile";

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
        3: "MutationObserver(type hard coded)",
      },
    });
    this.settingUtils.addItem({
      key: "seperateHandlePolicy",
      value: 1,
      type: "select",
      title: this.i18n.seperateHandlePolicy,
      description: this.i18n.seperateHandlePolicydesc,
      options: {
        1: this.i18n.seperateHandlePolicyDontTouch,
        2: this.i18n.seperateHandlePolicyHideAll,
        3: this.i18n.seperateHandlePolicyHideIfTwoMeetEachOther,
        5: "@zxhd863943427",
      },
    });
    this.settingUtils.addItem({
      key: "itemRemovePolicy",
      value: 1,
      type: "select",
      title: this.i18n.itemRemovePolicy,
      description: this.i18n.itemRemovePolicydesc,
      options: {
        1: this.i18n.itemRemovePolicyRemove,
        2: this.i18n.itemRemovePolicyDisplayNone,
        // 3: this.i18n.seperateHandlePolicyCss
      },
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

    this.settingUtils.addItem({
      key: "hintForRemovedWindowsControlButtons",
      value: "",
      type: "hint",
      title: this.i18n.hintForRemovedWindowsControlButtons,
      description: this.i18n.hintForRemovedWindowsControlButtonsDesc,
    });

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

    if (this.settingUtils.get("totalSwitch")) {
      rmvTopButtonBarIcons(
        convertStringToArray(this.settingUtils.get("unwantedTopButtonBarIcon"))
      );

      rmvSideBarIcons(
        convertStringToArray(this.settingUtils.get("unwantedSideBarIcon")),
        frontEnd
      );

      rmvMenuItems(
        convertStringToArray(this.settingUtils.get("unwantedMenuItem")),
        this.settingUtils.get("listenImplementation"),
        this.settingUtils.get("seperateHandlePolicy"),
        this.settingUtils.get("itemRemovePolicy"),
        targetNode
      );
    }
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
