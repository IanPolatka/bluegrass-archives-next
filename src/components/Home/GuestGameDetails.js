import Link from 'next/link'
import Image from 'next/image'

export default function GuestGameDetails({game}) {
    return (
        <div className="p-4 space-y-2 font-semibold transition duration-150 ease-in border border-gray-300 rounded-md shadow">
            <div>
                {game.is_winner_set === 'set' &&
                    <div className="text-xs text-right uppercase">Final</div>
                }
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className={game.away_team_color ? `bg-${game.away_team_color}-600/10 h-[48px] w-[48px] rounded-full p-2` : 'bg-gray-600/10 h-[48px] w-[48px] rounded-full p-2'}>
                            {!game.away_team_logo.includes('tba.png') &&
                                <Link href={`/football/${game.away_team_slug}/${game.school_year}`}>
                                    <Image
                                        src={`${game.away_team_logo}`}
                                        height={60}
                                        width={60}
                                        alt={`${game.away_team_name}`}
                                        title={`${game.away_team_name}`}
                                    />
                                </Link>
                            }
                        </div>
                        <div>
                            <Link href={`/football/${game.away_team_slug}/${game.school_year}`} className={game.losing_team_slug === game.away_team_slug ? 'text-gray-500' : 'text-black'}>
                                <span className='font-semibold'>{game.away_team_name}</span>
                            </Link>
                            <div className="text-xs text-gray-500">{game.away_team_mascot}</div>
                        </div>
                    </div>
                    <div className="text-xl font-semibold">
                        {game.away_team_final_score ?
                            <div className={game.losing_team_slug === game.away_team_slug ? 'text-gray-500' : 'text-black'}>{game.away_team_final_score}</div>
                        :
                            <div>-</div>
                        }
                    </div>
                </div>
            </div>
            <div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className={game.home_team_color ? `bg-${game.home_team_color}-600/10 h-[48px] w-[48px] rounded-full p-2` : 'bg-gray-600/10 h-[48px] w-[48px] rounded-full p-2'}>
                            {!game.home_team_logo.includes('tba.png') &&
                                <Link href={`/football/${game.home_team_slug}/${game.school_year}`}>
                                    <Image
                                        src={`${game.home_team_logo}`}
                                        height={60}
                                        width={60}
                                        alt={`${game.home_team_name}`}
                                        title={`${game.home_team_name}`}
                                    />
                                </Link>
                            }
                        </div>
                        <div>
                            <Link href={`/football/${game.home_team_slug}/${game.school_year}`} className={game.losing_team_slug === game.home_team_slug ? 'text-gray-500' : 'text-black'}>
                                <span className='font-semibold'>{game.home_team_name}</span>
                            </Link>
                            <div className="text-xs text-gray-500">{game.home_team_mascot}</div>
                        </div>
                    </div>
                    <div className="text-xl font-semibold">
                        {game.home_team_final_score ?
                            <div className={game.losing_team_slug === game.home_team_slug ? 'text-gray-500' : 'text-black'}>{game.home_team_final_score}</div>
                        :
                            <div>-</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}