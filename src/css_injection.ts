import { showMessage } from "siyuan";

export function applyStyles(css) {
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  head.appendChild(style);
  style.appendChild(document.createTextNode(css));
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
        const buttons = Array.from(_target_node_.getElementsByTagName("button"));
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
          const buttons = Array.from(_target_node_.getElementsByTagName("button"));
          this.hideButtonsAndSeparators(buttons);
        }
      }
    });

    observer.observe(_target_node_, { childList: true, subtree: true });
  } else {
    var observer = new MutationObserver(function (mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          const buttons = Array.from(_target_node_.getElementsByTagName("button"));
          this.hideButtonsAndSeparators(buttons);
        }
      }
    });

    observer.observe(_target_node_, { childList: true, subtree: true });
  }
}

export function rmvTopButtonBarIcons(_toRemoveListArray_) {
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

export function rmvSideBarIcons(_toRemoveListArray_, _front_end_) {
  if (_front_end_ == "desktop" || _front_end_ == "browser-desktop") {
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
  if (_front_end_ == "mobile" || _front_end_ == "browser-mobile") {
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

export function reloadInterface() {
  // window.location.reload();
  showMessage(this.i18n.reload_hint);
}
