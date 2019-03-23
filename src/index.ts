import { ApolloServer } from 'apollo-server'
import path from 'path'
import { objectType, makeSchema } from 'nexus'

import { Article, FurtherReading, articleArgs, getArticle } from './Article'
import { Author, getAuthor } from './Author'

/**
 * Root Query
 */

const Query = objectType({
	name: 'Query',
	definition(t) {
		t.field('article', {
			type: Article,
			nullable: true,
			args: articleArgs,
			resolve: (_, args, ctx) => getArticle(args.id, args, ctx),
		}),
			t.field('author', {
				type: Author,
				nullable: true,
				args: articleArgs,
				resolve: (_, args, ctx) => getAuthor(args.id, args, ctx),
			})
	},
})

const schema = makeSchema({
	types: [Query, Article, FurtherReading, Author],
	outputs: {
		schema: path.join(__dirname, '../intl-demo-schema.graphql'),
		typegen: path.join(__dirname, '../intl-demo-typegen.ts'),
	},
})

const context = {
	lang: 'en',
}

const server = new ApolloServer({
	schema,
	context,
	playground: true,
	debug: true,
	introspection: true,
})

const port = 4000

server.listen({ port }, () =>
	console.log(`Server is running at http://localhost:${port}`),
)
