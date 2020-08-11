rm -rf dist/
rm /var/www/wordpress/wp-includes/js/dist/agents-app-ms/*
ng build --prod --aot
cp dist/agents-app-ms/*.js /var/www/wordpress/wp-includes/js/dist/agents-app-ms/
cp dist/agents-app-ms/*.css /var/www/wordpress/wp-includes/css/dist/agents-app-ms/
notify-send -u 'critical' 'Deployment' 'Successfully Deployed to Localhost WordPress'
