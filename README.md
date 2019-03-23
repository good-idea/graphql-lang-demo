## GraphQL Internationalization demo

Just a way to explore what a schema of translated content could look like.

Playground: https://lang-demo.good-idea.now.sh/

_**Note:** This implementation could be a start but is a very rough draft. For instance, it mutates the GraphQL context in a nasty way as different languages are queried._

### Features:

**Generate translated fields based on available translations.**

```graphql
type Article {
	author: Author!
	title: String!
}
```

becomes 👇

```graphql
type Article {
	author: Author!
	title: String! # 👉 Falls back to current language
	title_en: String
	title_es: String
	title_translations: [String]! # 👉 '['en', 'es']
}
```

**Provide a `lang: 'es'` argument on a scalar to set the language or all child nodes**

```graphql
query {
   Article(lang: 'es') {
      title	# 👉 'Cómo localicé mi esquema GraphQL'
      author {
         bio # 👉 'Joseph vive en Los Angeles'
      }
   }
}
```

_No language (falls back to defaults):_

```graphql
query {
	Article {
		title # 👉 'How I localized my GraphQL Schema'
		author {
			bio # 👉 'Joseph lives in Los Angeles'
		}
	}
}
```

**Fields fall back to default (or parent) language**

```graphql
query {
   Article(lang: 'de') {
      title: # 👉 'How I localized my GraphQL Schema'
   }
}
```

**Or, Provide a `strict: true` argument on a scalar to prevent resolving to the default translation:**

```graphql
query {
   Article(lang: 'de', strict: true) {
      title:  # 👉 null
   }
}
```

---

A full query that demonstrates all of the above:

```graphql
{
	article(id: 1) {
		title

		# Available translations
		title_translations

		# Specific translations
		title_en
		title_es
		title_de

		author {
			name
			bio
		}

		furtherReading {
			title
			url
		}

		# Querying for a different language on scalars
		furtherReadingES: furtherReading(lang: "es", strict: true) {
			title
			url
		}
	}

	articleES: article(id: 1, lang: "es") {
		title

		# Uses parent language ("es")
		author {
			name
			bio
		}

		# Uses parent language ("es")
		furtherReading {
			title
			url
		}
	}

	# Non-strict, title will return with English translation
	articleDE: article(id: 1, lang: "de") {
		title
	}

	# Strict, title will return `null`
	articleDEStrict: article(id: 1, lang: "de", strict: true) {
		title
	}
}
```
