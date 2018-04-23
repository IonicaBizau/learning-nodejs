const Sequelize = require("sequelize");
const sequelize = require("./db");

const Author = sequelize.define('library', {
    name: { type: Sequelize.STRING }
});

const Book = sequelize.define('book', {
    name: { type: Sequelize.STRING }
  , year: { type: Sequelize.INTEGER }
});

Author.hasMany(Book);
Book.belongsTo(Author);

let library = null;
sequelize.sync({ force: true }).then(() => {
    return Author.create({
        name: "Alice"
    });
}).then(lib => {
    library = lib;
    return Promise.all(["Foo", "Sequelize for dummies"].map(name => Book.create({ name, year: 1942 })));
}).then(books => {
    return library.setBooks(books);
}).then(books => {
    // This works
    return Author.findOne({
        where: {
            name: "Alice"
        },
        include: [Book]
    });
}).then(authorAndTheirBooks => {
    console.log(authorAndTheirBooks.toJSON());
    // Executing (default): SELECT `library`.*, `books`.`id` AS `books.id`, `books`.`name` AS `books.name`, `books`.`year` AS `books.year`, `books`.`createdAt` AS `books.createdAt`, `books`.`updatedAt` AS `books.updatedAt`, `books`.`libraryId` AS `books.libraryId` FROM (SELECT `library`.`id`, `library`.`name`, `library`.`createdAt`, `library`.`updatedAt` FROM `libraries` AS `library` WHERE `library`.`name` = 'Alice' LIMIT 1) AS `library` LEFT OUTER JOIN `books` AS `books` ON `library`.`id` = `books`.`libraryId`;
    // { id: 1,
    //   name: 'Alice',
    //   createdAt: 2017-05-19T13:18:42.000Z,
    //   updatedAt: 2017-05-19T13:18:42.000Z,
    //   books:
    //    [ { id: 1,
    //        name: 'Foo',
    //        year: 1942,
    //        createdAt: 2017-05-19T13:18:42.000Z,
    //        updatedAt: 2017-05-19T13:18:42.000Z,
    //        libraryId: 1 },
    //      { id: 2,
    //        name: 'Sequelize for dummies',
    //        year: 1942,
    //        createdAt: 2017-05-19T13:18:42.000Z,
    //        updatedAt: 2017-05-19T13:18:42.000Z,
    //        libraryId: 1 } ] }

    // This works too
    return Author.findOne({
        where: {
            name: "Alice"
        },
        include: [{
            model: Book,
            where: {
                year: 1942
            }
        }]
    });
}).then(authorAndTheirBooks => {
    console.log(authorAndTheirBooks.toJSON());
    // Executing (default): SELECT `library`.*, `books`.`id` AS `books.id`, `books`.`name` AS `books.name`, `books`.`year` AS `books.year`, `books`.`createdAt` AS `books.createdAt`, `books`.`updatedAt` AS `books.updatedAt`, `books`.`libraryId` AS `books.libraryId` FROM (SELECT `library`.`id`, `library`.`name`, `library`.`createdAt`, `library`.`updatedAt` FROM `libraries` AS `library` WHERE `library`.`name` = 'Alice' AND ( SELECT `libraryId` FROM `books` AS `book` WHERE (`book`.`libraryId` = `library`.`id` AND `book`.`year` = 1942) LIMIT 1 ) IS NOT NULL LIMIT 1) AS `library` INNER JOIN `books` AS `books` ON `library`.`id` = `books`.`libraryId` AND `books`.`year` = 1942;
    // { id: 1,
    //   name: 'Alice',
    //   createdAt: 2017-05-19T13:18:42.000Z,
    //   updatedAt: 2017-05-19T13:18:42.000Z,
    //   books:
    //    [ { id: 1,
    //        name: 'Foo',
    //        year: 1942,
    //        createdAt: 2017-05-19T13:18:42.000Z,
    //        updatedAt: 2017-05-19T13:18:42.000Z,
    //        libraryId: 1 },
    //      { id: 2,
    //        name: 'Sequelize for dummies',
    //        year: 1942,
    //        createdAt: 2017-05-19T13:18:42.000Z,
    //        updatedAt: 2017-05-19T13:18:42.000Z,
    //        libraryId: 1 } ] }

    // But this returns `null`
    return Author.findOne({
        where: {
            name: "Alice"
        },
        include: [{
            model: Book,
            where: {
                // ...because there's no book published in 1943
                year: 1943
            }
        }]
    });
}).then(authorAndTheirBooks => {
    console.log(authorAndTheirBooks);
    // Executing (default): SELECT `library`.*, `books`.`id` AS `books.id`, `books`.`name` AS `books.name`, `books`.`year` AS `books.year`, `books`.`createdAt` AS `books.createdAt`, `books`.`updatedAt` AS `books.updatedAt`, `books`.`libraryId` AS `books.libraryId` FROM (SELECT `library`.`id`, `library`.`name`, `library`.`createdAt`, `library`.`updatedAt` FROM `libraries` AS `library` WHERE `library`.`name` = 'Alice' AND ( SELECT `libraryId` FROM `books` AS `book` WHERE (`book`.`libraryId` = `library`.`id` AND `book`.`year` = 1943) LIMIT 1 ) IS NOT NULL LIMIT 1) AS `library` INNER JOIN `books` AS `books` ON `library`.`id` = `books`.`libraryId` AND `books`.`year` = 1943;
    // null
}).catch(e => {
    console.error(e);
});
