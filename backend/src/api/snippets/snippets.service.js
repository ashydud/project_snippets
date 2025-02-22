import { snippetsModel } from "./snippets.model.js"
import { SnipperNotFoundError, ValidationError } from "../../utils/handlerErrors.js"
import { usersModel } from "../roles/roles.model.js"
import { rolesModel } from "../roles/roles.model.js"
import { languagesModel } from "../roles/roles.model.js"
import { tagsModel } from "../roles/roles.model.js"


export const createSnippet = ({ user_id, title, snippet, description, language_id, tag_ids }) => {

}

export const editSnippet = async ({user_id, snippet_id, title, description, snippet: mySnippet, language_id, tag_ids}) => {

}

export const deleteSnippet = async ({user_id, snippet_id}) => {

}

export const getAllSnippets = async () => {

}

export const getSnippetById = async (snippet_id) => {

}
