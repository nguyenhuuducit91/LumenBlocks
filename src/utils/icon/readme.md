# Icon Utility / Helper Functions

A set of helper functions for an easier implementation of Icon options in blocks.

# Attribute List Helper

Adds the required Icon attributes:

```js
import { createIconAttributes } from '@lumen/util'

const attributes = {
	// Creates the attributes icon1Color, icon1BackgroundShape, ...
	...createIconAttributes( 'icon1%s' ),
}
```

This is the same as doing:

```js
const attributes = {
	icon1Color = '',
	icon1BackgroundShape = '',
	// and more...
}
```

# Icon Styles Helper

Adds the Icon styles from the Icon attributes:

```js
import { createIconStyles } from '@lumen/util'

export const createStyles = props => {
	return {
		'.lmb-card__icon1': {
			...createIconStyles( 'icon1%s', '', props.attributes ),
		},
		'.lmb-card__icon1:before': {
			...createIconStyles( 'icon1%s', 'before', props.attributes ),
		}
	}
```

This is the same as doing:

```js
export const createStyles = props => {
	return {
		'.lmb-card__icon1': {
			backgroundColor: props.attributes.icon1BackgroundColor !== '' ? props.attributes.icon1BackgroundColor : undefined,
			color: props.attributes.icon1TextColor !== '' ? props.attributes.icon1TextColor : undefined,
			// and more...
		}
	}
```
