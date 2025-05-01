import { ReactNode } from 'react'

interface IBrowserMockupProps {
  children?: ReactNode;
  bentoLink?: string;
  backgroundImageLink?: string;
  onClick?: () => void
}

const BrowserMockup = ({ children, bentoLink, backgroundImageLink, onClick }: IBrowserMockupProps) => {
  return (
    <div className="mockup-browser border-black border relative rounded-xl h-full w-full">
      <div className="grid h-full w-full" onClick={(e) => e.stopPropagation()}>
        {children}
        {bentoLink &&
          <div style={{
            backgroundImage: `url(${backgroundImageLink})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
            className='w-full h-40 flex justify-center items-center rounded-xl'
            onClick={onClick}>
            <img src={`${bentoLink}`} alt={`${bentoLink}`} className='w-[60%]' />
          </div>
        }
      </div>
    </div>
  )
}

export default BrowserMockup