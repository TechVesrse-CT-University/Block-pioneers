import mongoose from 'mongoose';

const componentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  css: {
    type: Object,
    required: true,
    validate: {
      validator: function(v) {
        try {
          JSON.parse(JSON.stringify(v));
          return true;
        } catch {
          return false;
        }
      },
      message: props => `${props.value} is not valid CSS!`
    }
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  }
});

// Add text index for search functionality
componentSchema.index({ name: 'text', description: 'text', tags: 'text' });

export default mongoose.model('Component', componentSchema);
