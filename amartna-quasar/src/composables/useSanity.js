import { ref } from 'vue'
import { client } from '../boot/sanity'

export function useSanity() {
  const loading = ref(false)
  const error = ref(null)

  async function fetch(query, params = {}) {
    loading.value = true
    error.value = null
    try {
      const data = await client.fetch(query, params)
      return data
    } catch (err) {
      error.value = err.message
      return []
    } finally {
      loading.value = false
    }
  }

  async function create(type, doc) {
    try {
      return await client.create({ _type: type, ...doc })
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  async function createOrReplace(doc) {
    try {
      return await client.createOrReplace(doc)
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  async function remove(id) {
    try {
      return await client.delete(id)
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  return { loading, error, fetch, create, createOrReplace, remove }
}
