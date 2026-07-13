import * as authService from './auth.service.js';
import { registerSchema, loginSchema } from './auth.validation.js';
import { ApiError } from '../../middleware/error.middleware.js';

export const register = async (req, res, next) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const result = await authService.registerUser(validatedData);
    res.status(201).json({
      success: true,
      data: result,
      message: 'User registered successfully',
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      next(new ApiError(400, 'Validation failed', error.errors));
    } else {
      next(error);
    }
  }
};

export const login = async (req, res, next) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const result = await authService.loginUser(validatedData);
    res.status(200).json({
      success: true,
      data: result,
      message: 'Login successful',
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      next(new ApiError(400, 'Validation failed', error.errors));
    } else {
      next(error);
    }
  }
};
