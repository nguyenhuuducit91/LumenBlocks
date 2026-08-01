import { test, expect } from 'e2e/test-utils'

test( 'Activating Lumen should redirect to the Getting Started Page', async ( {
	page,
	admin,
} ) => {
	await admin.visitAdminPage( 'plugins.php' )

	const plugin = page.locator( `[data-plugin="${ process.env.LUMEN_SLUG }.php"]` )
	// Deactivate Lumen
	const deactivate = plugin.getByLabel( 'Deactivate Lumen -' )
	await expect( deactivate ).toBeVisible()
	await deactivate.click()

	// Activate Lumen
	const activate = plugin.getByLabel( 'Activate Lumen -' )
	await expect( activate ).toBeVisible()
	await activate.click()

	try {
		await expect( page ).toHaveURL( /lumen/ )
		await expect( page.getByText( 'Welcome to Lumen' ) ).toBeVisible()
	} catch {
		await expect( page ).toHaveURL( /page=lumen/ )
		await expect( page.getByRole( 'link', { name: 'Activate Free Version' } ) ).toBeVisible()
		await page.getByRole( 'link', { name: 'Activate Free Version' } ).click()
		await page.getByRole( 'link', { name: 'Skip', exact: true } ).click()
		await expect( page ).toHaveURL( /lumen/ )
		await expect( page.getByText( 'Welcome to Lumen' ) ).toBeVisible()
	}
} )

test( 'Lumen settings should be saved', async ( {
	page,
	admin,
	lumen,
} ) => {
	// Start waiting for Lumen Settings JSON Response before visiting the page
	let settings = lumen.waitForSettings()

	await admin.visitAdminPage( 'admin.php?page=lumen-settings' )
	// Make sure all Lumen settings are loaded
	await settings

	// There should be no PHP errors
	const pageError = await admin.getPageError()
	expect( pageError ).toBeNull()

	// Retrieves the value of the first option, toggles it and check if the value changed
	const option = page.locator( '.lmb-admin-toggle-setting' ).first().getByRole( 'switch' )
	const val = await option.getAttribute( 'aria-checked' )

	await option.click()
	const newVal = await option.getAttribute( 'aria-checked' )

	expect( newVal ).not.toBe( val )
	let saveSettings = lumen.waitForSettingsSave()
	await page.getByRole( 'button', { name: 'Save Changes' } ).click()
	await saveSettings

	// Check if the value is correct after reloading
	settings = lumen.waitForSettings()
	await page.reload()
	await settings

	const _option = page.locator( '.lmb-admin-toggle-setting' ).first().getByRole( 'switch' )

	await expect( _option ).toHaveAttribute( 'aria-checked', newVal )

	// Revert back the settings to the original value
	await _option.click()
	saveSettings = lumen.waitForSettingsSave()
	await page.getByRole( 'button', { name: 'Save Changes' } ).click()
	await saveSettings
	await expect( _option ).toHaveAttribute( 'aria-checked', val )
} )
