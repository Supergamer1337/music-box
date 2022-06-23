import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { MINUTE } from '../constants/time'
import { clientGetGuildData } from '../services/guildsService'

/**
 * Hook to get the guild data.
 *
 * @returns The current guild data.
 */
const useGuildData = () => {
    const router = useRouter()
    const { guildId } = router.query
    const { data, error } = useQuery(
        'guildData',
        () => clientGetGuildData(guildId as string),
        {
            staleTime: 1 * MINUTE,
            enabled: !!guildId
        }
    )

    return error ? undefined : data
}

export default useGuildData
