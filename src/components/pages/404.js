import { Helmet } from 'react-helmet';
import ErrorMessage from "../error-message/error-message";

const Page404 = () => {
    return (
        <>
         <Helmet>
            <meta
            name="description"
            content="Page not found"
            />
            <title>Marvel - page not fount</title>
        </Helmet>
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