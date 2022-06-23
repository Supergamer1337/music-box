import { useQuery } from 'react-query'
import { MINUTE } from '../constants/time'
import { clientGetGuilds } from '../services/guildsService'
import GuildListObject from './../types/GuildListObject.d'

/**
 * Hook to get the user's guilds.
 *
 * @returns The user's guilds.
 */
const useGuilds = () => {
    const { data, error } = useQuery<GuildListObject[]>(
        'guilds',
        clientGetGuilds,
        {
            staleTime: 1 * MINUTE
        }
    )

    return error ? undefined : data
}

export default useGuilds
