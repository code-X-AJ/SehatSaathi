import SehatSaathiDashboard from "../components/PatientDash"
import DocDashboard from "../components/DocDash"
import PharmacyDashboard from "../components/pharmacy"

const AuthRoutes = [
    {
        name: <SehatSaathiDashboard />,
        path: '/patient'
    },
    {
        name: <DocDashboard />,
        path: '/doc'
    },
    {
        name: <PharmacyDashboard />,
        path: '/pharmacy'
    },
]

export default AuthRoutes
