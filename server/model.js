const mongoose=require('mongoose');
const dbSchema = mongoose.Schema({
  remarks: {
    type: String,
  },

  nature: {
    type: {
      type: String,
      enum: ['sales', 'trans', 'prop', 'repr', 'repl', 'borr', 'etc']
    },
    spec: {
      type: String,
    },

  },

  ptcs: [{
    item: {
      type: String
    },
    tag: {
      type: String
    },
    num: {
      type: Number
    },
    amt: {
      type: Number
    }
  }],

  req: {
    name: {
      type: String
    },
    sign: {
      type: String,
    }
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

  gtappr: [{
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

  appr: {
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
  },

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
    this.nature.schema = {
      orn: {
        type: String,
        required: true
      },
    }
    this.nature._reqs = 'xuor';

  } else if (this.nature.type === 'trans' || this.nature.type === 'prop') {
    this.nature.schema = {
      from: {
        type: String,
        required: true
      },
      to: {
        type: String,
        required: true
      },
      tfno: {
        type: String,
        required: true
      }
    }
    this.nature._reqs = 'atfmr';

  } else if (this.nature.type === 'repr' || this.nature.type === 'repl') {
    this.nature.schema = {
      warranty: {
        type: Boolean,
        required: true
      },
      company: {
        type: String,
        required: true
      }
    };
    this.nature._reqs = 'ass';

  } else if (this.nature.type === 'borr') {
    this.nature.schema = {
      location: {
        type: String,
        required: true
      },
      return: {
        type: Date,
        required: true
      }
    }

    this.nature._reqs = 'req2borr';
  }
  next();
});

const PassForm = mongoose.model("processes", dbSchema);
module.exports = PassForm;
