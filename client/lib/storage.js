import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

const createNoopStorage = () => ({
  getItem: async () => null,
  setItem: async (_key, value) => value,
  removeItem: async () => {},
})

const isClient = typeof window !== 'undefined'
const storage = isClient ? createWebStorage('local') : createNoopStorage()

export default storage
