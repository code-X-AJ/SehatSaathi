import SehatSaathiDashboard from "../components/PatientDash"
import DocDashboard from "../components/DocDash"

const AuthRoutes = [
    {
        name: <SehatSaathiDashboard />,
        path: '/patient'
    },
    {
        name: <DocDashboard />,
        path: '/doc'
    },
]

export default AuthRoutes
