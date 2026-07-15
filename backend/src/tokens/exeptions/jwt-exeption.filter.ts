import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { JsonWebTokenError } from "@nestjs/jwt";
import { Response } from "express";

@Catch(JsonWebTokenError)
export class JwtExeptionFilter implements ExceptionFilter  {
  catch(exception: JsonWebTokenError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    if(exception.name === 'TokenExpiredError') {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'The token has expired',
        error: 'Unauthorized',
      });
    }

  }
}
