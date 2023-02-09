import * as d3 from 'd3'

const defaults = {
  svg: {
    canvasId: 'd3Canvas',
    canvasHeight: '600',
    canvasWidth: '800'
  },
  text: {
    x: 100,
    y: 100,
    fontSize: 20,
    color: 'black'
    anchor: 'left'
  },
  title: {
    fontSize: 20,
    color: 'blue',
    anchor: 'middle'
  },
  circle: {
    x: 20,
    y: 20,
    radius: 30
  },
  rectangle: [
    x: 100,
    y: 100,
    height: 50,
    width: 50
  ],
  bar: {
    xOffset: 10,
    yOffset: 5,
    thickness: 15,
    spacing: 2,
    orientation: 'vertical',
    labelSpacing: 5,
    fontSize: 14,

    topMargin: 50,   // should be at least >= fontSize + labelSpacing
    bottomMargin: 50,
    leftMargin: 50,
    rightMargin: 10,
    padding: 15
    // height: 600,
    // width: 600,
    // scale: 10,
    // yaxis: 'value',
    // barPadding: 3,
    // colorTheme: 'schemeDark2'
  },
  pie: {
    labelPosition: 'legend',
    innerRadius: 0,
    outerRadius: 150,
    stroke: 'black',
    fontSize: 20,
    spacing: 20,
    labelSpacing: 5
  },
  scatter: {
    labelPosition: 'legend',
    stroke: 'black',
    fontSize: 20,
    topMargin: 50,   // should be at least >= fontSize + labelSpacing
    bottomMargin: 50,
    leftMargin: 50,
    rightMargin: 10,
    padding: 15
  }
}

function showDefaults (type) {
  if (type) {
    return defaults[type]
  } else {
    return defaults
  }
}

function colour (i) {
  const color = d3.scaleOrdinal(d3.schemeDark2)

  if (i) {
    var clr = color(i)
    return clr
  } else {
    var clrs = []
    for (var c = 0; c < 10; c++) {
      var clr = color(c)
      clrs.push(clr)
    }
    return clrs
  }
}

function contrastWith (colour, max) {
  var col = d3.color(colour)
  
  var threshold = max || 126

  if ((col.r*0.299 + col.g*0.587 + col.b*0.114) > threshold) {
    return 'black'
  } else {
    return 'white'
  }
}

function initSvg (svgOptions) {
  if (!options) {
    options = {};
  } // enables easy use of pre-defined default options by type

  const options = this.setOptions('svg', svgOptions)

  var id = options.canvasId
  console.log('initialize d3 canvas : ' + id)

  if (options.clear) {
    console.log('clear existing svg first...')
    d3.select('#' + id).selectAll('svg').remove()
  }
  var h = options.canvasHeight
  var w = options.canvasWidth

  console.log(h + ' x ' + w + ' Canvas Generated...')

  return d3.select('#' + id)
    .append('svg')
      .attr('height', h)
      .attr('width', w)
}

function embedData (data, element) {
  var table = document.createElement("table");
  var record = data[0]
  var keys = Object.keys(data[0])

  console.log(record.constructor + ' record type detected for ' + JSON.stringify(data))
  if (record.constructor === Object) {
    console.log('converting hashes to table')

    var header = table.insertRow(-1);
    for (var h = 0; h < keys.length; h++) {
        var cell = header.insertCell(-1);
        cell.innerHTML = '<b>' + keys[h] + '</b>';
    }

    for (var i = 0; i < data.length; i++) {
      var row = table.insertRow(-1);
      var cells = keys.map(a => data[i][a] || '');
      for (var j = 0; j < cells.length; j++) {
          var cell = row.insertCell(-1);
          cell.innerHTML = cells[j];
      }
    }  
  } else if (record.constructor === Array) {
    console.log('converting arrays to table')
    for (var i = 0; i < data.length; i++) {
      var row = table.insertRow(-1);
      var cells = data[i];
      for (var j = 0; j < cells.length; j++) {
          var cell = row.insertCell(-1);
          cell.innerHTML = cells[j];
      }
    }  
  } else if (record.constructor === String) {
    console.log('converting strings to table')
    var tab = /\t/
    var sep = /,\s*/
    if (record.match(tab)) {
      sep = tab
    }
    for (var i = 0; i < data.length; i++) {
        var row = table.insertRow(-1);
        var cells = rows[i].split(sep);
        for (var j = 0; j < cells.length; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = cells[j];
        }
    }
  } else {
    console.debug("unexpected record type: " + record.constructor)
  }
  var embedElement = document.getElementById(element);
  if (embedElement) {
    embedElement.innerHTML = "";
    embedElement.appendChild(table);
  }
  console.log('embed table data into element: ' + element)
}

function resize (options) {
  var id = options.id
  var height = options.height
  var width = options.width

  console.log('resize to ' + height + ' x ' + width)
  d3.select(id).selectAll('svg')
    .attr('height', height)
    .attr('width', width)
}

function set () {

}
function setOptions (type, options) {
  if (!options) { options = {} }
  // enables easy use of pre-defined default options by type
  var Options = {}
  if (defaults[type]) {
    var opts = Object.keys(defaults[type])
    console.log('check for ' + opts.join(', '))

    console.log(JSON.stringify(options))
    for (var i = 0; i < opts.length; i++) {
      var opt = opts[i]
      if (options[opt] !== undefined) {
        Options[opt] = options[opt]
      } else if (defaults[type][opt] !== undefined) {
        Options[opt] = defaults[type][opt]
      }
    }
  } else {
    console.debug(type + 'defaults not defined')
    Options = options
  }
  console.log(type + ' input options: ' + JSON.stringify(options))
  
  var inputKeys = Object.keys(options)
  for (var ki = 0; ki < inputKeys.length; ki++) {
    if (inputKeys[ki] !== 'data' && inputKeys[ki] !== "svg") {
      if (!Options[inputKeys[ki]]) {
        Options[inputKeys[ki]] = options[inputKeys[ki]]
        console.log(inputKeys[ki] + ' custom option added: ' + JSON.stringify(options[inputKeys[ki]]))
      }
    }
  }

  if (options.svg) {
    if (!options.width) {
      Options.width = options.svg.attr("width")
    }
    if (!options.height) {
      Options.height = options.svg.attr("height")
    }
  } else {
    Options.width = defaults.svg.canvasWidth
    Options.height = defaults.svg.canvasHeight
  }
    
  Options.dataHeight = Options.height - Options.topMargin - Options.bottomMargin
  Options.dataWidth = Options.width - Options.leftMargin - Options.rightMargin 
  console.log("extract svg attributes... for height & width")
  console.log('eg height: ' + Options.height + ' - ' + Options.topMargin + ' - ' + Options.bottomMargin)

  // Customize non-data default options 
  if (type === 'title') {
    var canvasWidth = options.svg.attr('width')
    
    if (!options.x) { 
      Options.x = canvasWidth / 2;
      Options.anchor = 'middle';
    }
    if (!options.y) {
      Options.y = Options.fontSize
    }    
  }

  // Add additional options for plots:
  if (! options.data) {
    console.log(type + ' output options: ' + JSON.stringify(Options))
    return Options
  } else {
    // add details when dataset is available ... 
    if (!options.headers) {
      Options.headers = Object.keys(options.data[0]).map(a => {
        return { text: a, value: a }
      })
    }

    if (!options.yCol || !options.xCol) {
      console.log("Confirm key index for value column...")
      var yCol
      var xCol
      var index = 0
      for (var o = 0; o < Options.headers.length; o++) {
        yCol = Options.headers[o].value
        console.log(yCol + ' ? ')
        var cType = options.data[0][yCol].constructor
        if (cType === Number && !index) {
          index = o
          o = Options.headers.length
        } else if (!xCol) {
          xCol = yCol
        } else if (cType === String) {
          xCol = yCol
        }
      }

      if (!options.yCol) { Options.yCol = yCol }
      if (!options.xCol) { Options.xCol = xCol }

      if (Options.orientation === 'horizontal' && type === 'bar') {
        // reverse default expected x(label) & y(val) columns... if not manually specified
        if (!options.yCol) { Options.yCol = xCol }
        if (!options.xCol) { Options.xCol = yCol }          
      }
    }
    if (!options.color) {
      Options.color = d3.scaleOrdinal(d3.schemeDark2)
    }

    var maxX = 0
    var maxY = 0
    var maxXLength = 0
    var maxYLength = 0
    console.log(JSON.stringify(options.data))
    options.data.map((a) => {
      var valX = parseFloat(a[Options.xCol])
      if (valX > maxX) { maxX = valX }

      var valY = parseFloat(a[Options.yCol])
      if (valY > maxY) { maxY = valY }

      var slenX = a[Options.xCol].toString().length
      if (slenX > maxXLength) { maxXLength = slenX }

      var slenY = a[Options.yCol].toString().length
      if (slenY > maxYLength) { maxYLength = slenY }
    })
    Options.maxX = maxX
    Options.maxY = maxY
    Options.maxXLength = maxXLength
    Options.maxYLength = maxYLength

    Options.records = options.data.length

    if (type === 'bar') {
      var xPadding = 0
      var yPadding = 0

      var span
      var crossSpan
      if (Options.orientation === 'horizontal') {
        Options.labelCol = Options.yCol
        Options.valueCol = Options.xCol
        Options.maxValue = Options.maxX
        Options.maxLabelLength = Options.maxY

        xPadding = Options.maxYLength * Options.fontSize / 2 + Options.labelSpacing*2
        Options.xPadding = xPadding
        span = Options.dataWidth - xPadding
        crossSpan = Options.dataHeight
        console.log('set axis span as ' + Options.width + ' - ' + Options.leftMargin + ' - ' + Options.rightMargin + ' - ' + xPadding)
      } else {
        Options.labelCol = Options.xCol
        Options.valueCol = Options.yCol
        Options.maxValue = Options.maxY
        Options.maxLabelLength = Options.maxX

        yPadding = Options.fontSize + Options.labelSpacing*2
        Options.yPadding = yPadding
        span = Options.dataHeight - yPadding
        crossSpan = Options.dataWidth
        console.log('set axis span as ' + Options.height + ' - ' + Options.topMargin + ' - ' + Options.bottomMargin + ' - ' + yPadding)
      }
      Options.span = span
      Options.crossSpan = crossSpan
      
      if (!options.scale) {
        // default if not manually specified (Note: options is input.. Options includes defaults)
        Options.scale = Options.span / Options.maxValue
        console.log('auto set scale to ' + Options.scale + ' (based on max value of ' + Options.maxValue + ' and an effective canvas size of ' + span)
      }
      if (!options.thickness) {
        Options.thickness = ((crossSpan - 2*Options.spacing) / Options.records) - Options.spacing
        console.log('auto set bar thickness to ' + Options.thickness + ' (based on ' + Options.records + ' records (spaced at ' + Options.spacing + ') spanning an effective canvas base of ' + crossSpan )
      }
    } else if (type === 'pie') {
      Options.labelCol = Options.xCol
      Options.valueCol = Options.yCol
      Options.maxValue = Options.maxY
      Options.maxLabelLength = Options.maxX
    } else if (type === 'scatter') {
      if (!Options.ptSize) { Options.ptSize = 5 }
      Options.xPadding = Options.ptSize / 2
      Options.yPadding = Options.ptSize / 2
      Options.scaleX = (Options.dataWidth - Options.xPadding) / Options.maxX
      Options.scaleY = (Options.dataHeight - Options.yPadding) / Options.maxY
    }
    
    console.log(type + ' output options using dataset: ' + JSON.stringify(Options))
    return Options
  }
}

function addCircle (options) {
  console.log('add circle: ' + JSON.stringify(options))
  var svg = options.svg || this.initSvg(options)

  const set = this.setOptions('circle', options)

  console.log('append circle to svg element...')
  return svg.append('circle')
          .attr('cx', set.x)
          .attr('cy', set.y)
          .attr('r', set.radius)
          .attr('fill', set.color || 'green');
}

function addRectangle(options) {
  console.log('add rectangle: ' + JSON.stringify(options))
  var svg = options.svg || this.initSvg(options)

  const set = this.setOptions('rectangle', options)

  return svg.append('rect')
          .attr('x', set.x)
          .attr('y', set.y)
          .attr('height', set.height)
          .attr('width', set.width)
          .attr('fill', set.color || 'green');
}


function addText(text, options) {
  if (!options) { options = {} }
  var svg = options.svg || this.initSvg(options);
  const set = this.setOptions('text', options);
  
  console.log('add text: ' + JSON.stringify(set));

  return svg.append('text')
            .attr("x", set.x)
            .attr("y", set.y)
            .attr("font-size", set.fontSize)
            .attr("fill", set.color)
            .style('text-anchor', set.anchor)
            .text(text);
}

function addTitle(text, options) {
  if (!options) { options = {} }
  var svg = options.svg || this.initSvg(options);
  const set = this.setOptions('title', options);
  
  console.log('add title: ' + JSON.stringify(set));

  var block = svg.append('text')
          .style('text-anchor', set.anchor)
          .attr("x", set.x)
          .attr("y", set.y)
          .attr("font-size", set.fontSize)
          .attr("fill", set.color)
          .text(text);

          var block = svg.append('text')
          .style('text-anchor', set.anchor)
          .attr("x", set.x)
          .attr("y", set.y)
          .attr("font-size", set.fontSize)
          .attr("fill", set.color)
          .text(text);

  if (set.border) {
    var pad = set.padBorder || 0;
    var borderOptions = setOptions('rectangle', options);
    borderOptions.width = options.svg.attr('width') - pad*2 - set.border;
    console.log('set w' + JSON.stringify(borderOptions));
    borderOptions.height = svg.attr('height') - pad*2 - set.fontSize - 2*set.border - set.padTitle;
    borderOptions.x = pad + set.border/2;
    borderOptions.y = pad + set.fontSize + 2*set.border + set.padTitle;
    borderOptions.color = set.borderColor || black;

    addRectangle(borderOptions)
  }
}

export default { colour, contrastWith, showDefaults, initSvg, embedData, resize, setOptions, addCircle, addRectangle, addText, addTitle }
