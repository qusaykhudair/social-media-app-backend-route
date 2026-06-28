import { GraphQLObjectType, GraphQLString } from "graphql";

export const UserType = new GraphQLObjectType({
    name : "UserType",
    fields :{
        id : {
            type : GraphQLString
        },
        name : {
            type : GraphQLString
        },
        email : {
            type : GraphQLString
        },
        password : {
            type : GraphQLString
        },
        phoneNumber : {
            type : GraphQLString
        }
    }
})