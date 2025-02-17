CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Resources (
  id INT AUTO_INCREMENT PRIMARY KEY,
  url VARCHAR(255) NOT NULL,
  expiration_time DATETIME NOT NULL,
  user_id INT NOT NULL,
  status ENUM('active', 'expired') DEFAULT 'active',
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES Users(id)
);
