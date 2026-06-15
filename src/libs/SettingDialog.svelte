<!--
 SettingDialog.svelte
 Remove Button plugin — categorized & searchable settings panel.
 Rendered inside a SiYuan Dialog; styling reuses SiYuan's own b3 classes
 (b3-switch / b3-label / config__tab) so it matches the native look.

 Layout: left category nav (with hidden-count badges) + right content panel,
 plus a global search box that cross-filters all categories.
 On narrow screens (mobile) the nav collapses to a horizontal scroll bar.
-->
<script lang="ts">
  export type CategoryId =
    | "slash_menu"
    | "block_menu"
    | "editor_menu"
    | "top_bottom_bar"
    | "side_bar"
    | "about";

  export interface SettingItem {
    key: string;
    label: string; // localized human-readable name
    identifier: string; // raw hardcoded name (shown as subtitle)
    category: Exclude<CategoryId, "about">;
  }

  export let items: SettingItem[] = [];
  export let initialValues: { [key: string]: boolean } = {};
  export let i18n: any = {};
  export let aboutHtml: string = ""; // begging + hint HTML for the About tab
  export let onSave: ((values: { [key: string]: boolean }) => void) | null = null;
  export let onCancel: (() => void) | null = null;

  // live working copy
  let values: { [key: string]: boolean } = { ...initialValues };

  let activeCategory: CategoryId = "slash_menu";
  let searchTerm = "";
  let activeNormal: Exclude<CategoryId, "about"> = "slash_menu";

  // category id -> i18n label + the icon prefix used in the nav
  const CATEGORY_META: { id: Exclude<CategoryId, "about">; labelKey: string; icon: string }[] = [
    { id: "slash_menu", labelKey: "catSlashMenu", icon: "iconAlignCenter" },
    { id: "block_menu", labelKey: "catBlockMenu", icon: "iconPlugin" },
    { id: "editor_menu", labelKey: "catEditorMenu", icon: "iconBookmark" },
    { id: "top_bottom_bar", labelKey: "catTopBottomBar", icon: "iconLayoutBottom" },
    { id: "side_bar", labelKey: "catSideBar", icon: "iconDock" },
  ];

  $: itemsByCategory = (() => {
    const m: { [c: string]: SettingItem[] } = {};
    for (const it of items) {
      (m[it.category] ||= []).push(it);
    }
    return m;
  })();

  function countHidden(cat: Exclude<CategoryId, "about">): number {
    return (itemsByCategory[cat] || []).filter((it) => values[it.key]).length;
  }

  function totalCount(cat: Exclude<CategoryId, "about">): number {
    return (itemsByCategory[cat] || []).length;
  }

  $: searching = searchTerm.trim().length > 0;

  // activeCategory without "about" — used for count lookups in the template
  $: activeNormal = activeCategory === "about" ? "slash_menu" : activeCategory;

  $: searchResults = searching
    ? items.filter((it) => {
        const q = searchTerm.trim().toLowerCase();
        return (
          it.label.toLowerCase().includes(q) ||
          it.key.toLowerCase().includes(q) ||
          it.identifier.toLowerCase().includes(q)
        );
      })
    : [];

  // visible list on the right pane
  $: visibleItems = searching
    ? searchResults
    : activeCategory === "about"
    ? []
    : itemsByCategory[activeCategory] || [];

  function pickFirstNonEmptyCategory(): Exclude<CategoryId, "about"> {
    for (const meta of CATEGORY_META) {
      if ((itemsByCategory[meta.id] || []).length > 0) return meta.id;
    }
    return "slash_menu";
  }

  function onSearchInput() {
    // while searching the right pane auto shows cross-category hits;
    // nothing else to do here.
  }

  function clearSearch() {
    searchTerm = "";
  }

  function setAllInCurrent(value: boolean) {
    if (searching) {
      for (const it of searchResults) values[it.key] = value;
    } else if (activeCategory !== "about") {
      for (const it of itemsByCategory[activeCategory] || []) values[it.key] = value;
    }
    values = { ...values };
  }

  function resetAll() {
    if (window.confirm(i18n?.resetAllConfirm || "Reset all?")) {
      const next: { [key: string]: boolean } = {};
      for (const it of items) next[it.key] = false;
      values = next;
    }
  }

  function cancel() {
    if (onCancel) onCancel();
  }

  function save() {
    if (onSave) onSave({ ...values });
  }

  function hiddenCountText(n: number): string {
    return (i18n?.hiddenCount || "{n} hidden").replace("{n}", String(n));
  }

  // keyboard: Escape to cancel (Dialog already handles close), Enter in search stays in filter
</script>

<div class="rmv-btn-setting">
  <!-- search bar (always visible) -->
  <div class="rmv-btn-setting__search">
    <svg class="rmv-btn-setting__search-icon">
      <use xlink:href="#iconSearch"></use>
    </svg>
    <input
      class="b3-text-field fn__flex-1"
      type="text"
      placeholder={i18n?.settingSearchPlaceholder || "Search..."}
      bind:value={searchTerm}
      on:input={onSearchInput}
    />
    {#if searching}
      <span
        class="rmv-btn-setting__search-clear b3-tooltips b3-tooltips__w"
        aria-label={i18n?.resetAll || "Clear"}
        on:click={clearSearch}
        on:keydown={(e) => e.key === "Enter" && clearSearch()}
        role="button"
        tabindex="0"
      >
        <svg><use xlink:href="#iconClose"></use></svg>
      </span>
    {/if}
  </div>

  <div class="rmv-btn-setting__body">
    <!-- left nav -->
    <ul class="rmv-btn-setting__nav">
      {#each CATEGORY_META as meta (meta.id)}
        {#if totalCount(meta.id) > 0}
          <li>
            <button
              class="rmv-btn-setting__nav-item"
              class:is-active={!searching && activeCategory === meta.id}
              on:click={() => {
                activeCategory = meta.id;
                searchTerm = "";
              }}
            >
              <svg class="rmv-btn-setting__nav-icon">
                <use xlink:href="#{meta.icon}"></use>
              </svg>
              <span class="rmv-btn-setting__nav-label">{i18n?.[meta.labelKey] || meta.id}</span>
              <span
                class="rmv-btn-setting__nav-count"
                class:has-hidden={countHidden(meta.id) > 0}
              >{countHidden(meta.id)}/{totalCount(meta.id)}</span>
            </button>
          </li>
        {/if}
      {/each}
      <li class="rmv-btn-setting__nav-spacer"></li>
      <li>
        <button
          class="rmv-btn-setting__nav-item"
          class:is-active={!searching && activeCategory === "about"}
          on:click={() => {
            activeCategory = "about";
            searchTerm = "";
          }}
        >
          <svg class="rmv-btn-setting__nav-icon"><use xlink:href="#iconHelp"></use></svg>
          <span class="rmv-btn-setting__nav-label">{i18n?.catAbout || "About"}</span>
        </button>
      </li>
    </ul>

    <!-- right content -->
    <div class="rmv-btn-setting__content">
      {#if searching}
        <div class="rmv-btn-setting__contenthead">
          <span class="ft__on-surface">
            {searchResults.length} / {items.length}
          </span>
        </div>
      {:else if activeCategory !== "about"}
        <div class="rmv-btn-setting__contenthead">
          <span class="ft__on-surface">
            {hiddenCountText(countHidden(activeNormal))}
          </span>
          <span class="rmv-btn-setting__bulk">
            <button
              class="b3-button b3-button--small b3-button--text"
              on:click={() => setAllInCurrent(true)}
            >{i18n?.selectAll || "Hide All"}</button>
            <button
              class="b3-button b3-button--small b3-button--text"
              on:click={() => setAllInCurrent(false)}
            >{i18n?.selectNone || "Show All"}</button>
          </span>
        </div>
      {/if}

      {#if activeCategory === "about" && !searching}
        <div class="rmv-btn-setting__about b3-typography">
          {@html aboutHtml}
        </div>
      {:else if visibleItems.length === 0}
        <div class="rmv-btn-setting__empty ft__on-surface">
          {i18n?.noResults || "No results"}
        </div>
      {:else}
        <div class="rmv-btn-setting__items">
          {#each visibleItems as item (item.key)}
            <label class="rmv-btn-setting__item">
              <div class="rmv-btn-setting__item-label">
                <span class="rmv-btn-setting__item-title">{item.label}</span>
                <span class="rmv-btn-setting__item-id">{i18n?.itemIdLabel || "id"}: {item.identifier}</span>
              </div>
              <input
                class="b3-switch fn__flex-center"
                type="checkbox"
                bind:checked={values[item.key]}
              />
            </label>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <!-- footer -->
  <div class="rmv-btn-setting__footer">
    <button
      class="b3-button b3-button--text"
      on:click={resetAll}
    >{i18n?.resetAll || "Reset All"}</button>
    <span class="fn__flex-1"></span>
    <button
      class="b3-button b3-button--cancel"
      on:click={cancel}
    >Cancel</button>
    <span class="fn__space"></span>
    <button
      class="b3-button b3-button--text"
      on:click={save}
    >{i18n?.saveAndReload || "Save & Reload"}</button>
  </div>
</div>

<style>
  .rmv-btn-setting {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
  }

  /* search bar */
  .rmv-btn-setting__search {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 16px;
    border-bottom: 1px solid var(--b3-border-color);
    background: var(--b3-theme-background);
  }
  .rmv-btn-setting__search-icon,
  .rmv-btn-setting__search-clear svg {
    width: 14px;
    height: 14px;
    color: var(--b3-theme-on-surface);
    flex-shrink: 0;
  }
  .rmv-btn-setting__search-icon {
    width: 16px;
    height: 16px;
  }
  .rmv-btn-setting__search-clear {
    cursor: pointer;
    display: inline-flex;
    opacity: 0.6;
  }
  .rmv-btn-setting__search-clear:hover {
    opacity: 1;
  }

  /* body: nav + content */
  .rmv-btn-setting__body {
    flex: 1;
    display: flex;
    min-height: 0;
  }

  .rmv-btn-setting__nav {
    list-style: none;
    margin: 0;
    padding: 8px 0;
    width: 200px;
    flex-shrink: 0;
    border-right: 1px solid var(--b3-border-color);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
  .rmv-btn-setting__nav-spacer {
    flex: 1;
  }
  .rmv-btn-setting__nav-item {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 8px;
    padding: 8px 16px;
    border: 0;
    background: transparent;
    color: var(--b3-theme-on-background);
    cursor: pointer;
    text-align: left;
    font-size: 14px;
  }
  .rmv-btn-setting__nav-item:hover {
    background: var(--b3-list-icon-hover);
  }
  .rmv-btn-setting__nav-item.is-active {
    background: var(--b3-theme-background-light);
    color: var(--b3-theme-primary);
  }
  .rmv-btn-setting__nav-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    opacity: 0.7;
  }
  .rmv-btn-setting__nav-item.is-active .rmv-btn-setting__nav-icon {
    opacity: 1;
  }
  .rmv-btn-setting__nav-label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .rmv-btn-setting__nav-count {
    font-size: 12px;
    color: var(--b3-theme-on-surface);
    flex-shrink: 0;
    background: var(--b3-theme-surface);
    border-radius: 8px;
    padding: 1px 6px;
  }
  .rmv-btn-setting__nav-count.has-hidden {
    color: var(--b3-theme-on-primary);
    background: var(--b3-theme-primary);
  }

  /* content */
  .rmv-btn-setting__content {
    flex: 1;
    overflow-y: auto;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }
  .rmv-btn-setting__contenthead {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-bottom: 1px solid var(--b3-border-color);
    position: sticky;
    top: 0;
    background: var(--b3-theme-background);
    z-index: 1;
    font-size: 12px;
  }
  .rmv-btn-setting__bulk {
    margin-left: auto;
    display: flex;
    gap: 4px;
  }

  /* items — custom rows, no reliance on native b3-label */
  .rmv-btn-setting__items {
    padding: 2px 0;
  }
  .rmv-btn-setting__item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 16px;
    border-bottom: 1px solid var(--b3-border-color);
    cursor: pointer;
  }
  .rmv-btn-setting__item:last-child {
    border-bottom: none;
  }
  .rmv-btn-setting__item:hover {
    background: var(--b3-list-icon-hover);
  }
  .rmv-btn-setting__item-label {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .rmv-btn-setting__item-title {
    font-size: 14px;
    color: var(--b3-theme-on-background);
    line-height: 1.4;
  }
  .rmv-btn-setting__item-id {
    font-size: 11px;
    color: var(--b3-theme-on-surface);
    opacity: 0.6;
    line-height: 1.3;
  }
  .rmv-btn-setting__empty {
    padding: 48px 16px;
    text-align: center;
  }

  /* about section */
  .rmv-btn-setting__about {
    padding: 16px 24px;
  }

  /* footer */
  .rmv-btn-setting__footer {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-top: 1px solid var(--b3-border-color);
    background: var(--b3-theme-background);
  }

  /* mobile / narrow: collapse nav into a horizontal scroll strip */
  :global(.b3-dialog__container.is-mobile) .rmv-btn-setting__body {
    flex-direction: column;
  }
  :global(.b3-dialog__container.is-mobile) .rmv-btn-setting__nav {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    border-right: 0;
    border-bottom: 1px solid var(--b3-border-color);
    padding: 4px 8px;
  }
  :global(.b3-dialog__container.is-mobile) .rmv-btn-setting__nav-spacer {
    display: none;
  }
  :global(.b3-dialog__container.is-mobile) .rmv-btn-setting__nav-item {
    white-space: nowrap;
    padding: 6px 10px;
  }

  @media (max-width: 640px) {
    .rmv-btn-setting__body {
      flex-direction: column;
    }
    .rmv-btn-setting__nav {
      width: 100%;
      flex-direction: row;
      overflow-x: auto;
      overflow-y: hidden;
      border-right: 0;
      border-bottom: 1px solid var(--b3-border-color);
      padding: 4px 8px;
    }
    .rmv-btn-setting__nav-spacer {
      display: none;
    }
    .rmv-btn-setting__nav-item {
      white-space: nowrap;
      padding: 6px 10px;
    }
  }
</style>
