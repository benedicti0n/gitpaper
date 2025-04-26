import { ReactNode } from 'react'

interface IBrowserMockupProps {
  children?: ReactNode;
  bentoLink?: string;
  backgroundImageLink?: string;
  onClick?: () => void
}

const BrowserMockup = ({ children, bentoLink, backgroundImageLink, onClick }: IBrowserMockupProps) => {
  return (
    <div className="mockup-browser border-base-300 border relative rounded-xl h-full w-full">
      <div className="mockup-browser-toolbar p-1 bg-slate-500 rounded-t-xl">
        <div className="input text-black text-xs pl-2 bg-white rounded-lg">https://gitpaper.kasukabelabs.com</div>
      </div>
      <div className="grid h-full w-full" onClick={(e) => e.stopPropagation()}>
        {children}
        {bentoLink &&
          <div style={{
            backgroundImage: `url(${backgroundImageLink})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
            className='w-full h-40 flex justify-center items-center rounded-b-xl'
            onClick={onClick}>
            <img src={`${bentoLink}`} alt={`${bentoLink}`} className='w-[60%]' />
          </div>
        }
      </div>
    </div>
  )
}

export default BrowserMockup