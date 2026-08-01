With Click Open Inspector
=========================

Usage:
```js
withClickOpenInspector( [
	// [ 'selector that will match the clicked element', 'panelId' ],
	[ '.lmb-cta__title', 'title' ],
	[ '.lmb-cta__description', 'description' ],
	[ '.lmb-button', 'button' ],
] )
```

Make sure that Panels have the class `lmb-panel--${ panelId }`.

You can also use
```js
<PanelAdvancedSettings
	title={ __( 'Title', i18n ) }
	id="title"
	// ...
/>
```
