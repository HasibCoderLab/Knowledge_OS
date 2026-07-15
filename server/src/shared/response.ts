import type { Response } from 'express';

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown[];
}

export function sendSuccess<T>(res: Response, data: T, message: string = 'Success', statusCode: number = 200): void {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  res.status(statusCode).json(response);
}

export function sendError(res: Response, message: string, statusCode: number = 500, errors?: unknown[]): void {
  const response: ApiResponse = {
    success: false,
    message,
  };
  if (errors) {
    response.errors = errors;
  }
  res.status(statusCode).json(response);
}

export function sendPaginated<T>(
  res: Response,
  data: T[],
  total: number,
  page: number,
  limit: number,
  message: string = 'Success',
): void {
  const response = {
    success: true,
    message,
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasMore: page * limit < total,
    },
  };
  res.status(200).json(response);
}
