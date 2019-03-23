/**
 * This file was automatically generated by Nexus 0.11.5
 * Do not make changes to this file directly
 */




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenRootTypes {
  Article: {};
  Author: { // root type
    id: number; // Int!
    name?: string | null; // String
  }
  FurtherReading: {};
  Query: {};
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
}

export interface NexusGenFieldTypes {
  Article: { // field return type
    author: NexusGenRootTypes['Author']; // Author!
    body: string | null; // String
    body_de: string | null; // String
    body_en: string | null; // String
    body_es: string | null; // String
    body_translations: Array<string | null>; // [String]!
    furtherReading: Array<NexusGenRootTypes['FurtherReading'] | null>; // [FurtherReading]!
    title: string | null; // String
    title_de: string | null; // String
    title_en: string | null; // String
    title_es: string | null; // String
    title_translations: Array<string | null>; // [String]!
  }
  Author: { // field return type
    articles: Array<NexusGenRootTypes['Article'] | null> | null; // [Article]
    bio: string | null; // String
    bio_de: string | null; // String
    bio_en: string | null; // String
    bio_es: string | null; // String
    bio_translations: Array<string | null>; // [String]!
    id: number; // Int!
    name: string | null; // String
  }
  FurtherReading: { // field return type
    title: string | null; // String
    title_de: string | null; // String
    title_en: string | null; // String
    title_es: string | null; // String
    title_translations: Array<string | null>; // [String]!
    url: string | null; // String
    url_de: string | null; // String
    url_en: string | null; // String
    url_es: string | null; // String
    url_translations: Array<string | null>; // [String]!
  }
  Query: { // field return type
    article: NexusGenRootTypes['Article'] | null; // Article
    author: NexusGenRootTypes['Author'] | null; // Author
  }
}

export interface NexusGenArgTypes {
  Article: {
    furtherReading: { // args
      lang?: string | null; // String
      strict?: boolean | null; // Boolean
    }
  }
  Query: {
    article: { // args
      id: number; // Int!
      lang?: string | null; // String
      strict?: boolean | null; // Boolean
    }
    author: { // args
      id: number; // Int!
      lang?: string | null; // String
      strict?: boolean | null; // Boolean
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Article" | "Author" | "FurtherReading" | "Query";

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}