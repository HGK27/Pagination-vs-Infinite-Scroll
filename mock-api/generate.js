import { faker } from "@faker-js/faker";
import fs from "fs";

const users = [];
const posts = [];

const usedUserIds = new Set();

function uniqueInt(usedSet, min = 1, max = 5000000) {
  let id;
  do {
    id = faker.number.int({ min, max });
  } while (usedSet.has(id));
  usedSet.add(id);
  return id;
}

for (let i = 1; i <= 50000; i++) {
  let userId = uniqueInt(usedUserIds);
  users.push({
    id: userId,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    city: faker.location.city(),
  });
  posts.push({
    id: i,
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    image: faker.image.url({ width: 640, height: 480 }),
    userId: userId,
  });
}

fs.writeFileSync("db.json", JSON.stringify({ users, posts }, null, 2));

console.log("✅ 50k data oluşturuldu");
