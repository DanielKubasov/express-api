import dotenv from 'dotenv';

dotenv.config({path: `.env.${process.env.NODE_ENV}`});

export const config = {
    PORT: process.env.PORT || 4000,
    JWT_SECRET: process.env.JWT_SECRET,
    DATABASE_CONNECTION: process.env.DATABASE_CONNECTION,
};
