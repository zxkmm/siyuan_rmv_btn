declare global {
  var windowControls: any;
  var closeWindow: any;
  var minWindow: any;
  var maxWindow: any;
}

import { Plugin, Dialog, showMessage, getFrontend } from "siyuan";
import "@/index.scss";

import { SettingUtils } from "./libs/setting-utils";
import SettingDialog from "./libs/SettingDialog.svelte";
import type {
  SettingItem,
  CategoryId,
} from "./libs/SettingDialog.svelte";

import { build_css } from "./css_injection";

import { sy_hardcoded_name_map } from "./sy_hardcoded_name_map";

import { get_human_readable_name_by_identifier_from_map } from "./dynamic_i18n";
const STORAGE_NAME = "menu-config";

const frontEnd = getFrontend();

const opration_system = navigator.platform.toLocaleLowerCase();

const targetNode = document.getElementById("commonMenu");

/**
 * Determine the display category from a map key prefix.
 */
function getCategoryByKey(key: string): Exclude<CategoryId, "about"> {
  if (key.startsWith("slash_menu_")) return "slash_menu";
  if (key.startsWith("block_menu_")) return "block_menu";
  if (key.startsWith("editor_menu_")) return "editor_menu";
  if (key.startsWith("top_bottom_bar_")) return "top_bottom_bar";
  if (key.startsWith("side_bar_")) return "side_bar";
  // fallback — should never happen with current map
  return "slash_menu";
}

/**
 * Build the HTML for the "About / Credits" tab by combining
 * the begging + hint i18n sections that were previously rendered
 * as separate "hint"-type items.
 */
function buildAboutHtml(i18n: any): string {
  const parts: string[] = [];

  // Guide banner (inline style, reuses b3-callout look)
  if (i18n.guideDesc) {
    parts.push(`<div class="b3-callout b3-callout--info">${i18n.guideDesc}</div>`);
  }

  // Begging card
  if (i18n.beggingDesc) {
    parts.push(`<div class="b3-callout b3-callout--warning">${i18n.beggingDesc}</div>`);
  }

  // Hint / About card
  if (i18n.hintDesc) {
    parts.push(`<div class="b3-callout">${i18n.hintDesc}</div>`);
  }

  return parts.join("<hr class=\"b3-typography-hr\" style=\"margin:16px 0\">");
}

export default class siyuan_rmv_btn extends Plugin {
  private settingUtils: SettingUtils;
  private isMobile: boolean;
  private final_css: string;

  async onload() {
    this.isMobile = frontEnd === "mobile" || frontEnd === "browser-mobile";

    this.settingUtils = new SettingUtils(this, STORAGE_NAME);
    this.settingUtils.load();

    // Register every removable item in the settings Map so that
    // the persistence layer (load/save/dump) and css_injection.ts
    // (which iterates settingUtils.settings) continue to work.
    // We skip the native Setting panel (skipNative = true) —
    // the actual UI is rendered by the Svelte SettingDialog.
    for (const [key] of sy_hardcoded_name_map) {
      this.settingUtils.addItem(
        {
          key: key,
          value: false,
          type: "checkbox",
          title: get_human_readable_name_by_identifier_from_map(
            key,
            sy_hardcoded_name_map
          ),
        },
        true // skipNative
      );
    }

    // No longer add "begging", "guide", or "hint" items to the
    // settings Map — they were only there for the old flat Setting
    // panel. The new Svelte dialog renders them directly from i18n.

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

  /**
   * Override the default openSetting to show the categorized,
   * searchable Svelte dialog instead of the flat native Setting panel.
   */
  openSetting() {
    // Build the items array with category metadata
    const items: SettingItem[] = [];
    for (const [key, entry] of sy_hardcoded_name_map) {
      items.push({
        key,
        label: get_human_readable_name_by_identifier_from_map(
          key,
          sy_hardcoded_name_map
        ),
        identifier: entry.html_css_or_field_hardcoded_name,
        category: getCategoryByKey(key),
      });
    }

    const initialValues = this.settingUtils.getAll();

    const aboutHtml = buildAboutHtml(this.i18n);

    const dialog = new Dialog({
      title: this.i18n.rmvBtnSetting,
      content: `<div id="rmv-btn-setting-mount" style="height:100%;"></div>`,
      width: this.isMobile ? undefined : "960px",
      height: this.isMobile ? "100dvh" : "80vh",
      destroyCallback: () => {
        // Svelte auto-clears on target destruction
      },
    });

    // Mount after DOM insertion — use a microtask so the parent
    // container is guaranteed to be in the document
    setTimeout(() => {
      const target = dialog.element.querySelector(
        "#rmv-btn-setting-mount"
      ) as HTMLElement;
      if (!target) return;

      const comp = new SettingDialog({
        target,
        props: {
          items,
          initialValues,
          i18n: this.i18n,
          aboutHtml,
          onSave: (values: { [key: string]: boolean }) => {
            // Write values back to the settings Map
            this.settingUtils.applyValues(values);
            // Persist to disk
            this.settingUtils.save().then(() => {
              // Reload so css_injection picks up the new state
              window.location.reload();
            });
          },
          onCancel: () => {
            dialog.destroy();
          },
        },
      });
    }, 0);
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
