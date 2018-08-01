
let Copy = function(text,callback){
  let body = document.querySelector('body');
  let textarea = document.createElement('textarea');
    textarea.value = text;
    body.appendChild(textarea);
    textarea.select();
    document.execCommand("Copy")
    body.removeChild(textarea);
    callback && callback();
};

export default Copy
