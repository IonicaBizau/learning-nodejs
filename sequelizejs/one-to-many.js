const Sequelize = require("sequelize");
const sequelize = require("./db");

const Library = sequelize.define('library', {
    name: { type: Sequelize.STRING }
});

const Book = sequelize.define('book', {
    text: { type: Sequelize.STRING }
});

Library.hasMany(Book);
Book.belongsTo(Library);

let library = null;
sequelize.sync({ force: true }).then(() => {
    return Library.create({
        name: "Foo"
    });
}).then(lib => {
    library = lib;
    return Promise.all(["1984", "Sequelize for dummies"].map(name => Book.create({ name })));
}).then(books => {
    return library.setBooks(books);
}).then(books => {
    return Library.findAll({
        include: [Book]
    });
}).then(lib => {
    console.log(lib.map(c => c.toJSON()));
    // [
    //     {
    //         "id": 1,
    //         "name": "Foo",
    //         "createdAt": "2017-05-05T06:30:02.000Z",
    //         "updatedAt": "2017-05-05T06:30:02.000Z",
    //         "books": [
    //             {
    //                 "id": 1,
    //                 "text": null,
    //                 "createdAt": "2017-05-05T06:30:02.000Z",
    //                 "updatedAt": "2017-05-05T06:30:02.000Z",
    //                 "libraryId": 1
    //             },
    //             {
    //                 "id": 2,
    //                 "text": null,
    //                 "createdAt": "2017-05-05T06:30:02.000Z",
    //                 "updatedAt": "2017-05-05T06:30:02.000Z",
    //                 "libraryId": 1
    //             }
    //         ]
    //     }
    // ]
}).catch(e => {
    console.error(e);
});
