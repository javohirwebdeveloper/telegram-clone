import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

// Avvalgi sessiyani tiklash
const stored = localStorage.getItem('pb_auth');
if (stored) {
  try {
    const { token, model } = JSON.parse(stored);
    pb.authStore.save(token, model);
  } catch (err) {
    console.error("Tokenni o'qishda xato:", err);
  }
}

// Token o‘zgarganda localStorage ni yangilash
pb.authStore.onChange((token, model) => {
  if (token && model) {
    localStorage.setItem('pb_auth', JSON.stringify({ token, model }));
  } else {
    localStorage.removeItem('pb_auth');
  }
});

export default pb;
