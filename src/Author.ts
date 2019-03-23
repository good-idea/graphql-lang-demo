import { objectType } from 'nexus'

import authors from './authors'
import articles from './articles'
import Article from './Article'
import { mutateLangCtx, internationalizeField } from './helpers'

/**
 * Author
 */

export const getAuthor = (id: number, args: any, ctx: any) => {
	mutateLangCtx(ctx, args)
	return authors.find(a => a.id === id)
}

const getAuthorArticles = (id: number, args: any, ctx: any) => {
	mutateLangCtx(ctx, args)
	return articles.find(a => a.id === id)
}

export const Author = objectType({
	name: 'Author',
	definition(t) {
		t.int('id')
		t.string('name', { nullable: true })
		internationalizeField(t, 'string', 'bio', { nullable: true })
		t.field('articles', {
			type: Article,
			list: [false],
			nullable: true,
			resolve: (author, { lang }, ctx) => getAuthorArticles(author, lang, ctx),
		})
	},
})
