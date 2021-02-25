buildplus: runBuild runTest complete

runBuild:
	@echo "***************************"
	@echo "*** Generate dist build ***"
	@echo "***************************\n"

	./node_modules/.bin/babel src --out-dir dist

runTest:
	@echo "\n*****************"
	@echo "*** Run Tests ***"
	@echo "*****************\n"

	./node_modules/.bin/mocha

complete:
	@echo "\n****************"
	@echo "*** Complete ***"
	@echo "****************\n"
