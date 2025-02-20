import { DataEntry } from "./sy_hardcoded_name_map";

export const current_lang = window.siyuan.config.appearance.lang;
export const lang_key_name_in_map = (current_lang === "zh_CN") ? "chinese_human_read_name" : "english_human_read_name";
//this fallback for others into english

export function get_human_readable_name_by_identifier_from_map(identifier: string, map: Map<string, DataEntry>): string {
    if (map.has(identifier)) {
      return map.get(identifier)[lang_key_name_in_map];
    } else {
      console.error("identifier not found in map", identifier);
      return identifier;
    }
  }
