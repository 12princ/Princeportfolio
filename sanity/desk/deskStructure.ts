import { StructureBuilder } from 'sanity/desk';
import { FaUser, FaBriefcase, FaCode, FaNewspaper, FaEnvelope } from 'react-icons/fa';

export const deskStructure = (S: StructureBuilder) => 
  S.list()
    .title('Content')
    .items([
      // About - Single document
      S.listItem()
        .title('About')
        .icon(FaUser)
        .child(
          S.document()
            .schemaType('about')
            .documentId('about')
        ),
      
      // Contact - Single document
      S.listItem()
        .title('Contact Information')
        .icon(FaEnvelope)
        .child(
          S.document()
            .schemaType('contact')
            .documentId('contact')
        ),
      
      // Projects
      S.listItem()
        .title('Projects')
        .icon(FaCode)
        .child(
          S.list()
            .title('Projects')
            .items([
              S.listItem()
                .title('All Projects')
                .child(
                  S.documentList()
                    .title('All Projects')
                    .filter('_type == "project"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('Projects by Category')
                .child(
                  S.documentList()
                    .title('Projects by Category')
                    .filter('_type == "project"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('Featured Projects')
                .child(
                  S.documentList()
                    .title('Featured Projects')
                    .filter('_type == "project" && featured == true')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                ),
            ])
        ),
      
      // Services
      S.listItem()
        .title('Services')
        .icon(FaBriefcase)
        .child(
          S.documentList()
            .title('Services')
            .filter('_type == "service"')
            .defaultOrdering([{field: 'order', direction: 'asc'}])
        ),
      
      // Blog
      S.listItem()
        .title('Blog')
        .icon(FaNewspaper)
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('All Posts')
                .child(
                  S.documentList()
                    .title('All Posts')
                    .filter('_type == "post"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('Posts by Author')
                .child(
                  S.documentTypeList('author')
                    .title('Authors')
                ),
              S.divider(),
              S.listItem()
                .title('Authors')
                .child(
                  S.documentList()
                    .title('Authors')
                    .filter('_type == "author"')
                ),
            ])
        ),
      
      // Divider
      S.divider(),
      
      // Unfiltered document types for those that don't fit into the above categories
      ...S.documentTypeListItems()
        .filter(listItem => ![
          'about', 
          'contact', 
          'project', 
          'service', 
          'post',
          'author'
        ].includes(listItem.getId() || ''))
    ]); 