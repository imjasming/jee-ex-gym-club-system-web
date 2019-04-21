
export const setStore = (key, value) => {
  if (!key) return;
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }

  window.localStorage.setItem(key, value)
}

export const getStore = (key) => {
  if (!key) return;
  return window.localStorage.getItem(key)
}

export const removeStore = (key) => {
  if (!key) return;
  window.localStorage.removeItem(key)
}
