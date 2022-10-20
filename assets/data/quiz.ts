export default [
    {
        id: '1',
        question: 'What is the output of the following code?',
        image: 'https://blog.chalarangelo.me/static/45cec8321df4bfe1f5a612530911b66b/fae55/1-NkDqIjUhKbfXA37K59kvkw.png',
        choices: ["0", "1", "2", "Error"],
        correctAnswers: ["Error"],
    },
    {
        id: '2',
        question: 'What is the output of the following code?',
        content: `
\`\`\`
const a = 18;
const getBirthday = () => {
    return a;
};
const b = getBirthday();
console.log(b); d        
`,
        choices: ["Good", "Bad", "Meh", "Error"],
        correctAnswers: ["Bad"],
    },
]
