import type { UseFetchOptions } from '#app'
import { defu } from 'defu'

export default async function useCustomFetch<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
    const runtimeConfig = useRuntimeConfig()
    let authValue: Ref<string> = ref('')

    const authData: string = `${runtimeConfig.public.APILLON_API_KEY}:${runtimeConfig.public.APILLON_API_KEY_SECRET}`
    const base64 = (await useBase64(authData).promise.value)
    if (base64.length > 0) {
        authValue.value = stripBase64Type(base64);
    }

    const defaults: UseFetchOptions<T> = {
        baseURL: runtimeConfig.public.BASE_URL,
        headers: {
            Authorization: `Basic ${authValue.value}`
        }
    }

    const params = defu(options, defaults)
    return useFetch(url, params)
}
