export const inputValidator = (data) => {
    if (Object.values(data).some(x => x == '')) {
        return false;
    }

    return true;
}