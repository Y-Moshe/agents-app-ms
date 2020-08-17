rm -rf dist/
rm /var/www/html/wp-content/plugins/agents-app/agents-app-ms/js/*
rm /var/www/html/wp-content/plugins/agents-app/agents-app-ms/css/*
ng build --prod --aot
cp dist/agents-app-ms/*.js /var/www/html/wp-content/plugins/agents-app/agents-app-ms/js/
cp dist/agents-app-ms/*.css /var/www/html/wp-content/plugins/agents-app/agents-app-ms/css/
notify-send -u 'critical' 'Deployment' 'Successfully Deployed to Localhost WordPress'
