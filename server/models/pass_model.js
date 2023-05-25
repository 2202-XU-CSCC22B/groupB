const mongoose = require('mongoose');
const dbSchema = mongoose.Schema({
  remarks: {
    type: String,
  },

  nature: {
    type: {
      type: String,
      enum: ['sales', 'trans', 'prop', 'repr', 'repl', 'borr', 'etc'],
      required: true,
    },
    spec: {
      type: String,
      required: true,
    },

    _reqs: {
      type: String,
      required: true,
    },
  },

  reqs_uploaded: {
    type: Boolean,
    default: false
  },

  ptcs: [{
    item: {
      type: String,
      required: true,
    },
    tag: {
      type: String
    },
    num: {
      type: Number,
      required: true,
    },
    amt: {
      type: Number,
      required: true,
    }
  }],

  req: {
    name: {
      type: String,
      required: true,
    },
    sign: {
      type: String,
    },
  },

  ver: {
    title: {
      type: String,
    },
    name: {
      type: String,
    },
    sign: {
      type: String,
    },
    signed: {
      type: Boolean,
      default: false
    }
  },

  appr: [{
    title: {
      type: String,
    },
    name: {
      type: String,
    },
    approved: {
      type: Boolean,
      default: false
    }
  }],

  rcv: {
    name: {
      type: String,
    },
    sign: {
      type: String,
    },
    signed: {
      type: Boolean,
      default: false
    },
  },

  done:{
    type: Boolean,
    default: false
  }
},
{
  timestamps: { 
    createdAt: 'created', 
    updatedAt: 'updated' 
  }
});

dbSchema.pre('validate', function(next) {
  if (this.nature.type === 'sales') {
    this.nature.orn = {
      type: String,
      required: true
    };
    this.nature._reqs = 'xuor';
  } else if (this.nature.type === 'trans' || this.nature.type === 'prop') {
    this.nature.from = {
      type: String,
      required: true
    };
    this.nature.to = {
      type: String,
      required: true
    };
    this.nature.tfno = {
      type: String,
      required: true
    };
    this.nature._reqs = 'atfmr';
  } else if (this.nature.type === 'repr' || this.nature.type === 'repl') {
    this.nature.warranty = {
      type: Boolean,
      required: true
    };
    this.nature.company = {
      type: String,
      required: true
    };
    this.nature._reqs = 'ass';
  } else if (this.nature.type === 'borr') {
    this.nature.location = {
      type: String,
      required: true
    };
    this.nature.return = {
      type: Date,
      required: true
    };
    this.nature._reqs = 'req2borr';
  }
  next();
});

const PassForm = mongoose.model("processes", dbSchema);
module.exports = PassForm;
