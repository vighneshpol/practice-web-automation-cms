/**
 * Navigate to Left menubar tab for Phoebe Dashboard
 */
import Page from '../../page';

export class LeftMenubarComponent extends Page {
    get runtimePATH() { return $(this.runtimeSelect["updateSelector"]); }
    runtimeSelect = {
        'updateSelector': '',
    };
    get frontendSitesTabCSS() { return $("button[data-qa-id='workspace-decoupled-sites-tab']"); }
    get frontendFrameworkFilterXPATH() { return $('//p[text () = "Front-End Framework"]'); }

    async navigateTo(text) {
        const page = {
            'Home': 'Home',
            'Sites': 'Sites',
            'Team': 'Documentation',
            'Autopilot': 'Autopilot',
            'Settings': 'Settings',
        };
        this.runtimeSelect['updateSelector'] = `//div[text()='${page[text]}']`;
        await this.driver.awaitIsDisplayed(this.runtimePATH);
        await this.driver.isDisplayed(this.runtimePATH);
        await this.driver.click(this.runtimePATH);
    };
    /**Navigate to Front end sites Tab using click() */

    async navigateToFrontendSites() {
        await this.driver.awaitIsDisplayed(await this.frontendSitesTabCSS);
        await this.driver.click(await this.frontendSitesTabCSS);
    }

/** To check we had switched tab to front-end site
 * @return : Front end Framework text present in filter by box
 */
    async getFrontendFrameworkFilter() {
        await this.driver.awaitIsDisplayed(await this.frontendFrameworkFilterXPATH);
        return await this.driver.textOf(await this.frontendFrameworkFilterXPATH);
    }

/** Navigation to the site 
 * @param {*} siteName : Name of your site
 */
    async navigatetoSelectedSite(siteName) {
        this.runtimeSelect['updateSelector'] = `//a[text () ='${siteName}']`;
        await this.driver.awaitIsDisplayed(await this.runtimePATH);
        await this.driver.click(await this.runtimePATH);
    }
}
