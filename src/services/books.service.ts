import { CreateBookDto } from '@/dtos/book.dto';
import { Book } from '@/interfaces/books.interface';
import bookModel from '@/models/books.model';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class BookService {
  public books = bookModel;

  public async findAllBooks(userId: string): Promise<Book[]> {
    const books: Book[] = await this.books.find({ authorId: userId });
    return books;
  }

  public async findBookById(bookId: string, userId: string): Promise<Book> {
    try {
      if (isEmpty(bookId)) throw new HttpException(400, 'missing bookId');

      const findBook: Book = await this.books.findOne({ _id: bookId });

      if (!findBook) throw new HttpException(409, 'missing book');
      if (findBook && findBook.authorId != userId) throw new HttpException(409, `Unauthorized`);
      return findBook;
    } catch (error) {
      throw new HttpException(500, 'Invalid bookId');
    }
  }

  public async createBook(bookData: CreateBookDto, userId: string): Promise<Book> {
    if (isEmpty(bookData)) throw new HttpException(400, 'invalid book data');

    const findBook: Book = await this.books.findOne({ bookName: bookData.bookName });
    if (findBook) throw new HttpException(409, `Book Name ${bookData.bookName} already exists`);

    const createBookData: Book = await this.books.create({ ...bookData, authorId: userId });

    return createBookData;
  }

  public async updateBook(bookId: string, bookData: CreateBookDto, userId: string): Promise<Book> {
    if (isEmpty(bookId)) throw new HttpException(400, 'invalid book id');
    if (isEmpty(bookData)) throw new HttpException(400, 'invalid book data');

    if (bookId) {
      const findBook: Book = await this.books.findOne({ _id: bookId });
      if (findBook && findBook.authorId != userId) throw new HttpException(409, `Unauthorized`);
    }

    const updateBookById: Book = await this.books.findByIdAndUpdate(bookId, { ...bookData, authorId: userId });
    if (!updateBookById) throw new HttpException(409, 'unable to update book');

    return updateBookById;
  }

  public async deleteBook(userId: string, bookId: string): Promise<Book> {
    try {
      if (bookId) {
        const findBook: Book = await this.books.findOne({ _id: bookId });
        if (findBook && findBook.authorId != userId) throw new HttpException(409, `Unauthorized`);
      }
      const deleteBookById: Book = await this.books.findByIdAndDelete(bookId);
      if (!deleteBookById) throw new HttpException(409, 'unable to delete book');

      return deleteBookById;
    } catch (error) {
      throw new HttpException(500, 'invalid book id');
    }
  }
}

export default BookService;
