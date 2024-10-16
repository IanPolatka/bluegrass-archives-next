import Image from 'next/image'
import Link from 'next/link'

const ApplicationLogo = () => (
    <div className="flex justify-center w-full">
        <Link href="/"><Image src={`/bluegrass-archives.svg`} alt="Bluegrass Archives" width="250" height="90" loading="eager" priority={true} /></Link>
    </div>
)

export default ApplicationLogo
