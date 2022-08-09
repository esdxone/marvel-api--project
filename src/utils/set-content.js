import PreloaderSkeleton from "../components/preloader-skeleton/preloader-skeleton";
import PreloaderSpinner from "../components/preloader-spinner/preloader-spinner";
import ErrorMessage from "../components/error-message/error-message";

const setContent = (process, Component, data) => {
    switch(process) {
        case 'waiting':
            return <PreloaderSkeleton/>;
        case 'loading':
            return <PreloaderSpinner/>;
        case 'error':
            return <ErrorMessage/>;
        case 'confirmed':
            return <Component data={data}/>;
        default:
            throw new Error('Unexepted error');
    }
}

export default setContent;