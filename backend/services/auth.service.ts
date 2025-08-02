// services/auth.service.ts

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db';
import { User } from '../types/user';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

export const registerUser = async (
  email: string,
  password: string,
  phone_number: string,
  name: string,
  surname: string
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const result = await pool.query(
    `INSERT INTO users (email, password_hash, phone_number, name, surname)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, email, phone_number, name, surname, created_at`,
    [email, hashedPassword, phone_number, name, surname]
  );

  return result.rows[0];
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: string; user: User }> => {
  const result = await pool.query(
    `SELECT id, email, password_hash, phone_number, name, surname, created_at
     FROM users WHERE email = $1`,
    [email]
  );

  const user = result.rows[0];
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  const userResponse: User = {
    id: user.id,
    email: user.email,
    phone_number: user.phone_number,
    name: user.name,
    surname: user.surname,
    created_at: user.created_at,
  };

  return { token, user: userResponse };
};

export const getUserById = async (id: string): Promise<User | null> => {
  const result = await pool.query(
    `SELECT id, email, phone_number, name, surname, created_at
     FROM users WHERE id = $1`,
    [id]
  );

  return result.rows[0] || null;
};
