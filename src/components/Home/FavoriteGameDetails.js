import Link from 'next/link'
import Image from 'next/image'

export default function FavoriteGameDetails({game}) {
    return (
        <div className={`p-4 space-y-2 font-semibold border-[1px] rounded-md ${game.user_favorited_away_team === 1 || game.user_favorited_home_team === 1 ? 'border-green-600 bg-green-50/50' : 'border-gray-300'}`}>
            <div>
                {game.is_winner_set == 'set' &&
                    <div className="text-xs text-right uppercase">Final</div>}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className={`h-[48px] w-[48px] bg-${game.away_team_color}-600/10 rounded-full p-2`}>
                                <Image
                                    src={`${game.away_team_logo}`}
                                    height={60}
                                    width={60}
                                    alt={`${game.away_team_name}`}
                                    title={`${game.away_team_name}`}
                                />
                            </div>
                            <div className="items-center">
                                <div className="flex items-center"><Link href={`/football/${game.away_team_slug}/${game.school_year}`}>
                                    <span className='font-semibold'>{game.away_team_name}</span>
                                    </Link> {game.user_favorited_away_team == 1 && <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="fill-cyan-700"  className="ml-2 icon icon-tabler icons-tabler-filled icon-tabler-star fill-amber-400"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" /></svg>}
                                </div>
                                <div className="text-xs text-gray-500">{game.away_team_mascot}</div>
                            </div>
                        </div>
                        <div>
                            {game.away_team_final_score ?
                                <div className="font-semibold">{game.away_team_final_score}</div>
                            :
                                <div className="font-semibold">-</div>
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className={`h-[48px] w-[48px] bg-${game.home_team_color}-600/10 rounded-full p-2`}>
                                <Image
                                    src={`${game.home_team_logo}`}
                                    height={60}
                                    width={60}
                                    alt={`${game.home_team_name}`}
                                    title={`${game.home_team_name}`}
                                />
                            </div>
                            <div className="items-center">
                                <div className="flex items-center">
                                    <Link href={`/football/${game.home_team_slug}/${game.school_year}`}>
                                        <span className='font-semibold'>{game.home_team_name} </span>
                                    </Link> {game.user_favorited_home_team == 1 && <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="fill-cyan-700"  className="ml-2 icon icon-tabler icons-tabler-filled icon-tabler-star fill-amber-400"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" /></svg>}
                                </div>
                                <div className="text-xs text-gray-500">{game.home_team_mascot}</div>
                            </div>
                        </div>
                    <div>
                        {game.away_team_final_score ?
                            <div className="font-semibold">{game.home_team_final_score}</div>
                        :
                            <div className="font-semibold">-</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
