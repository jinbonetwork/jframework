SVG.Set = function() {
  /* set initial state */
  this.clear()
}

// Set FX class
SVG.SetFX = function(set) {
  /* store reference to set */
  this.set = set
}

//
SVG.extend(SVG.Set, {
  // Add element to set
  add: function() {
    var i, il, elements = [].slice.call(arguments)

    for (i = 0, il = elements.length; i < il; i++)
      this.members.push(elements[i])
    
    return this
  }
  // Remove element from set
, remove: function(element) {
    var i = this.index(element)
    
    /* remove given child */
    if (i > -1)
      this.members.splice(i, 1)

    return this
  }
  // Iterate over all members
, each: function(block) {
    for (var i = 0, il = this.members.length; i < il; i++)
      block.apply(this.members[i], [i, this.members])

    return this
  }
  // Restore to defaults
, clear: function() {
    /* initialize store */
    this.members = []

    return this
  }
  // Checks if a given element is present in set
, has: function(element) {
    return this.index(element) >= 0
  }
  // retuns index of given element in set
, index: function(element) {
    return this.members.indexOf(element)
  }
  // Get member at given index
, get: function(i) {
    return this.members[i]
  }
  // Default value
, valueOf: function() {
    return this.members
  }
  // Get the bounding box of all members included or empty box if set has no items
, bbox: function(){
    var box = new SVG.BBox()

    /* return an empty box of there are no members */
    if (this.members.length == 0)
      return box

    /* get the first rbox and update the target bbox */
    var rbox = this.members[0].rbox()
    box.x      = rbox.x
    box.y      = rbox.y
    box.width  = rbox.width
    box.height = rbox.height

    this.each(function() {
      /* user rbox for correct position and visual representation */
      box = box.merge(this.rbox())
    })

    return box
  }

})



// Alias methods
SVG.Set.inherit = function() {
  var m
    , methods = []
  
  /* gather shape methods */
  for(var m in SVG.Shape.prototype)
    if (typeof SVG.Shape.prototype[m] == 'function' && typeof SVG.Set.prototype[m] != 'function')
      methods.push(m)

  /* apply shape aliasses */
  methods.forEach(function(method) {
    SVG.Set.prototype[method] = function() {
      for (var i = 0, il = this.members.length; i < il; i++)
        if (this.members[i] && typeof this.members[i][method] == 'function')
          this.members[i][method].apply(this.members[i], arguments)

      return method == 'animate' ? (this.fx || (this.fx = new SVG.SetFX(this))) : this
    }
  })

  /* clear methods for the next round */
  methods = []

  /* gather fx methods */
  for(var m in SVG.FX.prototype)
    if (typeof SVG.FX.prototype[m] == 'function' && typeof SVG.SetFX.prototype[m] != 'function')
      methods.push(m)

  /* apply fx aliasses */
  methods.forEach(function(method) {
    SVG.SetFX.prototype[method] = function() {
      for (var i = 0, il = this.set.members.length; i < il; i++)
        this.set.members[i].fx[method].apply(this.set.members[i].fx, arguments)

      return this
    }
  })
}

//
SVG.extend(SVG.Container, {
  // Create a new set
  set: function() {
    return new SVG.Set
  }

})



