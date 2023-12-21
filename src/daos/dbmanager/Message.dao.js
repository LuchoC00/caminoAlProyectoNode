import { messageModel } from '../../models/message.model.js';

class MessageDao {
  static async getAllMessages() {
    return await messageModel.find();
  }
  static async getMessageById(id) {
    return await messageModel.findById(id);
  }
  static async addMessage(message) {
    return await messageModel.create(message);
  }
  static async updateMessage(id, message) {
    return await messageModel.findByIdAndUpdate(id, message, { new: true });
  }
  static async deleteMessage(id) {
    return await messageModel.findByIdAndDelete(id);
  }
}

export default MessageDao;
