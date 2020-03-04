USE checkout;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    shipToLine1 VARCHAR(100),
    shipToLine2 VARCHAR(100),
    shipToCity VARCHAR(100),
    shipToState VARCHAR(100),
    shipToZipcode INT,
    creditCardNumber INT,
    expiryDate INT,
    CVV INT,
    billingZipcode INT
) AUTO_INCREMENT = 1;
