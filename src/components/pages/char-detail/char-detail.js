import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './char-detail.scss';

const CharDetail = ({data}) => {

    const {name, thumbnail, description} = data;

    return (
        <>
        <Helmet>
            <meta
            name="description"
            content={`Information about ${name}`}
            />
            <title>{name}</title>
        </Helmet>
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to="/characters" className="single-comic__back">Back to all</Link>
        </div>
        </>
    )
}

export default CharDetail;
