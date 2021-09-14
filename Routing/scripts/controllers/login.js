import { login } from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        loginForm: await this.load('./templates/login/loginForm.hbs')
    };
    this.partial('./templates/login/loginPage.hbs');
};

export async function loginPost() {

    try {
        const result = await login(this.params.username, this.params.password);
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
        }
        this.redirect('#/home');

    } catch (err) {
        console.error(err);
        alert(err.message);
    }

};