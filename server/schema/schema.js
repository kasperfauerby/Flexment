import TaskModel from "../models/taskModel.js";
import UserModel from "../models/userModel.js";
import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
    GraphQLScalarType,
  } from "graphql";


//Task Type
const TaskType = new GraphQLObjectType({
    name: "Task",
    fields: () => ({
      id: { type: GraphQLID },
      taskName: { type: GraphQLString },
      taskDescription: { type: GraphQLString },
      companyName: { type: GraphQLString },
      name: { type: GraphQLString },
      creator: { type: GraphQLString },
      selectedFile: { type: GraphQLString},
    }),
  });
  
  const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    }),
  });

  const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      tasks: {
        type: new GraphQLList(TaskType),
        resolve(parent, args) {
          return TaskModel.find();
        },
      },
      task: {
        type: TaskType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return TaskModel.findById(args.id);
        },
      },
      users: {
        type: new GraphQLList(UserType),
        resolve(parent, args) {
          return UserModel.find();
        },
      },
      user: {
        type: UserType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return UserModel.findById(args.id);
        },
      },
    },
  });

  export default new GraphQLSchema({
    query: RootQuery
  });