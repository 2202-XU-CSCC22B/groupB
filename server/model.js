const mongoose=require('mongoose');
const dbSchema = mongoose.Schema({
  remarks: {
    type: String,
    default: ''
  },
  nature: {
    typ: {
      type: String,
      enum: ['sales', 'trans', 'prop', 'repr', 'repl', 'borr', 'etc']
    },
    spec: {
      type: String,
      default: ''
    },
    receipt_num: {
      type: String,
      default: ''
    },
    reqs: {
      type: String,
      enum: ['xor', 'atfmr', 'ass', 'req2borr', 'etc']
    }
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
      default: ''
    }
  },
  ver: {
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    sign: {
      type: String,
      default: ''
    },
    signed: {
      type: Boolean,
      default: false
    }
  },
  appr: [{
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    approved: {
      type: Boolean,
      default: false
    }
  }],
  rcv: {
    name: {
      type: String,
      default: ''
    },
    sign: {
      type: String,
      default: ''
    },
    signed: {
      type: Boolean,
      default: false
    }
  }
});

dbSchema.pre('validate', function(next) {
    if (this.nature.type === 'sales') {
      this.schema.add({
        orn: {
          type: String,
        }
      });
    } else if (this.nature.type === 'trans' || this.nature.type === 'prop') {
      this.schema.add({
        from: {
          type: String,
        },
        to: {
          type: String,
        },
        tfno: {
          type: String,
        }
      });
    } else if (this.nature.type === 'repr' || this.nature.type === 'repl') {
      this.schema.add({
        warranty: {
          type: Boolean,
        },
        company: {
          type: String,
        }
      });
    } else if (this.nature.type === 'borr') {
      this.schema.add({
        location: {
          type: String,
        },
        return: {
          type: Date,
        }
      });
    }
    next();
  });

const PassForm = mongoose.model("process", dbSchema);
module.exports = PassForm;
