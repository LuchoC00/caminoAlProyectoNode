import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  user: {
    type: Object,
    requred: true,
  },
  message: {
    type: String,
    requred: true,
  },
});

const messageModel = model('message', messageSchema);

export { messageModel };
