

export function generateCode(num) {
    if (num < 1) num = 5

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';

    for (let i = 0; i < num; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }

    return result;

}

export const log = (err, msg) => {
    if (err) {
        console.error("Server error:", err.message);
    } else {
        console.log(msg);
    }
}
