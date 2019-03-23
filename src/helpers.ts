/**
 * Translation Helpers
 */

const translations = ['en', 'es', 'de']
const defaultTranslation = 'en'

export const mutateLangCtx = (ctx, args) => {
	if (args.lang) ctx.lang = args.lang
	ctx.strict = args.strict
}

export const internationalizeField = (t, fieldType, title, opts) => {
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

export const internationalizeScalar = relationshipKey => (
	parent,
	args,
	ctx,
) => {
	mutateLangCtx(ctx, args)
	return parent[relationshipKey]
}
