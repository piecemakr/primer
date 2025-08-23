import { CogIcon, TagIcon, UserIcon } from '@sanity/icons';
import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() && !['metadata', 'social'].includes(item.getId()!)
      ),

      S.divider(),

      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Site Settings')
            .items([
              S.listItem()
                .title('SEO Settings')
                .id('metadata')
                .icon(CogIcon)
                .child(
                  S.document()
                    .schemaType('metadata')
                    .documentId('metadata')
                    .title('Metadata & SEO Settings')
                ),
              S.documentTypeListItem('social').title('Social Media Links'),
            ])
        ),
    ]);
