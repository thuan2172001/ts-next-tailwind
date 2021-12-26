const EXP = 30 * 24 * 60 * 60;
const ALLOWED_IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
const ALLOWED_IMAGE_SIZE = 30;
const API_BASE_URL = process.env.API_BASE_URL || '';

export { ALLOWED_IMAGE_SIZE, ALLOWED_IMAGE_TYPES, API_BASE_URL, EXP };
