/**
 * Navigate to front end end sites 
 */
import Page from '../../../page';

export class FrontEndComponent extends Page {

    get overviewCSS() { return $("h1[class='text-2xl site-heading mb-0']"); }
    get addCustomDomainBtnXPATH() { return $("//a[text()='Add Custom Domain']"); }
    get getDomainsTextXPATH() { return $('//h1[text () = "Domains"]'); }


    /** Navigation to the overview page of the selected front end site
     * @returns : Text of the site name you selected
     */
    async overview() {
        await this.driver.awaitIsDisplayed(await this.overviewCSS);
        return await this.driver.textOf(await this.overviewCSS);
    }

    /**
     * @returns : Text of Add custom Domain button
     */
    async addCustomDomainBtn() {
        return await this.driver.awaitIsDisplayed(await this.addCustomDomainBtnXPATH);
    }

    /**
     * @returns : Text of Domains heading text
     */
    async getDomainsText() {
        await this.driver.awaitIsDisplayed(await this.getDomainsTextXPATH);
        return await this.driver.textOf(await this.getDomainsTextXPATH);
    }

    /**Navigate to Domains Tab using click() */
    async clickonAddCustDmnBtn() {
        await this.driver.click(await this.addCustomDomainBtnXPATH);
    }
}
