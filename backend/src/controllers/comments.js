const Comment = require("../models/Comment.js");

/**
 * Récupère tous les commentaires dans la BDD
 *
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise<Response>}
 *
 * @throws {Error}
 */
const getComments = async (request, response) => {
  try {
    const comments = await Comment.find();
    return response.status(200).json(comments);
  } catch (error) {
    console.log("error:", error);
    return response.status(500).json({
      message: "Erreur serveur. Impossible de récupérer les commentaires.",
    });
  }
};

/**
 * Récupère les commentaires d'une catégorie
 */
const getCommentsByCategory = async (request, response) => {
  const { categoryId } = request.params;

  try {
    const comments = await Comment.find({ categoryId }).populate("categoryId");
    return response.status(200).json(comments);
  } catch (error) {
    console.error("Erreur dans getCommentsByCategory:", error);
    return response.status(500).json({
      message:
        "Erreur serveur. Impossible de récupérer les commentaires de cette catégorie.",
    });
  }
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
const addComment = async (request, response) => {
  const { title, content, categoryId } = request.body;

  try {
    const newComment = new Comment({ title, content, categoryId });

    await newComment.save();
    return response.status(201).json(newComment);
  } catch (error) {
    console.log("error:", error);
    return response
      .status(500)
      .json({ message: "Erreur serveur. Impossible de créer le commentaire." });
  }
};

module.exports = { getComments, getCommentsByCategory, addComment };
