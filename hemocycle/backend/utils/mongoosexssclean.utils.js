const xss = require('xss')

const sanitize = (obj) => {
    if(!obj) 
        return obj
    for(const key in obj) {
        if(typeof obj[key] === 'string') 
            obj[key] = xss(obj[key])
        else if(typeof obj[key] === 'object')
            sanitize(obj[key])
    }
    return obj
}

const xssCleanPlugin = (schema) => {
  schema.pre('save', function (next) {
    sanitize(this._doc);
    next();
  });

  schema.pre(['findOneAndUpdate', 'updateOne', 'updateMany'], function (next) {
    const update = this.getUpdate();
    if (update) sanitize(update);
    next();
  })
}

module.exports = {
    xssCleanPlugin
}