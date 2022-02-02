import { CreateBookDto } from '@/dtos/book.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { Book } from '@/interfaces/books.interface';
import BookService from '@/services/books.service';
import { NextFunction, Response } from 'express';

class BooksController {
  public bookService = new BookService();

  public getBooks = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.user._id;
      const findAllUserBooks: Book[] = await this.bookService.findAllBooks(userId);

      res.status(200).json({ data: findAllUserBooks, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getBookById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.user._id;
      const bookId: string = req.params.id;
      const findOneBookData: Book = await this.bookService.findBookById(bookId, userId);

      res.status(200).json({ data: findOneBookData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createBook = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const bookData: CreateBookDto = req.body;
      const userId: string = req.user._id;
      const createBookData: Book = await this.bookService.createBook(bookData, userId);

      res.status(201).json({ data: createBookData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateBook = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const bookId: string = req.params.id;
      const bookData: CreateBookDto = req.body;
      const userId = req.user._id;
      const updateBookData: Book = await this.bookService.updateBook(bookId, bookData, userId);

      res.status(200).json({ data: { _id: bookId, ...bookData }, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteBook = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const bookId: string = req.params.id;
      const userId: string = req.user._id;
      const deleteBookData: Book = await this.bookService.deleteBook(userId, bookId);

      res.status(200).json({ data: deleteBookData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default BooksController;
