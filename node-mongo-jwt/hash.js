const bcrypt = require("bcrypt");


async function hash() {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash("abcd", salt);
  console.log(salt);
  console.log(hashed);
}
hash();
