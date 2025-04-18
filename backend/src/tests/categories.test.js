const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

// Connexion à la base de test
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);
});

// Nettoyage après chaque test
afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany();
  }
});

// Déconnexion après les tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe("Category endpoints", () => {
  it("should add a category", async () => {
    const res = await request(app).post("/api/categories").send({
      name: "CatégorieTest",
    });

    console.log("Réponse Supertest:", res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("name", "CatégorieTest");
    expect(res.body).toHaveProperty("_id");
  });

  it("should return 400 if name is missing", async () => {
    const res = await request(app).post("/api/categories").send({});
    expect(res.statusCode).toBe(400);
  });
});

describe("GET /api/categories", () => {
  it("should return an empty array if no categories exist", async () => {
    const res = await request(app).get("/api/categories");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("should return categories after creation", async () => {
    // Créer une catégorie
    await request(app).post("/api/categories").send({ name: "TestCat" });

    const res = await request(app).get("/api/categories");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty("name", "TestCat");
  });
});
