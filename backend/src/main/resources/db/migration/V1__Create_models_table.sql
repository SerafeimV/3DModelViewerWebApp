-- Create users table
CREATE TABLE users
(
    id         BIGSERIAL PRIMARY KEY,
    email      VARCHAR(255) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name  VARCHAR(100) NOT NULL,
    role       VARCHAR(50)  NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP             DEFAULT CURRENT_TIMESTAMP
);

-- Create model_viewer_file table with user relationship
CREATE TABLE model_viewer_file
(
    id           BIGSERIAL PRIMARY KEY,
    filename     VARCHAR(255) NOT NULL,
    storage_path VARCHAR(500) NOT NULL,
    size         BIGINT       NOT NULL,
    uploaded_by  VARCHAR(100) NOT NULL,
    upload_date  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_model_viewer_file_filename ON model_viewer_file (filename);
CREATE INDEX idx_model_viewer_file_upload_date ON model_viewer_file (upload_date);
