const fs = require('fs');

const users = [];

for (let i = 0; i < 1000000; i++) {
  users.push({
    id: i,
    name: `User-${i}`,
    salary: Math.floor(Math.random() * 100000),
    active: Math.random() > 0.5,
    department: ['HR', 'IT', 'Finance', 'Sales'][
      Math.floor(Math.random() * 4)
    ]
  });
}

fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));

console.log('Large JSON file created');