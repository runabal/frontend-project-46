install: install-deps
	npx simple-git-hooks

install-deps:
	npm ci
bin:
	node bin/gendiff.js
publish:
	npm publish
lint:
	npx eslint .
test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test
