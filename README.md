# Starting point for building npm package

## Getting started

- `clone https://github.com/ran-guin/npm-package-template`

- `cd npm-package-template`

- `npm install` (to install mocha / chai for testing purposes)

- `npm run build`

## Included

- default example.js src file
- default exampe.js test file
- Makefile to execute build to 'dist' directory
- default LICENSE file (ISC) .... change as required...

## Directions

### Setup (to adapt this repository for your own use)
- reset url for your own repository
  - `git remote set_url origin 'https:github.com/<you>/<pkgName>`

- update custom attributes of package.json file
- add your own name to the LICENSE.md file

- (optionally save your own custom version of this template under your own repository)

- add index.js file(s) to src/ directory
- add index.js file(s) to test/ directory (optional but recommended)
- `npm install -S ...` (install 3rd party packages as required)
- `npm run build`
- recursively add tests & edit as required to ensure working...

### Add to npm 


