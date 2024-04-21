import useSWR from 'swr'
import { BASE_URL } from '../../api'
import Cookies from 'js-cookie'

const token = Cookies.get('token')

const myHeaders = new Headers()

const requestOptions: any = {
  token,
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
}

const fetcher = (url: string) => fetch(url, requestOptions).then((res) => res.json())

export const useSampleClients = (route) => {
  const { data, error } = useSWR(`${BASE_URL}/${route}`, fetcher)

  return {
    clients: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}

export const useSampleClientsId = (route, id) => {
  const { data, error } = useSWR(`${BASE_URL}/${route}/${id}`, fetcher)

  return {
    clients: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}
