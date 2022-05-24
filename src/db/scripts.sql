CREATE DATABASE todolist; 

-- set extension
CREATE TABLE users(
  user_id UUID DEFAULT uuid_generate_v4(),
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id)
); 

CREATE TYPE status AS ENUM ('NotStarted', 'OnGoing', 'Completed'); 
CREATE TABLE todo(
    todo_id SERIAL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255), 
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    current_status status NOT NULL,
    PRIMARY KEY (todo_id)
);

CREATE OR REPLACE FUNCTION trigger_set_timestamp() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON todo
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
