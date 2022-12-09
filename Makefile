install:
	npm ci

lint:
	npx eslint .
test:
	npm test

test-coverage:
	npx test -- --coverage --coverageProvider=v8
publish:
	npm publish

