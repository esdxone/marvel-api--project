import ErrorMessage from "../error-message/error-message";

const Page404 = () => {
    return (
        <>
        <h2 style={{
            'textAlign': 'center',
            'fontSize': '47px',
            'marginBottom': '40px'
        }}>
        Oops, page not found</h2>
        <ErrorMessage/>
        </>
    )
}

export default Page404;