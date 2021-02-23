# Starting point for building npm package

## Getting started

- `git clone https://github.com/ran-guin/npm-package-template`

- `cd npm-package-template`

- `npm install` (to install mocha / chai for testing purposes)

- `npm run build` (test to make sure it is working out of the box)

## Included

- default index.js src file - (overwrite with your own code)
- default index.js test file - (overwrite with your own code)
- Makefile to execute build to 'dist' directory
- default LICENSE file (ISC) .... change as required...

## Directions

### Setup (to adapt this template for your own use)
- reset url for your own repository
  - `git remote set_url origin 'https:github.com/<you>/<pkgName>`

- update package.json file (*everything above "main" specification*)
- add your own name to the LICENSE.md file

- (optionally save your own custom version of this template under your own repository)

- add index.js file(s) to src/ directory
- add index.js file(s) to test/ directory (optional but recommended)
- `npm install -S ...` (install 3rd party packages as required)
- `npm run build`
- recursively add tests & edit as required to ensure working...

### Add to npm 


