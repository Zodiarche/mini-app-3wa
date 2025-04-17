import Category from "../models/Category.js";

/**
 * Récupère tous les commentaires dans la BDD
 *
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise<Response>}
 *
 * @throws {Error}
 */
export const getCategories = async (request, response) => {
  try {
    const categories = await Category.find();
    return response.status(200).json(categories);
  } catch (error) {
    console.log("error:", error);
    return response.status(500).json({
      message: "Erreur serveur. Impossible de récupérer les commentaires.",
    });
  }
  //   response.json({ message: "get categories" });
};

/**
 * Ajoute un nouveau commentaire dans la BDD
 *
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise<Response>}
 *
 * @throws {Error}
 */
export const addCategory = async (request, response) => {
  const { name } = request.body;

  if (!name || name.trim() === "") {
    return response
      .status(400)
      .json({ message: "Le nom de la catégorie est requis." });
  }
  try {
    const newCategory = new Category({ name });

    await newCategory.save();
    return response.status(201).json(newCategory);
  } catch (error) {
    console.log("error:", error);
    return response
      .status(500)
      .json({ message: "Erreur serveur. Impossible de créer le commentaire." });
  }
  //   response.json({ message: "post categories" });
};
