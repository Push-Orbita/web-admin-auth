import './style/spinner.css'
export const SpinnerLoad = () => {
    return (
        <div className='flex justify-content-center aling-items-center border-1' style={{
            minHeight: '100vh'
        }}>
            <span className="loader"></span>
        </div>
    )
}
