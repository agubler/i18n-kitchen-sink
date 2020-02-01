import renderer, { create, tsx, invalidator } from "@dojo/framework/core/vdom";
import WidgetBase from "@dojo/framework/core/WidgetBase";
import I18nMixin from "@dojo/framework/core/mixins/I18n";
import i18n from "@dojo/framework/core/middleware/i18n";
import icache from "@dojo/framework/core/middleware/icache";
import { formatUnit } from "@dojo/framework/i18n/unit";
import bundle from "./nls";

const factory = create({ i18n, icache, invalidator });

class I18nClassWidget extends I18nMixin(WidgetBase) {
  protected render() {
    const { messages, format, isPlaceholder } = this.localizeBundle(bundle);
    const noItems = format("items", { itemCount: 0 });
    const item = format("items", { itemCount: 1 });
    const items = format("items", { itemCount: 10 });
    const unit = formatUnit(1000, "meter", this.properties.locale);
    return (
      <div>
        <div class="group">
          <label>
            Locale:
            <span> </span>
            <span styles={{ fontWeight: "bold" }}>
              {this.properties.locale}
            </span>
          </label>
        </div>
        <div class="group">
          <label>
            Is PlaceHolder:
            <span>{` ${isPlaceholder}`}</span>
          </label>
        </div>
        <div class="group">
          <label>
            Basic message replacement:
            <div>{messages.hello}</div>
            <div>{messages.fallback}</div>
          </label>
        </div>
        <div class="group">
          <label>
            ICU with plurals:
            <div>{noItems}</div>
            <div>{item}</div>
            <div>{items}</div>
          </label>
        </div>
        <div class="group">
          <label>
            Unit:
            <div>{unit}</div>
          </label>
        </div>
      </div>
    );
  }
}

const I18nWidget = factory(function I18nWidget({
  properties,
  middleware: { i18n }
}) {
  const { messages, format, isPlaceholder } = i18n.localize(bundle);
  const noItems = format("items", { itemCount: 0 });
  const item = format("items", { itemCount: 1 });
  const items = format("items", { itemCount: 10 });
  const unit = formatUnit(1000, "meter", properties().locale);
  return (
    <div>
      <div class="group">
        <label>
          Locale:
          <span> </span>
          <span styles={{ fontWeight: "bold" }}>{properties().locale}</span>
        </label>
      </div>
      <div class="group">
        <label>
          Is PlaceHolder:
          <span>{` ${isPlaceholder}`}</span>
        </label>
      </div>
      <div class="group">
        <label>
          Basic message replacement:
          <div>{messages.hello}</div>
          <div>{messages.fallback}</div>
        </label>
      </div>
      <div class="group">
        <label>
          ICU with plurals:
          <div>{noItems}</div>
          <div>{item}</div>
          <div>{items}</div>
        </label>
      </div>
      <div class="group">
        <label>
          Unit:
          <div>{unit}</div>
        </label>
      </div>
    </div>
  );
});

const App = factory(({ middleware: { i18n, icache, invalidator } }) => {
  const l = icache.get<string | undefined>("locale");
  const l1 = icache.get<string | undefined>("locale1");
  const l2 = icache.get<string | undefined>("locale2");

  return (
    <div class="container">
      <div class="item">
        <div class="group">
          <h2>Global Set</h2>
          <button onclick={() => i18n.set({ locale: "fr" })}>fr</button>
          <button onclick={() => i18n.set({ locale: "en" })}>en</button>
          <button onclick={() => i18n.set({ locale: "en-GB" })}>en-GB</button>
          <button onclick={() => i18n.set({ locale: "de" })}>de</button>
          <button onclick={() => i18n.set({ locale: "ja" })}>ja</button>
          <button onclick={() => i18n.set({ locale: "ar" })}>ar</button>
        </div>
        <h2 styles={{ margin: "0" }}>Global</h2>
        <div class="container">
          <I18nWidget />
          <I18nWidget />
          <I18nClassWidget />
        </div>
      </div>
      <div class="item">
        <div class="group">
          <h2>Local Set</h2>
          <button onclick={() => icache.set("locale", "fr")}>fr</button>
          <button onclick={() => icache.set("locale", "en")}>en</button>
          <button onclick={() => icache.set("locale", "en-GB")}>en-GB</button>
          <button onclick={() => icache.set("locale", "de")}>de</button>
          <button onclick={() => icache.set("locale", "ja")}>ja</button>
          <button
            onclick={() => {
              icache.delete("locale");
              invalidator();
            }}
          >
            clear
          </button>
        </div>
        <div class="group">
          <h2 styles={{ margin: "0" }}>Local One</h2>
          <div>
            <I18nWidget locale={l} />
          </div>
        </div>
      </div>
      <div class="item">
        <div class="group">
          <h2>Local Set</h2>
          <button onclick={() => icache.set("locale1", "fr")}>fr</button>
          <button onclick={() => icache.set("locale1", "en")}>en</button>
          <button onclick={() => icache.set("locale1", "en-GB")}>en-GB</button>
          <button onclick={() => icache.set("locale1", "de")}>de</button>
          <button onclick={() => icache.set("locale1", "ja")}>ja</button>
          <button
            onclick={() => {
              icache.delete("locale1");
              invalidator();
            }}
          >
            clear
          </button>
        </div>
        <div class="group">
          <h2 styles={{ margin: "0" }}>Local Two</h2>
          <I18nWidget locale={l1} />
        </div>
      </div>
      <div class="item">
        <div class="group">
          <h2>Local Set</h2>
          <button onclick={() => icache.set("locale2", "fr")}>fr</button>
          <button onclick={() => icache.set("locale2", "en")}>en</button>
          <button onclick={() => icache.set("locale2", "en-GB")}>en-GB</button>
          <button onclick={() => icache.set("locale2", "de")}>de</button>
          <button onclick={() => icache.set("locale2", "ja")}>ja</button>
          <button
            onclick={() => {
              icache.delete("locale2");
              invalidator();
            }}
          >
            clear
          </button>
        </div>
        <div class="group">
          <h2 styles={{ margin: "0" }}>Local Three (mixin)</h2>
          <I18nClassWidget locale={l2} />
        </div>
      </div>
    </div>
  );
});

const r = renderer(() => <App />);
r.mount();
