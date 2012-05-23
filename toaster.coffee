# => SRC FOLDER
toast 'src'
	# => VENDORS (optional)
	vendors: ['vendor/jquery-1.6.2.js', 
			  'vendor/jquery.cookie.js', 
			  'vendor/underscore.js', 
			  'vendor/backbone.js' ]

	# => OPTIONS (optional, default values listed)
	# bare: false
	# packaging: true
	expose: 'window'
	# minify: false

	# => HTTPFOLDER (optional), RELEASE / DEBUG (required)
	httpfolder: ''
	release: 'js/app.js'
	debug: 'js/app-debug.js'