import handlers from './handlers';

const typesSchema = Object.entries(handlers).reduce(
  (map: { [key: string]: Object }, [name, obj]) => {
    map[name] = obj.schema; //eslint-disable-line
    return map;
  },
  {}
);

const includeSchema = Object.entries(handlers).reduce(
  (map: { [key: string]: Object }, [name, obj]) => {
    if (obj.includeSchema) {
      map[name] = obj.includeSchema;
    }
    return map;
  },
  {}
);


const excludeSchema = Object.entries(handlers).reduce(
  (map: { [key: string]: Object }, [name, obj]) => {
    if (obj.excludeSchema) {
      map[name] = obj.excludeSchema;
    }
    return map;
  },
  {}
);

export default {
  type: 'object',
  $schema: 'http://json-schema.org/draft-07/schema#',
  properties: {
    ...typesSchema,
    include: {
      type: 'object',
      properties: { ...includeSchema },
      default: {},
    },
    exclude: {
      type: 'object',
      properties: { ...excludeSchema },
      default: {},
    },
  },
  additionalProperties: false,
};
