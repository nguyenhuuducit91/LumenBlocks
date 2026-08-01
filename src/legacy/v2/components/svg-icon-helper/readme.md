# SVG Icon Helper

Use the helper functions in `@lumen/util/icon` in conjuction with this.

Adds the `SVGIcon` in a quicker way:

```js
import { SVGIconHelper } from '@lumen/components'

const edit = props {
	return (
		// Creates a SVG Icon for all the required attributes.
		<SVGIconHelper
			value={ props.icon1 }
			attrNameTemplate="icon%s"
			blockAttributes={ props.attributes }
		/>
	)
}
```

This is the same as doing:

```js
import { SVGIcon } from '@lumen/components'

const edit = props {
	return (
		<SVGIcon
			value={ props.attributes.icon1 }
			design={ props.attributes.iconDesign }
			// and more...
		/>
	)
}
```
