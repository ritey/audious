# Audious project

The Audious project aims to create a single platform to manage playlists

## Website setup

##Root Logs folder
Optionally use for storing Apache site logs


##Root Documents folder
Use for storing site related developer documents including specs, testing, notes etc


##Sample Apache setup file
```
<VirtualHost *:80>
	ServerName audious.local
	DocumentRoot /var/www/audious/webroot/public
	<Directory />
		Options +FollowSymLinks
		AllowOverride All
	</Directory>
	<Directory /var/www/audious/webroot/public>
		Options +Indexes +FollowSymLinks +MultiViews
		AllowOverride All
		Order allow,deny
		allow from all
	</Directory>

	DirectoryIndex index.php

	LogLevel warn
	ErrorLog /var/www/audious/logs/error.log
	CustomLog /var/www/audious/logs/access.log combined
</VirtualHost>
```