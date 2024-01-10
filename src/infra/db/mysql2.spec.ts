import { connection } from "./mysql2";

test("deveria se conectar ao banco de dados mysql", async () => {
  const queryResult = await connection.promise().ping();
  expect(queryResult).toBe(true);
  connection.end();
});

