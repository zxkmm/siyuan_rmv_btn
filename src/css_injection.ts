import { showMessage } from "siyuan";

export function applyStyles(css) {
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  head.appendChild(style);
  style.appendChild(document.createTextNode(css));
}

export function build_css(setting_u, map) {
  let css = ``;
  const config = setting_u.settings;
  for (let [key, item] of config) {
    console.log([item]);
    if (item.type === "checkbox" && item.value) {
      if (key.includes("top_bottom_bar_")) {
        css += `

/* top bottom icon */
#${map.get(key)["html_css_or_field_hardcoded_name"]} {
  display: none !important;
}

`;
      } else if (key.includes("side_bar_")) {
        css += `

/* desktop side bar icon */
.dock__item[data-type="${map.get(key)["html_css_or_field_hardcoded_name"]}"] {
  display: none !important;
}        

/* mobile side bar icon */
.toolbar__icon[data-type="sidebar-${
          map.get(key)["html_css_or_field_hardcoded_name"]
        }-tab"] {
  display: none !important;
  }


`;
      } else if (key.includes("slash_menu_")) {
        css += `

/* slash menu */
.layout-tab-container .protyle .protyle-hint.b3-list.b3-list--background.hint--menu button[data-id="${
          map.get(key)["html_css_or_field_hardcoded_name"]
        }"]{
  display: none !important;
}

`;
      } else if (key.includes("block_menu_") || key.includes("editor_menu_")) {
        css += `

/* block or editor menu */
#commonMenu .b3-menu__items > button[data-id="${
          map.get(key)["html_css_or_field_hardcoded_name"]
        }"] {
    display: none;
}

        
`;
      }
    }

    console.log(css);

    applyStyles(css);
  }
}

export function rmvMenuItems(
  _toRemoveListArray_,
  _monitorImplementation_,
  _seperateHidingPolicy_,
  _itemRemovePolicy_,
  _target_node_
) {
  //seperate pilocy: 1; don't touch
  //                2: hide all
  //                3: hide if two meet each other

  function hideButtonsAndSeparators(_items_, _target_node_) {
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
      let separatorList = Array.from(_items_ as HTMLElement[]).filter((item) =>
        item.classList.contains("b3-menu__separator")
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
    _target_node_.addEventListener(
      "DOMNodeInserted",
      function (e) {
        const buttons = Array.from(
          _target_node_.getElementsByTagName("button")
        );
        this.hideButtonsAndSeparators(buttons);
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
            _target_node_.getElementsByTagName("button")
          );
          this.hideButtonsAndSeparators(buttons);
        }
      }
    });

    observer.observe(_target_node_, { childList: true, subtree: true });
  } else {
    var observer = new MutationObserver(function (mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          const buttons = Array.from(
            _target_node_.getElementsByTagName("button")
          );
          this.hideButtonsAndSeparators(buttons);
        }
      }
    });

    observer.observe(_target_node_, { childList: true, subtree: true });
  }
}

export function reloadInterface() {
  // window.location.reload();
  showMessage(this.i18n.reload_hint);
}
