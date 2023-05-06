const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dbSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  remarks: {
    type: String,
    default: ''
  },
  nature: {
    type: {
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
      type: String,
      required: true
    },
    tag: {
      type: String,
      required: true
    },
    num: {
      type: Number,
      required: true
    },
    amt: {
      type: Number,
      required: true
    }
  }],
  req: {
    name: {
      type: String,
      required: true
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
          required: true
        }
      });
    } else if (this.nature.type === 'trans' || this.nature.type === 'prop') {
      this.schema.add({
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
      });
    } else if (this.nature.type === 'repr' || this.nature.type === 'repl') {
      this.schema.add({
        warranty: {
          type: Boolean,
          required: true
        },
        company: {
          type: String,
          required: true
        }
      });
    } else if (this.nature.type === 'borr') {
      this.schema.add({
        location: {
          type: String,
          required: true
        },
        return: {
          type: Date,
          required: true
        }
      });
    }
    next();
  });

const dbModel = mongoose.model('dbModel', dbSchema);
