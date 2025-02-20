// NB: why this need a map even though they are literally same name?
// cuz they are mapping my plugin's identifier and siyuan 's hard coded name in html, they could change sometimes maybe.

export interface DataEntry {
    html_css_or_field_hardcoded_name: string;
    english_human_read_name: string;
    chinese_human_read_name: string;
}

export const sy_hardcoded_name_map = new Map<string, DataEntry>([
    /********slash menu *********/
    // [identifier, { html_css_hardcoded_name, english_human_read_name, chinese_human_read_name }]
    ["slash_menu_template", { html_css_or_field_hardcoded_name: "template", english_human_read_name: "Slash Menu: Template", chinese_human_read_name: "斜杠菜单：模板" }],
    ["slash_menu_widget", { html_css_or_field_hardcoded_name: "widget", english_human_read_name: "Slash Menu: Widget", chinese_human_read_name: "斜杠菜单：挂件" }],
    ["slash_menu_assets", { html_css_or_field_hardcoded_name: "assets", english_human_read_name: "Slash Menu: Assets", chinese_human_read_name: "斜杠菜单：资源" }],
    ["slash_menu_ref", { html_css_or_field_hardcoded_name: "ref", english_human_read_name: "Slash Menu: Ref", chinese_human_read_name: "斜杠菜单：引用" }],
    ["slash_menu_embed_block", { html_css_or_field_hardcoded_name: "blockEmbed", english_human_read_name: "Slash Menu: Embed Block", chinese_human_read_name: "斜杠菜单：嵌入块" }],
    ["slash_menu_ai_writing", { html_css_or_field_hardcoded_name: "aiWriting", english_human_read_name: "Slash Menu: AI writing", chinese_human_read_name: "斜杠菜单：AI 编写" }],
    ["slash_menu_database", { html_css_or_field_hardcoded_name: "database", english_human_read_name: "Slash Menu: Database", chinese_human_read_name: "斜杠菜单：数据库" }],
    ["slash_menu_new_file_ref", { html_css_or_field_hardcoded_name: "newFileRef", english_human_read_name: "Slash Menu: Create new Doc with reference", chinese_human_read_name: "斜杠菜单：新建文档并引用" }],
    ["slash_menu_new_sub_doc_ref", { html_css_or_field_hardcoded_name: "newSubDocRef", english_human_read_name: "Slash Menu: Create sub Doc with reference", chinese_human_read_name: "斜杠菜单：新建子文档并引用" }],
    ["slash_menu_heading1", { html_css_or_field_hardcoded_name: "heading1", english_human_read_name: "Slash Menu: Heading 1", chinese_human_read_name: "斜杠菜单：一级标题" }],
    ["slash_menu_heading2", { html_css_or_field_hardcoded_name: "heading2", english_human_read_name: "Slash Menu: Heading 2", chinese_human_read_name: "斜杠菜单：二级标题" }],
    ["slash_menu_heading3", { html_css_or_field_hardcoded_name: "heading3", english_human_read_name: "Slash Menu: Heading 3", chinese_human_read_name: "斜杠菜单：三级标题" }],
    ["slash_menu_heading4", { html_css_or_field_hardcoded_name: "heading4", english_human_read_name: "Slash Menu: Heading 4", chinese_human_read_name: "斜杠菜单：四级标题" }],
    ["slash_menu_heading5", { html_css_or_field_hardcoded_name: "heading5", english_human_read_name: "Slash Menu: Heading 5", chinese_human_read_name: "斜杠菜单：五级标题" }],
    ["slash_menu_heading6", { html_css_or_field_hardcoded_name: "heading6", english_human_read_name: "Slash Menu: Heading 6", chinese_human_read_name: "斜杠菜单：六级标题" }],
    ["slash_menu_list", { html_css_or_field_hardcoded_name: "list", english_human_read_name: "Slash Menu: List", chinese_human_read_name: "斜杠菜单：无序列表" }],
    ["slash_menu_ordered_list", { html_css_or_field_hardcoded_name: "orderedList", english_human_read_name: "Slash Menu: Order List", chinese_human_read_name: "斜杠菜单：有序列表" }],
    ["slash_menu_check", { html_css_or_field_hardcoded_name: "check", english_human_read_name: "Slash Menu: Task List", chinese_human_read_name: "斜杠菜单：任务列表" }],
    ["slash_menu_quote", { html_css_or_field_hardcoded_name: "quote", english_human_read_name: "Slash Menu: Blockquote", chinese_human_read_name: "斜杠菜单：引述" }],
    ["slash_menu_code", { html_css_or_field_hardcoded_name: "code", english_human_read_name: "Slash Menu: Code Block", chinese_human_read_name: "斜杠菜单：代码块" }],
    ["slash_menu_table", { html_css_or_field_hardcoded_name: "table", english_human_read_name: "Slash Menu: Table", chinese_human_read_name: "斜杠菜单：表格" }],
    ["slash_menu_line", { html_css_or_field_hardcoded_name: "line", english_human_read_name: "Slash Menu: Thematic break", chinese_human_read_name: "斜杠菜单：分隔线" }],
    ["slash_menu_math", { html_css_or_field_hardcoded_name: "math", english_human_read_name: "Slash Menu: Formula Block", chinese_human_read_name: "斜杠菜单：公式块" }],
    ["slash_menu_html", { html_css_or_field_hardcoded_name: "html", english_human_read_name: "Slash Menu: HTML", chinese_human_read_name: "斜杠菜单：HTML" }],
    ["slash_menu_emoji", { html_css_or_field_hardcoded_name: "emoji", english_human_read_name: "Slash Menu: Emoji", chinese_human_read_name: "斜杠菜单：表情" }],
    ["slash_menu_link", { html_css_or_field_hardcoded_name: "link", english_human_read_name: "Slash Menu: Link", chinese_human_read_name: "斜杠菜单：链接" }],
    ["slash_menu_bold", { html_css_or_field_hardcoded_name: "bold", english_human_read_name: "Slash Menu: Bold", chinese_human_read_name: "斜杠菜单：粗体" }],
    ["slash_menu_italic", { html_css_or_field_hardcoded_name: "italic", english_human_read_name: "Slash Menu: Italic", chinese_human_read_name: "斜杠菜单：斜体" }],
    ["slash_menu_underline", { html_css_or_field_hardcoded_name: "underline", english_human_read_name: "Slash Menu: Underline", chinese_human_read_name: "斜杠菜单：下划线" }],
    ["slash_menu_strike", { html_css_or_field_hardcoded_name: "strike", english_human_read_name: "Slash Menu: Strike", chinese_human_read_name: "斜杠菜单：删除线" }],
    ["slash_menu_mark", { html_css_or_field_hardcoded_name: "mark", english_human_read_name: "Slash Menu: Mark", chinese_human_read_name: "斜杠菜单：标记" }],
    ["slash_menu_sup", { html_css_or_field_hardcoded_name: "sup", english_human_read_name: "Slash Menu: Superscript", chinese_human_read_name: "斜杠菜单：上标" }],
    ["slash_menu_sub", { html_css_or_field_hardcoded_name: "sub", english_human_read_name: "Slash Menu: Subscript", chinese_human_read_name: "斜杠菜单：下标" }],
    ["slash_menu_tag", { html_css_or_field_hardcoded_name: "tag", english_human_read_name: "Slash Menu: Tag", chinese_human_read_name: "斜杠菜单：标签" }],
    ["slash_menu_inline_code", { html_css_or_field_hardcoded_name: "inlineCode", english_human_read_name: "Slash Menu: Inline Code", chinese_human_read_name: "斜杠菜单：行级代码" }],
    ["slash_menu_inline_math", { html_css_or_field_hardcoded_name: "inlineMath", english_human_read_name: "Slash Menu: Inline Formula", chinese_human_read_name: "斜杠菜单：行级公式" }],
    ["slash_menu_insert_asset", { html_css_or_field_hardcoded_name: "insertAsset", english_human_read_name: "Slash Menu: Insert image or file", chinese_human_read_name: "斜杠菜单：插入图片或文件" }],
    ["slash_menu_insert_iframe_url", { html_css_or_field_hardcoded_name: "insertIframeURL", english_human_read_name: "Slash Menu: Insert IFrame link", chinese_human_read_name: "斜杠菜单：插入 IFrame 链接" }],
    ["slash_menu_insert_img_url", { html_css_or_field_hardcoded_name: "insertImgURL", english_human_read_name: "Slash Menu: Insert image link", chinese_human_read_name: "斜杠菜单：插入图片链接" }],
    ["slash_menu_insert_video_url", { html_css_or_field_hardcoded_name: "insertVideoURL", english_human_read_name: "Slash Menu: Insert video link", chinese_human_read_name: "斜杠菜单：插入视频链接" }],
    ["slash_menu_insert_audio_url", { html_css_or_field_hardcoded_name: "insertAudioURL", english_human_read_name: "Slash Menu: Insert audio link", chinese_human_read_name: "斜杠菜单：插入音频链接" }],
    ["slash_menu_staff", { html_css_or_field_hardcoded_name: "staff", english_human_read_name: "Slash Menu: Staff", chinese_human_read_name: "斜杠菜单：五线谱" }],
    ["slash_menu_chart", { html_css_or_field_hardcoded_name: "chart", english_human_read_name: "Slash Menu: Chart", chinese_human_read_name: "斜杠菜单：图表" }],
    ["slash_menu_flow_chart", { html_css_or_field_hardcoded_name: "flowChart", english_human_read_name: "Slash Menu: FlowChart", chinese_human_read_name: "斜杠菜单：Flow Chart" }],
    ["slash_menu_graph", { html_css_or_field_hardcoded_name: "graph", english_human_read_name: "Slash Menu: Graphviz", chinese_human_read_name: "斜杠菜单：Graph" }],
    ["slash_menu_mermaid", { html_css_or_field_hardcoded_name: "mermaid", english_human_read_name: "Slash Menu: Mermaid", chinese_human_read_name: "斜杠菜单：Mermaid" }],
    ["slash_menu_mindmap", { html_css_or_field_hardcoded_name: "mindmap", english_human_read_name: "Slash Menu: Mind map", chinese_human_read_name: "斜杠菜单：脑图" }],
    ["slash_menu_UML", { html_css_or_field_hardcoded_name: "UML", english_human_read_name: "Slash Menu: PlantUML", chinese_human_read_name: "斜杠菜单：UML" }],
    ["slash_menu_info_style", { html_css_or_field_hardcoded_name: "infoStyle", english_human_read_name: "Slash Menu: Info Style", chinese_human_read_name: "斜杠菜单：信息样式" }],
    ["slash_menu_success_style", { html_css_or_field_hardcoded_name: "successStyle", english_human_read_name: "Slash Menu: Success Style", chinese_human_read_name: "斜杠菜单：成功样式" }],
    ["slash_menu_warning_style", { html_css_or_field_hardcoded_name: "warningStyle", english_human_read_name: "Slash Menu: Warning Style", chinese_human_read_name: "斜杠菜单：警告样式" }],
    ["slash_menu_error_style", { html_css_or_field_hardcoded_name: "errorStyle", english_human_read_name: "Slash Menu: Error Style", chinese_human_read_name: "斜杠菜单：错误样式" }],
    ["slash_menu_clear_font_style", { html_css_or_field_hardcoded_name: "clearFontStyle", english_human_read_name: "Slash Menu: Clear Style", chinese_human_read_name: "斜杠菜单：清除样式" }],

/********top & bottom bar *********/
    ["top_bottom_bar_sync", { html_css_or_field_hardcoded_name: "barSync", english_human_read_name: "Top/Bottom Bar: Sync Button", chinese_human_read_name: "顶栏底栏：同步按钮" }],
    ["top_bottom_bar_back", { html_css_or_field_hardcoded_name: "barBack", english_human_read_name: "Top/Bottom Bar: Back Button", chinese_human_read_name: "顶栏底栏：返回按钮" }],
    ["top_bottom_bar_forward", { html_css_or_field_hardcoded_name: "barForward", english_human_read_name: "Top/Bottom Bar: Forward Button", chinese_human_read_name: "顶栏底栏：前进按钮" }],
    ["top_bottom_bar_plugin", { html_css_or_field_hardcoded_name: "barPlugins", english_human_read_name: "Top/Bottom Bar: Plugin Button", chinese_human_read_name: "顶栏底栏：插件按钮" }],
    ["top_bottom_bar_command_panel", { html_css_or_field_hardcoded_name: "barCommand", english_human_read_name: "Top/Bottom Bar: Command Palette Button", chinese_human_read_name: "顶栏底栏：命令面板按钮" }],
    ["top_bottom_bar_search", { html_css_or_field_hardcoded_name: "barSearch", english_human_read_name: "Top/Bottom Bar: Search Button", chinese_human_read_name: "顶栏底栏：搜索按钮" }],
    ["top_bottom_bar_day_night", { html_css_or_field_hardcoded_name: "barMode", english_human_read_name: "Top/Bottom Bar: Day/Night Mode Button", chinese_human_read_name: "顶栏底栏：日间夜间模式按钮" }],
    ["top_bottom_bar_exit", { html_css_or_field_hardcoded_name: "barExit", english_human_read_name: "Top/Bottom Bar: Exit Button", chinese_human_read_name: "顶栏底栏：退出按钮" }],
    ["top_bottom_bar_window_controls", { html_css_or_field_hardcoded_name: "windowControls", english_human_read_name: "Top/Bottom Bar: Window Controls Button", chinese_human_read_name: "顶栏底栏：窗口控制按钮" }],
    ["top_bottom_bar_crown", { html_css_or_field_hardcoded_name: "toolbarVIP", english_human_read_name: "Top/Bottom Bar: Crown Icon", chinese_human_read_name: "顶栏底栏：皇冠图标" }],
    ["top_bottom_bar_help", { html_css_or_field_hardcoded_name: "statusHelp", english_human_read_name: "Top/Bottom Bar: Help Button", chinese_human_read_name: "顶栏底栏：帮助按钮" }],
    ["top_bottom_bar_hidden_sidebar", { html_css_or_field_hardcoded_name: "barDock", english_human_read_name: "Top/Bottom Bar: Hidden Sidebar Button", chinese_human_read_name: "顶栏底栏：隐藏侧栏按钮" }],

/********sidebar *********/
    ["side_bar_outline", { html_css_or_field_hardcoded_name: "outline", english_human_read_name: "Sidebar: Outline Icon", chinese_human_read_name: "侧边栏：大纲图标" }],
    ["side_bar_inbox", { html_css_or_field_hardcoded_name: "inbox", english_human_read_name: "Sidebar: Inbox Icon", chinese_human_read_name: "侧边栏：收件箱图标" }],
    ["side_bar_bookmark", { html_css_or_field_hardcoded_name: "bookmark", english_human_read_name: "Sidebar: Bookmark Icon", chinese_human_read_name: "侧边栏：书签图标" }],
    ["side_bar_tag", { html_css_or_field_hardcoded_name: "tag", english_human_read_name: "Sidebar: Tag Icon", chinese_human_read_name: "侧边栏：标签图标" }],
    ["side_bar_backlink", { html_css_or_field_hardcoded_name: "backlink", english_human_read_name: "Sidebar: Backlink Icon", chinese_human_read_name: "侧边栏：反链图标" }],
    ["side_bar_global_graph", { html_css_or_field_hardcoded_name: "globalGraph", english_human_read_name: "Sidebar: Global Graph Icon", chinese_human_read_name: "侧边栏：全局图谱图标" }],
    ["side_bar_notebook_graph", { html_css_or_field_hardcoded_name: "graph", english_human_read_name: "Sidebar: Notebook Graph Icon", chinese_human_read_name: "侧边栏：单个笔记本图谱图标" }]
]);