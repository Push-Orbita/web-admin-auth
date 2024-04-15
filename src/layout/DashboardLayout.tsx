import { NavBar } from "./components/NavBar"

interface Props {
    children?: React.ReactNode
}
export const DashboardLayout = ({ children }: Props) => {
    return (
        <>
            <NavBar />
            <main className='p-input-filled' style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                padding: '2rem 1.5rem 2rem 1.5rem',
                transition: 'margin-left .2s'
            }}>
                {children}
            </main>
        </>
    )
}
