import { type SchemaTypeDefinition } from 'sanity';

import { metaType } from './singletons/metaType';
import { socialType } from './documents/socialType';
import { teamType } from './documents/teamType';
import { link } from './objects/link';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [metaType, socialType, teamType, link],
};
