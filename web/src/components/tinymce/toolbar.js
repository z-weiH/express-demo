
let toolbar1 = 
  `undo redo | 
  cut copy paste | 
  bold italic underline strikethrough | 
  alignleft aligncenter alignright alignjustify | 
  styleselect formatselect fontselect fontsizeselect`; 

  /* 
    对应中文
    undo - 撤销
    redo - 重复
    cut - 剪切
    copy - 复制
    paste - 粘贴
    bold - 粗体
    italic - 斜体
    underline - 下划线
    strikethrough - 删除线
    alignleft - 左对齐
    aligncenter - 居中
    alignright - 右对齐
    alignjustify - 两端对齐
    styleselect - 格式
    formatselect - 标题
    fontselect - 字体
    fontsizeselect - 字号
  */
  
  // fullscreen image table

let toolbar2 = 
    `searchreplace | 
    bullist numlist | 
    outdent indent blockquote | 
    link unlink anchor image media code | 
    insertdatetime preview | 
    forecolor backcolor`;

  /* 
    对应中文
    searchreplace - 查找和替换
    bullist - 项目符号
    numlist - 编号列表
    outdent - 减少缩进
    indent - 增加缩进
    blockquote - 引用
    link - 插入/编辑链接
    unlink - 删除链接
    anchor - 锚点
    image - 插入/编辑图片
    media - 插入/编辑视频
    code - 源代码
    insertdatetime - 插入日期/时间
    preview - 预览
    forecolor - 文字颜色
    backcolor - 背景颜色
  */

  let toolbar3 = 
    `table | 
    hr removeformat | 
    subscript superscript | 
    charmap emoticons | 
    print fullscreen | 
    ltr rtl | 
    visualchars visualblocks template pagebreak`;

  /* 
    对应中文
    table - 表格
    hr - 水平分割线
    removeformat - 清除格式
    subscript - 下标
    superscript - 上标
    charmap - 特殊符号
    emoticons - 表情
    print - 打印
    fullscreen - 全屏
    ltr - 从左到右
    rtl - 从右到左
    visualchars - 显示不可见字符
    visualblocks - 显示区块边框
    pagebreak - 分页符
  */

export default [
  toolbar1,
  toolbar2,
  toolbar3,
]

/* 

tinymce.init({selector:'textarea',toolbar1: "undo redo | cut copy paste | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
        toolbar2: " searchreplace | bullist numlist | outdent indent blockquote | link unlink anchor image media code | inserttime preview | forecolor backcolor",
        toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | spellchecker | visualchars visualblocks nonbreaking template pagebreak restoredraft",
        menubar: false,
        toolbar_items_size: 'small',
        style_formats: [
            {title: 'Bold text', inline: 'b'},
            {title: 'Red text', inline: 'span', styles: {color: '#ff0000'}},
            {title: 'Red header', block: 'h1', styles: {color: '#ff0000'}},
            {title: 'Example 1', inline: 'span', classes: 'example1'},
            {title: 'Example 2', inline: 'span', classes: 'example2'},
            {title: 'Table styles'},
            {title: 'Table row 1', selector: 'tr', classes: 'tablerow1'}
        ],
        templates: [
            {title: 'Test template 1', content: 'Test 1'},
            {title: 'Test template 2', content: 'Test 2'}
        ],plugins: [
            "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak spellchecker",
            "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
            "table contextmenu directionality emoticons template textcolor paste fullpage textcolor"
        ],language:'zh_CN'});

*/