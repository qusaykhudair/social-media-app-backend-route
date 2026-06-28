import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

export const PostType = new GraphQLObjectType({
    name : "PostType",
    fields :{
        id : {
            type : GraphQLString
        },
        caption : {
            type : GraphQLString
        },
        image : {
            type : GraphQLString
        },
        likes : {
            type : GraphQLInt
        },
        comments : {
            type : GraphQLInt
        },
        createdAt : {
            type : GraphQLString
        },
        updatedAt : {
            type : GraphQLString
        }
    }
})