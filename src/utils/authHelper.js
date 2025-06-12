export function logout() {
  localStorage.removeItem('jwtToken');
}