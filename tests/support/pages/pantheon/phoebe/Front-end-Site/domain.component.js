/**
 * Components of add custom domain page 
 */
import Page from '../../../page';

export class DomainComponent extends Page {

    get finalAddDmnBtnCSS() { return $('a[class="link-primary"]'); }

    /**
     * Navigate to Add custom domain page
     */
    async finalAddDmnBtn() {
        await this.driver.awaitIsDisplayed(await this.finalAddDmnBtnCSS);
        await this.driver.click(await this.finalAddDmnBtnCSS);
    }
}