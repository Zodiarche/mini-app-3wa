// import { Request, Response } from "express";

import Comment from "../models/Comment.js";

/**
 * Récupère tous les commentaires dans la BDD
 *
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise<Response>}
 *
 * @throws {Error}
 */
export const getComments = async (request, response) => {
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
 * Ajoute un nouveau commentaire dans la BDD
 *
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise<Response>}
 *
 * @throws {Error}
 */
export const addComment = async (request, response) => {
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
