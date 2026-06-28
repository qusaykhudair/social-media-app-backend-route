import { GraphQLString } from "graphql";
import { UserType } from "./user.type";

export const userQuery = {
    user: {
        type: UserType,
        args: {
            id: {
                type: GraphQLString
            }
        },
        resolve: () => {
            return "User Query"
        }
    }
};


export const userMutation = {
    createUser: {
        type: UserType,
        args: {
            name: {
                type: GraphQLString
            },
            email: {
                type: GraphQLString
            },
            password: {
                type: GraphQLString
            },
            phoneNumber: {
                type: GraphQLString
            }
        },
        resolve: () => {
            return "User Mutation"
        }
    }
};
