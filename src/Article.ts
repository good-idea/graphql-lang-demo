import { objectType, intArg, stringArg, booleanArg } from 'nexus'

import {
	mutateLangCtx,
	internationalizeField,
	internationalizeScalar,
} from './helpers'
import { Author, getAuthor } from './Author'
import articles from './articles'

/**
 * Article
 */

export const getArticle = (id: number, args: any, ctx: any) => {
	mutateLangCtx(ctx, args)
	return articles.find(a => a.id === id)
}

export const articleArgs = {
	id: intArg({
		required: true,
	}),
	lang: stringArg(),
	strict: booleanArg(),
}

export const FurtherReading = objectType({
	name: 'FurtherReading',
	definition(t) {
		internationalizeField(t, 'string', 'url', { nullable: true })
		internationalizeField(t, 'string', 'title', { nullable: true })
	},
})

export const Article = objectType({
	name: 'Article',
	description: 'An article with translations',
	// Resolve the plain property to the default language
	definition(t) {
		internationalizeField(t, 'string', 'title', { nullable: true })
		internationalizeField(t, 'string', 'body', { nullable: true })

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

export default Article
