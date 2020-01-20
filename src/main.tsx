import renderer, { create, tsx } from '@dojo/framework/core/vdom';
import i18n from '@dojo/framework/core/middleware/i18n';
import { formatUnit } from '@dojo/framework/i18n/unit';
import bundle from './nls';

const factory = create({ i18n });

const App = factory(({ middleware: { i18n } }) => {
	const { messages, format } = i18n.localize(bundle);
	const noItems = format('items', { itemCount: 0 });
	const item = format('items', { itemCount: 1 });
	const items = format('items', { itemCount: 10 });

	// how can locale ever be optional?!
	const { locale } = i18n.get()!;
	// if locale is not passed here (and it's optional, it doesn't update with i18n.set()
	const unit = formatUnit(1000, 'meter', locale);

	return (
		<div>
			<div class="group">
				<button onclick={ () => i18n.set({ locale: 'fr' }) }>fr</button>
				<button onclick={ () => i18n.set({ locale: 'en' }) }>en</button>
				<button onclick={ () => i18n.set({ locale: 'en-GB' }) }>en-GB</button>
				<button onclick={ () => i18n.set({ locale: 'de' }) }>de</button>
			</div>
			<div class="group">
				<div class="group">
					<label>Basic message replacement:
						<div>{ messages.hello }</div>
						<div>{ messages.fallback }</div>
					</label>
				</div>
				<div class="group">
					<label>ICU with plurals:
						<div>{ noItems }</div>
						<div>{ item }</div>
						<div>{ items }</div>
					</label>
				</div>
				<div class="group">
					<label>Unit:
						<div>{ unit }</div>
					</label>
				</div>
			</div>
		</div>
	)
});

const r = renderer(() => <App />);
r.mount();
