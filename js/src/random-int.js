/*
 * min is INCLUSIVE
 * max is EXCLUSIVE
 */
export default function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}