import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Link } from 'react-router-dom'

const CardHome = ({ Image, bgColor, Heading, children, buttonName, anchor }) => {
    return (<div
        className={bgColor + ' border-4 border-black shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center space-x-4'}>
        <div className="flex-shrink-0">
            <img src={Image} alt="Descriptive Alt Text" className="w-32 h-32 object-cover rounded-lg" />
        </div>
        <div className="flex-1 text-start">
            <h3 className="text-xl text-white font-bold font-poppins mb-2">{Heading}</h3>
            <p className="mb-6 text-white text-justify text-medium font-poppins">{children}</p>
            {<Link to={anchor}
                   className="font-sm font-poppins bg-greenDrak-btn-primary border-2 border-black text-white px-3 py-2 rounded-full hover:bg-blue-700 shadow-md">
                {buttonName}
                <ArrowForwardIcon className="ml-2 text-lg" />
            </Link>}
        </div>
    </div>)
}

export default CardHome