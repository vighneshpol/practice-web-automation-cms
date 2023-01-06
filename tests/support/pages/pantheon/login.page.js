import Page from "../page";
import { LoginPage } from "./login/loginPage.component"

class Login extends Page {
    constructor() {
        super();
        this.loginPage = new LoginPage();
    }

    async open() {
        await super.open('/login');
    }
}
export default new Login;
