buildplus: runBuild runTest complete

runBuild:
	@echo "***************************"
	@echo "*** Generate dist build ***"
	@echo "***************************\n"

	./node_modules/.bin/babel src --presets babel-preset-es2015 --out-dir dist

runTest:
	@echo "\n*****************"
	@echo "*** Run Tests ***"
	@echo "*****************\n"

	./node_modules/.bin/mocha

complete:
	@echo "\n****************"
	@echo "*** Complete ***"
	@echo "****************\n"
