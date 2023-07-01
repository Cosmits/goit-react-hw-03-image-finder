const KEY = 'contacts';

export function saveLocalStorage(value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(KEY, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

export function loadLocalStorage() {
  try {
    const serializedState = localStorage.getItem(KEY);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

export function removeLocalStorage() {
  try {
    localStorage.removeItem(KEY);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}