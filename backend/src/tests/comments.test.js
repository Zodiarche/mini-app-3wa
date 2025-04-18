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

describe("Comment endpoints", () => {
  describe("POST /api/comments", () => {
    it("should add a comment", async () => {
      // Créer une catégorie
      const catRes = await request(app).post("/api/categories").send({
        name: "CatTest",
      });

      const categoryId = catRes.body._id;

      // Ajouter un commentaire
      const res = await request(app).post("/api/comments").send({
        title: "Titre de test",
        content: "Contenu du commentaire",
        categoryId,
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("title", "Titre de test");
      expect(res.body).toHaveProperty("content", "Contenu du commentaire");
      expect(res.body).toHaveProperty("categoryId", categoryId);
    });

    it("should return 500 if required fields are missing", async () => {
      const res = await request(app).post("/api/comments").send({});
      expect(res.statusCode).toBe(500);
    });
  });

  describe("GET /api/comments", () => {
    it("should return an empty array if no comments exist", async () => {
      const res = await request(app).get("/api/comments");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });

    it("should return all comments", async () => {
      // Créer une catégorie
      const catRes = await request(app).post("/api/categories").send({
        name: "Catégorie pour commentaires",
      });

      const categoryId = catRes.body._id;

      // Ajouter deux commentaires
      await request(app).post("/api/comments").send({
        title: "Commentaire 1",
        content: "Contenu 1",
        categoryId,
      });

      await request(app).post("/api/comments").send({
        title: "Commentaire 2",
        content: "Contenu 2",
        categoryId,
      });

      const res = await request(app).get("/api/comments");

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });

  describe("GET /api/comments/:categoryId", () => {
    it("should return only comments of given category", async () => {
      // Créer deux catégories
      const cat1 = await request(app)
        .post("/api/categories")
        .send({ name: "A" });
      const cat2 = await request(app)
        .post("/api/categories")
        .send({ name: "B" });

      // Ajouter 1 commentaire dans chaque
      await request(app).post("/api/comments").send({
        title: "Com A",
        content: "Dans A",
        categoryId: cat1.body._id,
      });

      await request(app).post("/api/comments").send({
        title: "Com B",
        content: "Dans B",
        categoryId: cat2.body._id,
      });

      // Tester récupération par cat1
      const res = await request(app).get(`/api/comments/${cat1.body._id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].title).toBe("Com A");
    });

    it("should return empty array if category has no comments", async () => {
      const cat = await request(app)
        .post("/api/categories")
        .send({ name: "Vide" });
      const res = await request(app).get(`/api/comments/${cat.body._id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });
  });
});
