REPORTER = spec

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--ui tdd
accounttest:
	@NODE_ENV=acctest ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--growl \
		--ui tdd \
		--watch
test-w:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--growl \
		--ui tdd \
		--watch

test-fuelias:
	@NODE_ENV=test ./node_modules/.bin/mocha -R html-cov > coverage.html

.PHONY: test test-w
