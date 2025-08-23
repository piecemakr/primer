import { type SchemaTypeDefinition } from 'sanity';

import { metaType } from './singletons/metaType';
import { socialType } from './documents/socialType';
import { link } from './objects/link';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [metaType, socialType, link],
};
