echo "Switching to branch main"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r dist/* joshschmitz@172.236.108.36:/var/www/joshschmitz.com/

echo "Done!"