let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;

/**************************************************
 * String, Number, Date, Buffer, Boolean, Mixed, 
 * Objectid, Array
 **************************************************/
let bookSchema  = new Schema({
    title:  String,
    author: String,
    published_date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('book', bookSchema);

/***************************************************
 * SCHEMA EXAMPLE
 ***************************************************/
/****************************************************
 let schema = new Schema({
    name:       String,
    binary:     Buffer,
    living:     Boolean,
    updated:    { type: Date, default: Date.now },
    age:        { type: Number, min: 18, max: 65 },
    mixed:      Schema.Types.Mixed,
    _someId:    Schema.Types.ObjectId,
    deciaml:    Schema.Types.Decimal128,
    array:      [],
    ofString:   [String],
    ofNumber:   [Number],
    ofDates:    [Date],
    ofBuffer:   [Buffer],
    ofBoolean:  [Boolean],
    ofMixed:    [Schema.Types.Mixed],
    ofObjectId: [Schema.Types.ObjectId],
    ofArrays:   [[]],
    ofArrayOfNumers: [[Number]],
    nested: {
        stuff: { type:String, lowercase: true, trim: true }
    },
    map: Map,
    mapOfString: {
        type :  Map,
        of:     String
    }
});

// EXAMPLE USE
let Thing = mongoose.model('Thing', schema);

let m   = new Thing;
m.name  = 'Status of Liberty';
m.age   = 125;
m.updated   = new Date;
m.binary    = Buffer.alloc(0);
m.living    = false;
m.mixed     = { any: { thing: 'i want' } };
m.markModified('mixed');
m._someId   = new mongoose.Types.ObjectId;
m.array.push(1);
m.ofString.push("stirngs!");
m.ofDates.addToSet(new Date);
m.ofBuffer.pop();
m.ofMixed       = [1, [], 'three', { four: 5 }];
m.nested.stuff  = new Map([['key', 'value']]);
m.save(callback);

let schema1 = new Schema({
    test: String
});

let schema2 = new Schema({
    test: { 
        type        : String,
        lowercase   : true
    }
});

let numberSchema = new Schema({
    integerOnly: {
        type    : Number,
        get     : v => Math.round(v),
        set     : v => Math.round(v),
        alias   : 'i' 
    }
});

let Number = mongoose.model('Number', numberSchema);

let doc = new Number();
doc.integerOnly = 2.001;
doc.integerOnly;    // 2
doc.i;              // 2
doc.i = 3.001;
doc.integerOnly;    // 3
doc.i;              // 3
******************************************************/