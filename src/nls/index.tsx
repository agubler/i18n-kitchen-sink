const locales = {
	'en': () => import('./en'),
	'en-GB': () => import('./en-gb'),
	'de': () => import('./de')
}

const messages = {
	'hello': 'bonjour',
	'fallback': 'repli fr',
	'items': `You have {itemCount, plural,
		=0 {no items}
		=1 {# item}
		other {# items}
		}.`
}


export default { messages, locales }
