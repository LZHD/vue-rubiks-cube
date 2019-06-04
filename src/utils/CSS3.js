export default class CSS3 {
  static getProperty (property) {
    let prefix = this.getPrefix(this._normalize(property))
    if (prefix === null) {
      return null
    }
    return (prefix ? '-' + prefix.toLowerCase() + '-' : '') + property
  }
  static set (node, prop, value) {
    prop = this._normalize(prop)
    let prefix = this.getPrefix(prop)
    if (prefix === null) {
      return false
    }
    let p = (prefix ? prefix + prop.charAt(0).toUpperCase() + prop.substring(1) : prop)
    node.style[p] = value
    return true
  }
  static getPrefix (property) {
    const prefixes = ['', 'ms', 'Webkit', 'O', 'Moz']
    for (let i = 0; i < prefixes.length; i++) {
      let p = prefixes[i]
      let prop = (p ? p + property.charAt(0).toUpperCase() + property.substring(1) : property)
      if (prop in this._node.style) {
        return p
      }
    }
    return null
  }
  static _normalize (property) {
    return property.replace(/-([a-z])/g, function (match, letter) {
      return letter.toUpperCase()
    })
  }
  static _node () {
    return document.createElement('div')
  }
}
