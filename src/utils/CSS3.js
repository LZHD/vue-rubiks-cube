export default {
    methods: {
        getProperty: function (property) {
            let prefix = this.getPrefix(this._normalize(property));
            if (prefix === null) {
                return null;
            }
            return (prefix ? "-" + prefix.toLowerCase() + "-" : "") + property;
        },
        set: function (node, prop, value) {
            prop = this._normalize(prop);
            let prefix = this.getPrefix(prop);
            if (prefix === null) {
                return false;
            }
            let p = (prefix ? prefix + prop.charAt(0).toUpperCase() + prop.substring(1) : prop);
            node.style[p] = value;
            return true;
        },
        getPrefix: function (property) {
            const prefixes = ["", "ms", "Webkit", "O", "Moz"];
            for (let i = 0; i < prefixes.length; i++) {
                let p = prefixes[i];
                let prop = (p ? p + property.charAt(0).toUpperCase() + property.substring(1) : property);
                if (prop in this._node.style) {
                    return p;
                }
            }
            return null;
        },
        _normalize: function (property) {
            return property.replace(/-([a-z])/g, function (match, letter) {
                return letter.toUpperCase();
            });
        },
        _node: OZ.DOM.elm("div")
    }
}