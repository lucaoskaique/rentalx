export class AppError extends Error {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message); // Chama o construtor de Error
    this.statusCode = statusCode;
  }
}
