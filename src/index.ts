const { ApolloServer } = require('apollo-server')
const path = require('path')
const {
	objectType,
	makeSchema,
	intArg,
	stringArg,
	booleanArg,
} = require('nexus')

/**
 * Translation Helpers
 */

const translations = ['en', 'es', 'de']
const defaultTranslation = 'en'

const articles = require('./articles.json')
const authors = require('./authors.json')

const mutateLangCtx = (ctx, args) => {
	if (args.lang) ctx.lang = args.lang
	ctx.strict = args.strict
}

const internationalizeField = (t, fieldType, title, opts) => {
	const fieldBuilder = t[fieldType].bind(t)
	fieldBuilder(title, {
		nullable: true,
		resolve: (parent, _, ctx, info) => {
			return (
				parent[title][ctx.lang] ||
				(ctx.strict !== true && parent[title][defaultTranslation]) ||
				null
			)
		},
	})

	t.string(`${title}_translations`, {
		list: [false],
		resolve: entity =>
			translations
				.map(translation => (entity[title][translation] ? translation : null))
				.filter(Boolean),
	})

	translations.forEach(function(translation) {
		fieldBuilder(`${title}_${translation}`, {
			...opts,
			resolve: entity => entity[title][translation] || null,
		})
	})
}

/**
 * Author
 */

const getAuthor = (id: number, args: any, ctx: any) => {
	mutateLangCtx(ctx, args)
	return authors.find(a => a.id === id)
}

const getAuthorArticles = (id: number, args: any, ctx: any) => {
	mutateLangCtx(ctx, args)
	return articles.find(a => a.id === id)
}

const Author = objectType({
	name: 'Author',
	definition(t) {
		t.int('id')
		t.string('name', { nullable: true })
		t.field('articles', {
			type: Article,
			list: [false],
			nullable: true,
			resolve: (author, { lang }, ctx) => getAuthorArticles(author, lang, ctx),
		})
	},
})

/**
 * Article
 */

const getArticle = (id: number, args: any, ctx: any) => {
	mutateLangCtx(ctx, args)
	return articles.find(a => a.id === id)
}

const articleArgs = {
	id: intArg({
		required: true,
	}),
	lang: stringArg(),
}

const FurtherReading = objectType({
	name: 'FurtherReading',
	definition(t) {
		internationalizeField(t, 'string', 'url', { nullable: true })
		internationalizeField(t, 'string', 'title', { nullable: true })
	},
})

const internationalizeScalar = relationshipKey => (parent, args, ctx, info) => {
	mutateLangCtx(ctx, args)
	return parent[relationshipKey]
}

const Article = objectType({
	name: 'Article',
	description: 'An article with translations',
	// Resolve the plain property to the default language
	definition(t) {
		internationalizeField(t, 'string', 'title', { nullable: true })
		internationalizeField(t, 'string', 'body', { nullable: true })

		// internationalizeScalar(t, "furtherReading", { type: FurtherReading, list: [false], args: { lang: stringArg() }})

		t.field('furtherReading', {
			type: FurtherReading,
			list: [false],
			args: {
				lang: stringArg(),
				strict: booleanArg(),
			},
			resolve: internationalizeScalar('furtherReading'),
		})

		t.field('author', {
			type: Author,
			resolve: (article, args, ctx) => getAuthor(article.author, args, ctx),
		})
	},
})

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
})

const port = 4000

server.listen({ port }, () =>
	console.log(`Server is running at http://localhost:${port}`),
)
