import { model, Schema, Document } from 'mongoose';
import { Author } from '@interfaces/authors.interface';

const authorSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
});

const authorModel = model<Author & Document>('Author', authorSchema);

export default authorModel;
