echo "-------Begin-------"
git pull;
cd web;
cnpm install;
npm run build;
cd ../server;
cnpm install;
forever restart index.js;
echo "--------End--------"