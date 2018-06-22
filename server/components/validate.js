export default (ruleForm,rules,callback) => {
  for(let key in ruleForm) {
    let value = ruleForm[key];
    typeof value === 'string' && ( value = value.trim() );
    for(let index = 0 ; index < rules[key].length ; index ++ ) {
      let required = rules[key][index].required;
      let pattern = rules[key][index].pattern;
      let message = rules[key][index].message;

      if(required === true) {
        if(!value){
          callback(message);
          return;
        }
      }else{
        if(!pattern.test(value)){
          callback(message);
          return;
        }
      }
    }
  };
  callback(true);
}