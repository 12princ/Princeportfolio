import { SchemaTypeDefinition } from 'sanity';
import post from '../schemas/post';
import author from '../schemas/author';
import project from '../schemas/project';
import service from '../schemas/service';
import about from '../schemas/about';
import contact from '../schemas/contact';
import { objects } from '../schemas/objects';

export const schema = {
  types: [...objects, post, author, project, service, about, contact] as SchemaTypeDefinition[],
}; 