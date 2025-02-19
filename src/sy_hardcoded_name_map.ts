// NB: why this need a map even though they are literally same name?
// cuz they are mapping my plugin's identifier and siyuan 's hard coded name in html, they could change sometimes maybe.

interface DataEntry {
    html_css_or_field_hardcoded_name: string;
    english_human_read_name: string;
    chinese_human_read_name: string;
}

/********slash menu *********/
export const slash_menu_hardcoded_name_map = new Map<string, DataEntry>([
    // [identifier, { html_css_hardcoded_name, english_human_read_name, chinese_human_read_name }]
    ["slash_menu_template", { html_css_or_field_hardcoded_name: "template", english_human_read_name: "Template", chinese_human_read_name: "模板" }],
    ["slash_menu_widget", { html_css_or_field_hardcoded_name: "widget", english_human_read_name: "Widget", chinese_human_read_name: "挂件" }],
    ["slash_menu_assets", { html_css_or_field_hardcoded_name: "assets", english_human_read_name: "Assets", chinese_human_read_name: "资源" }],
    ["slash_menu_ref", { html_css_or_field_hardcoded_name: "ref", english_human_read_name: "Ref", chinese_human_read_name: "引用" }],
    ["slash_menu_embed_block", { html_css_or_field_hardcoded_name: "blockEmbed", english_human_read_name: "Embed Block", chinese_human_read_name: "嵌入块" }],
    ["slash_menu_ai_writing", { html_css_or_field_hardcoded_name: "aiWriting", english_human_read_name: "AI writing", chinese_human_read_name: "AI 编写" }],
    ["slash_menu_database", { html_css_or_field_hardcoded_name: "database", english_human_read_name: "Database", chinese_human_read_name: "数据库" }],
    ["slash_menu_new_file_ref", { html_css_or_field_hardcoded_name: "newFileRef", english_human_read_name: "Create new Doc with reference", chinese_human_read_name: "新建文档并引用" }],
    ["slash_menu_new_sub_doc_ref", { html_css_or_field_hardcoded_name: "newSubDocRef", english_human_read_name: "Create sub Doc with reference", chinese_human_read_name: "新建子文档并引用" }],
    ["slash_menu_heading1", { html_css_or_field_hardcoded_name: "heading1", english_human_read_name: "Heading 1", chinese_human_read_name: "一级标题" }],
    ["slash_menu_heading2", { html_css_or_field_hardcoded_name: "heading2", english_human_read_name: "Heading 2", chinese_human_read_name: "二级标题" }],
    ["slash_menu_heading3", { html_css_or_field_hardcoded_name: "heading3", english_human_read_name: "Heading 3", chinese_human_read_name: "三级标题" }],
    ["slash_menu_heading4", { html_css_or_field_hardcoded_name: "heading4", english_human_read_name: "Heading 4", chinese_human_read_name: "四级标题" }],
    ["slash_menu_heading5", { html_css_or_field_hardcoded_name: "heading5", english_human_read_name: "Heading 5", chinese_human_read_name: "五级标题" }],
    ["slash_menu_heading6", { html_css_or_field_hardcoded_name: "heading6", english_human_read_name: "Heading 6", chinese_human_read_name: "六级标题" }],
    ["slash_menu_list", { html_css_or_field_hardcoded_name: "list", english_human_read_name: "List", chinese_human_read_name: "无序列表" }],
    ["slash_menu_ordered_list", { html_css_or_field_hardcoded_name: "orderedList", english_human_read_name: "Order List", chinese_human_read_name: "有序列表" }],
    ["slash_menu_check", { html_css_or_field_hardcoded_name: "check", english_human_read_name: "Task List", chinese_human_read_name: "任务列表" }],
    ["slash_menu_quote", { html_css_or_field_hardcoded_name: "quote", english_human_read_name: "Blockquote", chinese_human_read_name: "引述" }],
    ["slash_menu_code", { html_css_or_field_hardcoded_name: "code", english_human_read_name: "Code Block", chinese_human_read_name: "代码块" }],
    ["slash_menu_table", { html_css_or_field_hardcoded_name: "table", english_human_read_name: "Table", chinese_human_read_name: "表格" }],
    ["slash_menu_line", { html_css_or_field_hardcoded_name: "line", english_human_read_name: "Thematic break", chinese_human_read_name: "分隔线" }],
    ["slash_menu_math", { html_css_or_field_hardcoded_name: "math", english_human_read_name: "Formula Block", chinese_human_read_name: "公式块" }],
    ["slash_menu_html", { html_css_or_field_hardcoded_name: "html", english_human_read_name: "HTML", chinese_human_read_name: "HTML" }],
    ["slash_menu_emoji", { html_css_or_field_hardcoded_name: "emoji", english_human_read_name: "Emoji", chinese_human_read_name: "表情" }],
    ["slash_menu_link", { html_css_or_field_hardcoded_name: "link", english_human_read_name: "Link", chinese_human_read_name: "链接" }],
    ["slash_menu_bold", { html_css_or_field_hardcoded_name: "bold", english_human_read_name: "Bold", chinese_human_read_name: "粗体" }],
    ["slash_menu_italic", { html_css_or_field_hardcoded_name: "italic", english_human_read_name: "Italic", chinese_human_read_name: "斜体" }],
    ["slash_menu_underline", { html_css_or_field_hardcoded_name: "underline", english_human_read_name: "Underline", chinese_human_read_name: "下划线" }],
    ["slash_menu_strike", { html_css_or_field_hardcoded_name: "strike", english_human_read_name: "Strike", chinese_human_read_name: "删除线" }],
    ["slash_menu_mark", { html_css_or_field_hardcoded_name: "mark", english_human_read_name: "Mark", chinese_human_read_name: "标记" }],
    ["slash_menu_sup", { html_css_or_field_hardcoded_name: "sup", english_human_read_name: "Superscript", chinese_human_read_name: "上标" }],
    ["slash_menu_sub", { html_css_or_field_hardcoded_name: "sub", english_human_read_name: "Subscript", chinese_human_read_name: "下标" }],
    ["slash_menu_tag", { html_css_or_field_hardcoded_name: "tag", english_human_read_name: "Tag", chinese_human_read_name: "标签" }],
    ["slash_menu_inline_code", { html_css_or_field_hardcoded_name: "inlineCode", english_human_read_name: "Inline Code", chinese_human_read_name: "行级代码" }],
    ["slash_menu_inline_math", { html_css_or_field_hardcoded_name: "inlineMath", english_human_read_name: "Inline Formula", chinese_human_read_name: "行级公式" }],
    ["slash_menu_insert_asset", { html_css_or_field_hardcoded_name: "insertAsset", english_human_read_name: "Insert image or file", chinese_human_read_name: "插入图片或文件" }],
    ["slash_menu_insert_iframe_url", { html_css_or_field_hardcoded_name: "insertIframeURL", english_human_read_name: "Insert IFrame link", chinese_human_read_name: "插入 IFrame 链接" }],
    ["slash_menu_insert_img_url", { html_css_or_field_hardcoded_name: "insertImgURL", english_human_read_name: "Insert image link", chinese_human_read_name: "插入图片链接" }],
    ["slash_menu_insert_video_url", { html_css_or_field_hardcoded_name: "insertVideoURL", english_human_read_name: "Insert video link", chinese_human_read_name: "插入视频链接" }],
    ["slash_menu_insert_audio_url", { html_css_or_field_hardcoded_name: "insertAudioURL", english_human_read_name: "Insert audio link", chinese_human_read_name: "插入音频链接" }],
    ["slash_menu_staff", { html_css_or_field_hardcoded_name: "staff", english_human_read_name: "Staff", chinese_human_read_name: "五线谱" }],
    ["slash_menu_chart", { html_css_or_field_hardcoded_name: "chart", english_human_read_name: "Chart", chinese_human_read_name: "图表" }],
    ["slash_menu_flow_chart", { html_css_or_field_hardcoded_name: "flowChart", english_human_read_name: "FlowChart", chinese_human_read_name: "Flow Chart" }],
    ["slash_menu_graph", { html_css_or_field_hardcoded_name: "graph", english_human_read_name: "Graphviz", chinese_human_read_name: "Graph" }],
    ["slash_menu_mermaid", { html_css_or_field_hardcoded_name: "mermaid", english_human_read_name: "Mermaid", chinese_human_read_name: "Mermaid" }],
    ["slash_menu_mindmap", { html_css_or_field_hardcoded_name: "mindmap", english_human_read_name: "Mind map", chinese_human_read_name: "脑图" }],
    ["slash_menu_UML", { html_css_or_field_hardcoded_name: "UML", english_human_read_name: "PlantUML", chinese_human_read_name: "UML" }],
    ["slash_menu_info_style", { html_css_or_field_hardcoded_name: "infoStyle", english_human_read_name: "Info Style", chinese_human_read_name: "信息样式" }],
    ["slash_menu_success_style", { html_css_or_field_hardcoded_name: "successStyle", english_human_read_name: "Success Style", chinese_human_read_name: "成功样式" }],
    ["slash_menu_warning_style", { html_css_or_field_hardcoded_name: "warningStyle", english_human_read_name: "Warning Style", chinese_human_read_name: "警告样式" }],
    ["slash_menu_error_style", { html_css_or_field_hardcoded_name: "errorStyle", english_human_read_name: "Error Style", chinese_human_read_name: "错误样式" }],
    ["slash_menu_clear_font_style", { html_css_or_field_hardcoded_name: "clearFontStyle", english_human_read_name: "Clear Style", chinese_human_read_name: "清除样式" }],
]);

/********top & bottom bar *********/
export const top_bar_hardcoded_name_map = new Map<string, string>([
    /*identifier, div or button "id" field, English human read name, Chinese human read name*/
    ["top_bar_sync", "barSync"],
    ["top_bar_back", "barBack"],
    ["top_bar_forward", "barForward"],
    ["top_bar_plugin", "barPlugins"],
    ["top_bar_command_panel", "barCommand"],
    ["top_bar_search", "barSearch"],
    ["top_bar_day_night", "barMode"],
    ["top_bar_exit", "barExit"],
    ["top_bar_window_controls", "windowControls"],
    ["top_bar_crown", "toolbarVIP"],
    ["top_bar_help", "statusHelp"],
    ["top_bar_hidden_sidebar", "barDock"],
]);

/********sidebar *********/
export const side_bar_hardcoded_name_map = new Map<string, string>([
    /*identifier, "data-type" field of HTML span, English human read name, Chinese human read name*/
    ["side_bar_outline", "outline"],
    ["side_bar_inbox", "inbox"],
    ["side_bar_bookmark", "bookmark"],
    ["side_bar_tag", "tag"],
    ["side_bar_backlink", "backlink"],
    ["side_bar_global_graph", "globalGraph"],
    ["side_bar_notebook_graph", "graph"],
]);