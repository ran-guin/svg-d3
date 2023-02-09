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
  - `npm install -S svg-d3

- import in code
  - `import 'd3Svg from 'svg-d3'`

- Add canvas element to html page (d3Canvas is the default id expected)
  - `<div id='#d3Canvas' />`

- initialize svg element
- `var svg = d3Svg.initSvg()`

- add basic elements:
- `d3Svg.addCircle({svg: svg, x: 100, y: 100, radius: 30})`

- add title (optional border)
- `d3Svg.addTitle('Report Title', {svg: svg, color: 'blue', border: 3})`

- or use explicitly with plotting functions:
  - `import 'd3Pie from 'pie-chart-d3'`
  - ...
  - var svg = d3Svg.initSvg(options)
  - d3Pie.addPie({svg: svg, data: []})
  - d3Svg.addTitle('Pie Chart Title', {svg: svg})  // append title to same svg element

## Methods:

# **initSvg(options)**

## options: (default) 
- canvasId: id for canvas element (defaults to 'd3Canvas'),
- canvasHeight: height of svg element in pixels (defaults to 600),
- canvasWidth: width of svg element in pixels (defaults to 800),

eg:

  ``var svg = d3Svg.initOptions({canvasId:'myCanvas', canvasWidth: 600})``

  ``var svg = d3Svg.initOptions()``

# Drawing options:

### Note: if only one svg element is used, then the svg is auto-created in the background
  eg:
  `d3Svg.addCircle({x: 100, y: 100, radius: 50})`

### if multiple elements are layered onto the same svg element, then the svg object should be explicitly used
  `var svg = d3Svg.initSvg()`

  `d3Svg.addCircle({svg: svg, x: 100, y: 100, radius: 50})`

  `d3Svg.addTitle('Pie Chart Title', {svg: svg})`

## **addCircle(options)**
`d3Svg.addCircle({svg: svg, x: 100, y: 100, radius: 50})`
### options: (default) 
- x: x position of circle (20),
- y: y position of circle (20),
- radius: radius of circle (30)


## **addRectangle(options)**
`d3Svg.addRectangle({svg: svg, x: 100, y: 100, height:50, width: 75})`
### options: (default) 
- x: x position of rectangle,
- y: y position of rectangle,
- height
- width

## **addText(text, options)**
`d3Svg.addText('Hello World', {svg: svg, x: 100, y: 100})`
### options: (default)
- x: x position of text
- y: y position of text
- fontSize: (20),
- color: ('black'),
- anchor: ('left')

## **addTitle('Title Text', options)**
`d3Svg.addText('My Title', {svg: svg})`
### options: (default)
- x: x position of text (middle of element)
- y: y position of text (top of element)
- fontSize: (20),
- color: text colour ('blue'),
- border: border thickness (0),
- borderColor: border colour ('black')
- anchor: anchor for text position ('middle')

