echo "-------Begin-------"
git pull;
cd web;
cnpm install;
npm run build;
cd ../server;
cnpm install;
pm2 restart 0;
echo "--------End--------"