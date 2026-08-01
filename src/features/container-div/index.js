import { addAttributes } from './attributes'
import { addStyles } from './style'
import { Edit } from './edit'

import classnames from 'classnames'
import { Div } from '~lumen/ui'
import { getUniqueBlockClass, useQueryLoopInstanceId } from '~lumen/utils'
import { useBlockAttributesContext } from '~lumen/hooks'
import { applyFilters } from '@wordpress/hooks'

export { deprecateContainerBackgroundColorOpacity, deprecateContainerShadowColor } from './deprecated'

export const ContainerDiv = props => {
	const attributes = useBlockAttributesContext( attributes => {
		return {
			uniqueId: attributes.uniqueId,
			hasContainer: attributes.hasContainer,
			triggerHoverState: attributes.triggerHoverState,
			containerBackgroundMediaUrl: attributes.containerBackgroundMediaUrl,
			containerBackgroundMediaUrlTablet: attributes.containerBackgroundMediaUrlTablet,
			containerBackgroundMediaUrlMobile: attributes.containerBackgroundMediaUrlMobile,
			containerBackgroundMediaExternalUrl: attributes.containerBackgroundMediaExternalUrl,
			containerBackgroundMediaExternalUrlTablet: attributes.containerBackgroundMediaExternalUrlTablet,
			containerBackgroundMediaExternalUrlMobile: attributes.containerBackgroundMediaExternalUrlMobile,
			containerBackgroundColorType: attributes.containerBackgroundColorType,
			containerColorScheme: attributes.containerColorScheme,
		}
	} )
	const instanceId = useQueryLoopInstanceId( attributes.uniqueId )
	let uniqueBlockClass = getUniqueBlockClass( attributes.uniqueId )
	uniqueBlockClass = instanceId ? uniqueBlockClass + `-${ instanceId }` : uniqueBlockClass
	const uniqueContainerClass = applyFilters( 'lumen.container-div.uniqueClass.edit', `${ uniqueBlockClass }-container`, uniqueBlockClass )

	const classNames = classnames( [
		props.className,
		'lmn-container',
		uniqueContainerClass,
	], {
		'lmn-hover-parent': attributes.hasContainer && attributes.triggerHoverState, // This is needed to trigger parent-hover hover styles.
		'lmn--no-background': ! attributes.hasContainer,
		'lmn--no-padding': ! attributes.hasContainer,
		[ `lmn--container-scheme--${ attributes.containerColorScheme }` ]: attributes.hasContainer && attributes.containerColorScheme,
	} )

	return <Div
		{ ...props }
		className={ classNames }
		hasBackground={ attributes.hasContainer }
		backgroundUrl={ attributes.containerBackgroundMediaUrl || attributes.containerBackgroundMediaExternalUrl }
		backgroundUrlTablet={ attributes.containerBackgroundMediaUrlTablet || attributes.containerBackgroundMediaExternalUrlTablet }
		backgroundUrlMobile={ attributes.containerBackgroundMediaUrlMobile || attributes.containerBackgroundMediaExternalUrlMobile }
		backgroundColorType={ attributes.containerBackgroundColorType }
	/>
}

ContainerDiv.defaultProps = {
	className: '',
}

ContainerDiv.Content = props => {
	const {
		attributes,
		...propsToPass
	} = props

	const uniqueContainerClass = applyFilters( 'lumen.container-div.uniqueClass.save', `lmn-${ attributes.uniqueId }-container`, `lmn-${ attributes.uniqueId }`, attributes )

	const classNames = classnames( [
		props.className,
		'lmn-container',
		uniqueContainerClass,
	], {
		'lmn-hover-parent': attributes.hasContainer && attributes.triggerHoverState, // This is needed to trigger parent-hover hover styles.
		'lmn--no-background': ! attributes.hasContainer,
		'lmn--no-padding': ! attributes.hasContainer,
		[ `lmn--container-scheme--${ attributes.containerColorScheme }` ]: attributes.hasContainer && attributes.containerColorScheme,
	} )

	return <Div.Content
		{ ...propsToPass }
		className={ classNames }
		hasBackground={ attributes.hasContainer }
		backgroundUrl={ attributes.containerBackgroundMediaUrl || attributes.containerBackgroundMediaExternalUrl }
		backgroundUrlTablet={ attributes.containerBackgroundMediaUrlTablet || attributes.containerBackgroundMediaExternalUrlTablet }
		backgroundUrlMobile={ attributes.containerBackgroundMediaUrlMobile || attributes.containerBackgroundMediaExternalUrlMobile }
		backgroundColorType={ attributes.containerBackgroundColorType }
	/>
}

ContainerDiv.Content.defaultProps = {
	className: '',
	attributes: {},
}

ContainerDiv.InspectorControls = Edit

ContainerDiv.addAttributes = addAttributes

ContainerDiv.addStyles = addStyles
