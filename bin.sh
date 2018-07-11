echo "-------Begin-------"
git pull;
cd web;
cnpm install;
npm run build;
cd ../server;
cnpm install;
pm2 restart 0;

echo "--------End--------"

# shell脚本执行错误 $'\r':command not found 
# 原因是这样的：脚本是在window下编辑完成后上传到linux上执行的，win下的换行是回车符+换行符，也就是\r\n,而unix下是换行符\n。l
# inux下不识别\r为回车符，所以导致每行的配置都多了个\r，因此是脚本编码的问题。
# 在linux上执行 dos2unix 脚本名，再次执行脚本，报错消失。