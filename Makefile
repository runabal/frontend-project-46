install:
	npm ci
bin:
	node bin/gendiff.js
publish:
	npm publish -dry-run
lint:
	npx eslint
