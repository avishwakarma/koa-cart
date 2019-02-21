/**
 * gql
 * 
 * Graphql string wrapper imported from apollo
 */
import { gql, ApolloError } from 'apollo-server-koa';

/**
 * context
 * 
 * Setting session on context
 */
import context from '../middleware/context';

/**
 * AuthDirective
 * 
 * GraphQL directive for Auth
 */
import AuthDirective from '../middleware/auth-directive';

/**
 * logger
 * 
 * Application logger
 */
import logger from '../utility/logger';

import auth from './auth';

export default {
  /**
   * typeDefs
   * 
   * GraphQL type definitions
   */
  typeDefs: gql`
    scalar Date
    
    directive @auth on FIELD_DEFINITION

    type MutationResult {
      status: Boolean
      message: String
    }

    ${auth.type}
    
    type Query {
      ${auth.query}
    }
  `,

  /**
   * resolvers
   * 
   * GraphQL query and mutation resolvers
   */
  resolvers: {
    Query: {
      ...auth.resolver.query,
    }
  },
  
  /**
   * schemaDirectives
   * 
   * directives to transform response
   */
  schemaDirectives: {
    auth: AuthDirective
  },

  /**
   * context
   * 
   * middleware to set session in context
   */
  context,

  /**
   * formatError
   * 
   * Error formatting
   */
  formatError: (error: ApolloError) => {
    /**
     * error.extensions includes code and stacktrace
     * assigned to the code to error
     * deleted the extensions for smaller error size in response
     */
    error.type = error.extensions.code;
    delete error.extensions;
    logger.error(error);
    return error;
  },

  formatResponse: (response: any, options: any) => {

    if(response.errors) {
      logger.error(response.errors);
    }
    
    if(options.context._token) {
      options.context.ctx.response.set('Authorization', options.context._token);
    }

    return response;
  }
}