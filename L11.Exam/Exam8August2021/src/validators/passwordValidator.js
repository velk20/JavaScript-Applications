export const passwordValidator = (pass, confirmPass) => {
    return pass.trim() == confirmPass.trim();
}