import BooksController from '@/controllers/books.controller';
import { CreateBookDto } from '@/dtos/book.dto';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class BooksRoute implements Routes {
  public path = '/books';
  public router = Router();
  public booksController = new BooksController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.booksController.getBooks);
    this.router.get(`${this.path}/:id`, authMiddleware, this.booksController.getBookById);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateBookDto, 'body'), this.booksController.createBook);
    this.router.put(`${this.path}/:id`, authMiddleware, validationMiddleware(CreateBookDto, 'body', true), this.booksController.updateBook);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.booksController.deleteBook);
  }
}

export default BooksRoute;
