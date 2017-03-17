const Sequelize = require("sequelize");
const sequelize = require("./db");

var Mentee = sequelize.define('mentee', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    }
});

var Question = sequelize.define('question', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: Sequelize.STRING
    }
});

var MenteeQuestion = sequelize.define('menteequestion', {
//    answer: {
//        type: Sequelize.STRING
//    }
});

// A mentee can answer several questions
Mentee.belongsToMany(Question, { as: "Questions", through: MenteeQuestion });

// And a question can be answered by several mentees
Question.belongsToMany(Mentee, { as: "Mentees", through: MenteeQuestion });

let currentQuestion = null;
Promise.all([
    Mentee.sync({ force: true })
  , Question.sync({ force: true })
  , MenteeQuestion.sync({ force: true })
]).then(() => {
    return Mentee.destroy({where: {}})
}).then(() => {
    return Question.destroy({ where: {} })
}).then(() => {
    return Question.create({
        text: "What is 42?"
    });
}).then(question => {
    currentQuestion = question;
    return Mentee.create({
        name: "Johnny"
    })
}).then(mentee => {
    console.log("Adding question");
    return mentee.addQuestion(currentQuestion);
}).then(() => {
    return MenteeQuestion.findAll({
        where: {}
      , include: [Mentee]
    })
}).then(menteeQuestions => {
    return MenteeQuestion.findAll({
        where: {
            menteeId: 1
        }
      , include: [Mentee]
    })
}).then(menteeQuestion => {
    console.log(menteeQuestion.toJSON());
}).catch(e => {
    console.error(e);
});
