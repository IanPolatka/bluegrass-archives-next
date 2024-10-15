"use client"

import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function TeamSearchModal({buttonType}) {
  const router = useRouter()
  const [currentYear, setCurrentYear] = useState([])
  const [teams, setTeams] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getTeams();
  }, [searchTerm]);
  
  const getTeams = () => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/teams/search-kentucky?search=${searchTerm}`)
        .then(({data}) => {
            setTeams(data.data)
        })
        .catch(() => {
        })
  }
  
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/years/current`)
        .then(({data}) => {
            setCurrentYear(data.data)
        })
        .catch(() => {
        })
  }, []);
  
  const handleChange = (value) => {
    setSearchTerm(value)
  }
  
  function helloWorld(team, year) {
    setSearchTerm("")
    setOpen(false)
    router.push('/football/' + team + '/' + year)
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        {buttonType == "large" ?
          <DialogTrigger className="px-6 py-3 text-xs font-semibold text-black uppercase transition duration-150 ease-in border border-gray-300 rounded-md hover:bg-gray-100">Find A Team</DialogTrigger>
        :
          <DialogTrigger>
            <div className="flex items-center justify-center w-10 h-10 mr-2 border border-gray-300 rounded-full lg:justify-start lg:px-4 lg:rounded lg:w-64 lg:flex bg-slate-50">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="lg:mr-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
              <span className="hidden lg:block">Search Teams</span>
            </div>
          </DialogTrigger>
        }
        <DialogContent className="border-none">
          <div className="absolute w-full h-1/4 -z-20 bg-gradient-to-r from-amber-500/0 from-30% via-amber-500/40 via-100%"></div>
          <div className="absolute w-full h-1/4 -z-10 bg-gradient-to-t from-white"></div>
          <DialogHeader>
            <DialogTitle>Search For An Active KHSAA Team</DialogTitle>
            <DialogDescription>
              <p className="mb-3">You can search by school name, mascot, or city</p>
              <Input 
                name="search" 
                type="text" 
                value={searchTerm} 
                onChange={(e) => handleChange(e.target.value)} 
                className="bg-white border focus:border-sky-600"
                placeholder="ex: Eagles" 
                autoFocus
              />
              <hr className="my-4 border-gray-300" />
              <div className="space-y-3">
                {teams.length > 0 ?
                  teams.map(team => {
                    return (
                      <div key={team.id} onClick={() => helloWorld(team.slug, currentYear.year)} className="flex justify-between w-full p-3 text-sm transition ease-in bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-100 durection-150 hover:cursor-pointer">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <div>
                              {team.logo.includes('tba.png') ?
                                <div className="w-10 h-10 bg-white border border-gray-300 border-dashed rounded-md" />
                              :
                                <Image
                                    src={`${team.logo}`}
                                    height={40}
                                    width={40}
                                    alt={`${team.logo}`}
                                    title={`${team.logo}`}
                                />
                              }
                            </div>
                            <div>
                              <div className="font-semibold text-black">{team.name}</div>
                              <div className="text-xs text-left text-gray-500">{team.mascot}</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-xs text-gray-500">{team.city}, {team.state}</div>
                        </div>
                      </div>
                    )
                  })
                :
                  <div className="flex justify-between w-full p-3 text-sm font-semibold text-red-600 transition ease-in bg-red-100 border border-red-300 rounded shadow-sm">No Teams Found</div>
                }
                </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}