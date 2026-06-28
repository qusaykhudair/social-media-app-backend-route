import { GraphQLString } from "graphql"
import { PostType } from "./post.typs"

export const postQuery = {
    post: {
        type: PostType,
        args: {
            id: {
                type: GraphQLString
            }
        },
        resolve: () => {
            return "Post Query"
        }
    }
}

export const postMutation = {
    createPost: {
        type: PostType,
        args: {
            title: {
                type: GraphQLString
            },
            content: {
                type: GraphQLString
            },
            image: {
                type: GraphQLString
            },
            author: {
                type: GraphQLString
            }
        },
        resolve: () => {
            return "Post Mutation"
        }
    }
}