/*
 * Copyright (c) 2023 by frostime. All Rights Reserved.
 * @Author       : frostime
 * @Date         : 2023-09-16 18:05:00
 * @FilePath     : /src/libs/setting-utils.ts
 * @LastEditTime : 2023-12-28 18:10:12
 * @Description  : A utility for siyuan plugin settings
 */

import { Plugin, Setting } from 'siyuan';
// import { slash_menu_hardcoded_name_map } from '../sy_hardcoded_name_map';

export class SettingUtils {
    plugin: Plugin;
    name: string;
    file: string;

    settings: Map<string, ISettingItem> = new Map();
    elements: Map<string, HTMLElement> = new Map();

    constructor(plugin: Plugin, name?: string, callback?: (data: any) => void, width?: string, height?: string) {
        this.name = name ?? 'settings';
        this.plugin = plugin;
        this.file = this.name.endsWith('.json') ? this.name : `${this.name}.json`;
        this.plugin.setting = new Setting({
            width: width,
            height: height,
            confirmCallback: () => {
                for (let key of this.settings.keys()) {
                    this.updateValue(key);
                }
                let data = this.dump();
                if (callback !== undefined) {
                    callback(data);
                } else {
                    this.plugin.data[this.name] = data;
                    this.save();
                }
                window.location.reload();
            }
        });
    }

    async load() {
        let data = await this.plugin.loadData(this.file);
        console.debug('Load config:', data);
        if (data) {
            for (let [key, item] of this.settings) {
                item.value = data?.[key] ?? item.value;
            }
        }
        this.plugin.data[this.name] = this.dump();
        return data;
    }

    async save() {
        let data = this.dump();
        await this.plugin.saveData(this.file, this.dump());
        return data;
    }

    /**
     * Get setting item value
     * @param key key name
     * @returns setting item value
     */
    get(key: string) {
        return this.settings.get(key)?.value;
    }

    /**
     * 将设置项目导出为 JSON 对象
     * @returns object
     */
    dump(): Object {
        let data: any = {};
        for (let [key, item] of this.settings) {
            if (item.type === 'button') continue;
            data[key] = item.value;
        }
        return data;
    }

    addItem(item: ISettingItem) {
        this.settings.set(item.key, item);
        let itemElement: HTMLElement;
        switch (item.type) {
            case 'checkbox':
                let element: HTMLInputElement = document.createElement('input');
                element.type = 'checkbox';
                element.checked = item.value;
                element.className = "b3-switch fn__flex-center";
                itemElement = element;
                break;
            case 'select':
                let selectElement: HTMLSelectElement = document.createElement('select');
                selectElement.className = "b3-select fn__flex-center fn__size200";
                let options = item?.options ?? {};
                for (let val in options) {
                    let optionElement = document.createElement('option');
                    let text = options[val];
                    optionElement.value = val;
                    optionElement.text = text;
                    selectElement.appendChild(optionElement);
                }
                selectElement.value = item.value;
                itemElement = selectElement;
                break;
            case 'slider':
                let sliderElement: HTMLInputElement = document.createElement('input');
                sliderElement.type = 'range';
                sliderElement.className = 'b3-slider fn__size200 b3-tooltips b3-tooltips__n';
                sliderElement.ariaLabel = item.value;
                sliderElement.min = item.slider?.min.toString() ?? '0';
                sliderElement.max = item.slider?.max.toString() ?? '100';
                sliderElement.step = item.slider?.step.toString() ?? '1';
                sliderElement.value = item.value;
                sliderElement.onchange = () => {
                    sliderElement.ariaLabel = sliderElement.value;
                }
                itemElement = sliderElement;
                break;
            case 'textinput':
                let textInputElement: HTMLInputElement = document.createElement('input');
                textInputElement.className = 'b3-text-field fn__flex-center fn__size200';
                textInputElement.value = item.value;
                itemElement = textInputElement;
                break;
            case 'textarea':
                let textareaElement: HTMLTextAreaElement = document.createElement('textarea');
                textareaElement.className = "b3-text-field fn__block";
                textareaElement.value = item.value;
                itemElement = textareaElement;
                break;
            case 'number':
                let numberElement: HTMLInputElement = document.createElement('input');
                numberElement.type = 'number';
                numberElement.className = 'b3-text-field fn__flex-center fn__size200';
                numberElement.value = item.value;
                itemElement = numberElement;
                break;
            case 'button':
                let buttonElement: HTMLButtonElement = document.createElement('button');
                buttonElement.className = "b3-button b3-button--outline fn__flex-center fn__size200";
                buttonElement.innerText = item.button?.label ?? 'Button';
                buttonElement.onclick = item.button?.callback ?? (() => {});
                itemElement = buttonElement;
                break;
            case 'hint':
                let hintElement: HTMLElement = document.createElement('div');
                hintElement.className = 'b3-label fn__flex-center';
                itemElement = hintElement;
                break;
            case 'checkbox_group': {
                // Create a container to hold all dynamic checkboxes.
                let container: HTMLDivElement = document.createElement('div');
                container.className = "checkbox-group-container";

                // Helper: parse stored string (format: "identifier,checked" per line) into a Map.
                const parseCheckboxGroupValue = (value: string): Map<string, boolean> => {
                    const result = new Map<string, boolean>();
                    if (value) {
                        value.split('\n').forEach(line => {
                            const [identifier, checked] = line.split(',');
                            if (identifier && checked !== undefined) {
                                result.set(identifier.trim(), checked.trim().toLowerCase() === 'true');
                            }
                        });
                    }
                    return result;
                };

                // Helper: serialize a Map back to the string format.
                const serializeCheckboxGroupValue = (map: Map<string, boolean>): string => {
                    let lines: string[] = [];
                    map.forEach((checked, identifier) => {
                        lines.push(`${identifier},${checked}`);
                    });
                    return lines.join('\n');
                };

                // Get identifiers dynamically from your map keys.
                const identifiers = Array.from(slash_menu_hardcoded_name_map.keys());

                // Parse the current value (stored as string) into state.
                let state = parseCheckboxGroupValue(item.value);

                // For each identifier, create a checkbox with a label.
                identifiers.forEach(id => {
                    let wrapper = document.createElement('div');
                    wrapper.className = "checkbox-item";

                    let checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    // Set checkbox state, defaulting to false.
                    checkbox.checked = state.get(id) || false;
                    checkbox.id = `checkbox-${id}`;

                    let label = document.createElement('label');
                    label.htmlFor = checkbox.id;
                    label.innerText = id;

                    wrapper.appendChild(checkbox);
                    wrapper.appendChild(label);
                    container.appendChild(wrapper);

                    // On change, update the state and write back as string.
                    checkbox.onchange = () => {
                        state.set(id, checkbox.checked);
                        item.value = serializeCheckboxGroupValue(state);
                    };
                });
                itemElement = container;
                break;
            }
        }
        this.elements.set(item.key, itemElement);
        this.plugin.setting.addItem({
            title: item.title,
            description: item?.description,
            createActionElement: () => {
                let element = this.getElement(item.key);
                return element;
            }
        })
    }

    private getElement(key: string) {
        let item = this.settings.get(key);
        let element = this.elements.get(key) as any;
        switch (item.type) {
            case 'checkbox':
                element.checked = item.value;
                break;
            case 'select':
                element.value = item.value;
                break;
            case 'slider':
                element.value = item.value;
                element.ariaLabel = item.value;
                break;
            case 'textinput':
                element.value = item.value;
                break;
            case 'textarea':
                element.value = item.value;
                break;
        }
        return element;
    }

    private updateValue(key: string) {
        let item = this.settings.get(key);
        let element = this.elements.get(key) as any;
        // console.debug(element, element?.value);
        switch (item.type) {
            case 'checkbox':
                item.value = element.checked;
                break;
            case 'select':
                item.value = element.value;
                break;
            case 'slider':
                item.value = element.value;
                break;
            case 'textinput':
                item.value = element.value;
                break;
            case 'textarea':
                item.value = element.value;
                break;
        }
    }

}