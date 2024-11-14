import { Link } from "react-router-dom"

const ChipNavigate = ({ href, color, children }) => {
    return (<Link to={href}
        className={color + " w-60 font-semibold text-xl font-poppins border-2 border-black text-center text-black px-6 py-3 rounded-full hover:bg-blue-700 shadow-md"}>
        {children}
    </Link>)
}

export default ChipNavigate