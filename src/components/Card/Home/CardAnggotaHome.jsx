
const CardAnggotaHome = ({ Color, Nama, Identitas, Image }) => {
    return (<div
        className={Color + " border-4 border-black  shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center space-x-4"}>
        <div className="flex-1 text-center text-white font-poppins">
            <div className="flex-shrink-0 items-center flex justify-center">
                <img src={Image} alt="Descriptive Alt Text"
                    className="w-32 h-32 object-cover rounded-lg" />
            </div>
            <h3 className="text-xl text-white text-center font-bold font-poppins mb-2">{Nama}</h3>

            <p>{Identitas}</p>
        </div>
    </div>)
}

export default CardAnggotaHome