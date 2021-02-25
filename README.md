# SVG - D3 ... module for managing svg elements for use with d3

## Getting started

This module is designed for use in building custom d3 elements

*It is normally not loaded and used independently*, but it may be used as a staring point for generating svg elements that can be built upon separately.

It is normally used indirectly by one of the d3 plotting packages:
- barchart-d3
- piechart-d3
- scatterplot-d3

or the vue data parsing package:
- data-parser-ui

...but it can be used independently as a starting point for svg manipulation of d3 data

## Usage:
- install
  - `npm install -S bar-plot-d3`

- import in code
  - `import 'd3Bar from 'bar-plot-d3'`

- Add canvas element to html page (d3Canvas is the default id expected)
  - `<div id='#d3Canvas' />`

- initialize svg element
- `var svg = d3Svg.initSvg()`

- add basic elements:
- `d3Svg.addCircle({svg: svg, x: 100, y: 100, radius: 30})`

