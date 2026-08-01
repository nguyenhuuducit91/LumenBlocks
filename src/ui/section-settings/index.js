export const SectionSettings = props => {
	return <>
		<div className="lmb-global-settings__section-settings">
			<p className="lmb-global-settings__section-title">{ props.title }</p>
			{ props.description && <p>{ props.description }</p> }
			{ props.children }
		</div>
	</>
}
