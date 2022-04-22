--Create db
CREATE DATABASE blog WITH
OWNER = postgres
ENCODING = 'UTF-8';

--Create admin
CREATE ROLE db_admin WITH
LOGIN
PASSWORD 'adminsecret';


--GRANT TO db_admin
GRANT SELECT,INSERT,UPDATE,DELETE --TRUNCATE
ON ALL TABLES IN SCHEMA public
TO db_admin;

--Install the extension with a super user to set id
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--Create users table
CREATE TABLE users(
    id uuid PRIMARY KEY UNIQUE DEFAULT uuid_generate_v4(),
    email VARCHAR(320) UNIQUE NOT NULL,
    password VARCHAR(64) NOT NULL,
    username VARCHAR(32) UNIQUE NOT NULL,
    fullname VARCHAR(32) NOT NULL,
    profile_picture TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);



--Create a posts table
CREATE TABLE posts(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(64) NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    owner uuid,
        CONSTRAINT fk_user_id
            FOREIGN KEY (owner)
                REFERENCES users(id)
                ON DELETE CASCADE
);

--Create a function to update updated_at column 
CREATE OR REPLACE FUNCTION upd_timestamp() RETURNS TRIGGER 
LANGUAGE plpgsql
AS
$$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

--Create a trigger in order to trigger a function before update the post

CREATE TRIGGER trigger_timestamp
  BEFORE UPDATE
  ON posts
  FOR EACH ROW
  EXECUTE PROCEDURE upd_timestamp();


--Create tags table
CREATE TABLE tags(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(32) NOT NULL
);

--Create post_tags table for the many-to-many relation
CREATE TABLE post_tags(
    id SERIAL PRIMARY KEY NOT NULL,
    tag_id INT,
        CONSTRAINT fk_tag_id
            FOREIGN KEY(tag_id)
                REFERENCES tags(id)
                ON DELETE CASCADE,
    post_id INT,
        CONSTRAINT fk_post_id
            FOREIGN KEY(post_id)
                REFERENCES posts(id)
                ON DELETE CASCADE
);

