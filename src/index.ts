declare global {
  var windowControls: any;
  var closeWindow: any;
  var minWindow: any;
  var maxWindow: any;
}

import { Plugin, showMessage, getFrontend } from "siyuan";
import "@/index.scss";

import { SettingUtils } from "./libs/setting-utils";

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

  applyStyles(css) {
    const head = document.head || document.getElementsByTagName("head")[0];
    const style = document.createElement("style");
    head.appendChild(style);
    style.appendChild(document.createTextNode(css));
  }

  rmvMenuItems(
    _toRemoveListArray_,
    _monitorImplementation_,
    _seperateHidingPolicy_,
    _itemRemovePolicy_
  ) {
    //seperate pilocy: 1; don't touch
    //                2: hide all
    //                3: hide if two meet each other

    function hideButtonsAndSeparators(_items_) {
      for (let i = 0; i < _items_.length; i++) {
        //hide btns
        let item = _items_[i];
        if (item.classList.contains("b3-menu__item")) {
          let labelElement = item.getElementsByClassName("b3-menu__label")[0];
          if (labelElement) {
            let span_text = labelElement.textContent.trim();
            if (_toRemoveListArray_.includes(span_text)) {
              if (_itemRemovePolicy_ == 1) {
                item.remove();
              } else if (_itemRemovePolicy_ == 2) {
                item.style.display = "none";
              }
            }
          }
        }
      }

      if (_seperateHidingPolicy_ == 3) {
        // test seperate and hide if two meet each other
        // TODO: didn't handle the situation that more than two seperators meet each other....
        let startSeparatorIndex = -1;
        let previousSeparatorHidden = false;
        for (let i = 0; i < _items_.length; i++) {
          if (_items_[i].classList.contains("b3-menu__separator")) {
            if (startSeparatorIndex === -1) {
              startSeparatorIndex = i;
            } else {
              let allButtonsHidden = true;
              for (let j = startSeparatorIndex + 1; j < i; j++) {
                if (_items_[j].style.display !== "none") {
                  allButtonsHidden = false;
                  break;
                }
              }
              if (allButtonsHidden && !previousSeparatorHidden) {
                _items_[startSeparatorIndex].style.display = "none";
                previousSeparatorHidden = true;
              } else {
                previousSeparatorHidden = false;
              }
              startSeparatorIndex = i;
            }
          }
        }
      } else if (_seperateHidingPolicy_ == 2) {
        // hide all
        for (let i = 0; i < _items_.length; i++) {
          if (_items_[i].classList.contains("b3-menu__separator")) {
            _items_[i].style.display = "none";
          }
        }
      } else if (_seperateHidingPolicy_ == 5) {
        // by @zxhd863943427
        let separatorList = Array.from(_items_ as HTMLElement[]).filter(
          (item) => item.classList.contains("b3-menu__separator")
        );
        let hiddenList = [];
        for (let index = 1; index < separatorList.length; index++) {
          const lastSeparator = separatorList[index - 1];
          const currentSeparator = separatorList[index];
          if (currentSeparator.offsetTop < lastSeparator.offsetTop + 30) {
            hiddenList.push(currentSeparator);
          }
        }
        hiddenList.forEach((x) => (x.style.display = "none"));
      }
    }

    if (_monitorImplementation_ == 1) {
      //DOMNodeInserted
      targetNode.addEventListener(
        "DOMNodeInserted",
        function (e) {
          const buttons = Array.from(targetNode.getElementsByTagName("button"));
          hideButtonsAndSeparators(buttons);
        },
        false
      );
      console.log(this.i18n.ignore_warning);
    } else if (_monitorImplementation_ == 2) {
      //MutationObserver
      var observer = new MutationObserver(function (mutationsList, observer) {
        for (let mutation of mutationsList) {
          if (mutation.type) {
            const buttons = Array.from(
              targetNode.getElementsByTagName("button")
            );
            hideButtonsAndSeparators(buttons);
          }
        }
      });

      observer.observe(targetNode, { childList: true, subtree: true });
    } else {
      var observer = new MutationObserver(function (mutationsList, observer) {
        for (let mutation of mutationsList) {
          if (mutation.type === "childList") {
            const buttons = Array.from(
              targetNode.getElementsByTagName("button")
            );
            hideButtonsAndSeparators(buttons);
          }
        }
      });

      observer.observe(targetNode, { childList: true, subtree: true });
    }
  }

  rmvTopButtonBarIcons(_toRemoveListArray_) {
    _toRemoveListArray_.forEach((elementType) => {
      const styleElement = document.createElement("style");
      styleElement.textContent = `
                #${elementType} {
                    display: none;
                }
            `;

      document.head.appendChild(styleElement);
    });
  }

  rmvSideBarIcons(_toRemoveListArray_) {
    if (frontEnd == "desktop" || frontEnd == "browser-desktop") {
      //pc view
      _toRemoveListArray_.forEach((elementType) => {
        const styleElement = document.createElement("style");
        styleElement.textContent = `
            .dock__item[data-type="${elementType}"] {
                display: none;
            }
            `;
        document.head.appendChild(styleElement);
      });
      //mobile view
    }
    if (frontEnd == "mobile" || frontEnd == "browser-mobile") {
      //mobile
      _toRemoveListArray_.forEach((elementType) => {
        const styleElement = document.createElement("style");
        styleElement.textContent = `
            .toolbar__icon[data-type="sidebar-${elementType}-tab"] {
                display: none;
              }
            `;

        document.head.appendChild(styleElement);
      });
    }
  }

  reloadInterface() {
    // window.location.reload();
    showMessage(this.i18n.reload_hint);
  }

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
      this.rmvTopButtonBarIcons(
        this.convertStringToArray(
          this.settingUtils.get("unwantedTopButtonBarIcon")
        )
      );

      this.rmvSideBarIcons(
        this.convertStringToArray(this.settingUtils.get("unwantedSideBarIcon"))
      );

      this.rmvMenuItems(
        this.convertStringToArray(this.settingUtils.get("unwantedMenuItem")),
        this.settingUtils.get("listenImplementation"),
        this.settingUtils.get("seperateHandlePolicy"),
        this.settingUtils.get("itemRemovePolicy")
      );
    }
  }

  async onunload() {
    await this.settingUtils.save();
    // this.reloadInterface();
  }

  uninstall() {
    this.removeData(STORAGE_NAME);
    showMessage(this.i18n.uninstall_hint);
  }
}
