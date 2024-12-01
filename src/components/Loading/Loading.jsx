import { ClipLoader } from "react-spinners";

const Loading = ({ children }) => {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            setLoading(true)
        }, 1000);
        return () => clearInterval(timer)
    }, [])

    return (loading ? children : <ClipLoader />)
}