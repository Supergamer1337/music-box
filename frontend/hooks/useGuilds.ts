import { useQuery } from 'react-query'
import { MINUTE } from '../constants/time'
import { clientGetGuilds } from '../services/guildsService'
import GuildListObject from './../types/GuildListObject.d'

const useGuilds = () => {
    const { data, error } = useQuery<GuildListObject[]>(
        'guilds',
        clientGetGuilds,
        {
            staleTime: 1 * MINUTE
        }
    )

    return !error ? data : undefined
}

export default useGuilds
