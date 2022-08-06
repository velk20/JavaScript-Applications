export const inputValidator = (data) => {
    if (Object.values(data).some(input => input.trim() == '')) {
        return true;
    }

    return false;
}