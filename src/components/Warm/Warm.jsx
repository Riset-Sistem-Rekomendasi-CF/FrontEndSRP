import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const Warm = ({ children }) => {
    return (
        <div className="flex items-center justify-center my-4">
            <WarningAmberIcon className="text-yellow-500 mr-2" />
            <h2 className="text-md font-semibold text-center">
                {children}
            </h2>
        </div>
    )
}

export default Warm