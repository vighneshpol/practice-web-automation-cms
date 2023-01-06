/**
 * Navigate to Add custom domain page
 */
import Page from '../../../page';

export class AddCustomDomain extends Page {

    get titleOfPageCSS() { return $('h1[class="text-2xl "]'); }
    get addCustomDomainCheckboxCSS() { return $("li[aria-label='Add custom domain']"); }
    get verifyOwnershipCheckboxCSS() { return $("li[aria-label='Verify ownership']"); }
    get connectionSummaryCheckboxCSS() { return $("li[aria-label='Connection summary']"); }
    get enterCustomDomainTextCSS() { return $("label[for='customDomain']"); }
    get domainNameTextFieldCSS() { return $("#customDomain"); }
    get cancelBtnCSS() { return $(".link-secondary"); }
    get nextBtnCSS() { return $("button[type='submit']"); }
    get connectionSummaryGreenCheckboxCSS() { return $("[class$=border-green-3]"); }
    get addCustDmnDscXPATH() { return $("//h1[@class='text-2xl ']/following-sibling::p"); }

    /**
      * @returns : Text of Title of page
      */
    async titleOfPage() {
        await this.driver.awaitIsDisplayed(await this.titleOfPageCSS);
        return await this.driver.textOf(await this.titleOfPageCSS);
    }

    /**
      * @returns : Text of left checkbox for add custom domain
      */
    async addCustomDomainCheckbox() {
        await this.driver.awaitIsDisplayed(await this.addCustomDomainCheckboxCSS);
        return await this.driver.textOf(await this.addCustomDomainCheckboxCSS);
    }

    /**
      * @returns : Text of middle checkbox for Verify ownership
      */
    async verifyOwnershipCheckbox() {
        await this.driver.awaitIsDisplayed(await this.verifyOwnershipCheckboxCSS);
        return await this.driver.textOf(await this.verifyOwnershipCheckboxCSS);
    }

    /**
      * @returns : Text of right checkbox for connetion summary
      */
    async connectionSummaryCheckbox() {
        await this.driver.awaitIsDisplayed(await this.connectionSummaryCheckboxCSS);
        return await this.driver.textOf(await this.connectionSummaryCheckboxCSS);
    }

    /**
      * @returns : Text of label of text field
      */
    async getEnterCustomDomainText() {
        await this.driver.awaitIsDisplayed(await this.enterCustomDomainTextCSS);
        return await this.driver.textOf(await this.enterCustomDomainTextCSS);
    }

    /**
      * Navigate to text field and enter domain name
      */
    async enterDomainName(domainName) {
        await this.driver.awaitIsDisplayed(await this.domainNameTextFieldCSS);
        await this.driver.type(domainName, await this.domainNameTextFieldCSS)
    }

    /**
      * Navigate to the next page
      */
    async clickOnNext() {
        await this.driver.click(await this.nextBtnCSS);
    }

    /**
      * click on cancel button
      */
    async clickOnCancel() {
        await this.driver.click(await this.cancelBtnCSS);
        return await this.driver.awaitIsDisplayed(await this.finalAddDmnBtnCSS);
    }

    /**
     * Navigate to next by providing valid domain
     * @returns : element is displayed or not
     */
    async navigatedToConnectionSumPg() {
        return await this.driver.awaitIsDisplayed(await this.connectionSummaryGreenCheckboxCSS);
    }

    /**
      * @returns : description paragraph text of domain
      */
    async getAddCustDmnDsc() {
        await this.driver.awaitIsDisplayed(await this.addCustDmnDscXPATH);
        return await this.driver.textOf(await this.addCustDmnDscXPATH);
    }
}