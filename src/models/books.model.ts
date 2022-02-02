import { Book } from '@/interfaces/books.interface';
import { model, Schema, Document } from 'mongoose';

const bookSchema: Schema = new Schema({
  bookName: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  bookDesc: {
    type: String,
    required: true,
  },
});

const bookModel = model<Book & Document>('Book', bookSchema);

export default bookModel;
