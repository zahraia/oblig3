CREATE TABLE Tickets
(
    movie      VARCHAR(255),
    id         integer AUTO_INCREMENT,
    amount     VARCHAR(255),
    first_name VARCHAR(255),
    surname    VARCHAR(255),
    phone      VARCHAR(255),
    email      VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE Movies
(
    movie VARCHAR(255),
    PRIMARY KEY (movie)
);