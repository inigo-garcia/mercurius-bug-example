const options = { 
    authorizer: function authorizer(source, args, context, info) {
      const { fieldName } = info
      const { isAuthenticated } = context
  
      if (!isAuthenticated)
        return Promise.reject(
          `The resource ${fieldName} require proper authentication`
        )
  
      return Promise.resolve()
    },
  }
  
  const { GraphQLSchema } = require('graphql'),
    { generateSchema } = require('sequelize-graphql-schema')(options),
    models = require('../db/models'),
    { makeExecutableSchema } = require('@graphql-tools/schema'),
    { stitchSchemas } = require('@graphql-tools/stitch')
  
  const dbSchema = new GraphQLSchema(generateSchema(models))
  
  module.exports = stitchSchemas({
    mergeTypes: true,
    subschemas: [dbSchema],
  })
