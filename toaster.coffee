# => SRC FOLDER
toast 'src'
	# => VENDORS (optional)
	# vendors: ['vendors/x.js', 'vendors/y.js', ... ]

	# => OPTIONS (optional, default values listed)
	# bare: false
	# packaging: true
	expose: 'window'
	# minify: false

	# => HTTPFOLDER (optional), RELEASE / DEBUG (required)
	httpfolder: ''
	release: 'js/app.js'
	debug: 'js/app-debug.js'