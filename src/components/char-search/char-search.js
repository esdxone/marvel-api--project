import { Formik, Field, Form, ErrorMessage as FormikErrorMassage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import useMarvelservice from '../../services/Marvel-service';
import ErrorMessage from '../error-message/error-message';
import './char-search.scss';

const CharSearch = () => {
    const [char, setChar] = useState(null);
    const {error, loading, getCharacterbyName, clearError} = useMarvelservice();

    const onRequest = (name) => {
        clearError();

        getCharacterbyName(name)
         .then(onCharFind)
    }

    const onCharFind = (char) => {
        setChar(char);
    }

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    const results = !char ? null : char.length > 0 ?
                <div className="char__search-wrapper">
                    <div className="char__search-success">There is! Visit {char[0].name} page?</div>
                        <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                </div> :
                <div className="char__search-error">
                        The character was not found. Check the name and try again
                </div>;

    return (
        <div className="char__search-form">
        <Formik
        initialValues = {{ charName: '' }}
        validationSchema = {Yup.object({
            charName: Yup.string()
            .required('This field is required'),
        })}
        onSubmit = {({charName}) => {
            onRequest(charName)
        }}
        >
       <Form>
       <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field
                            id="charName"
                            name='charName'
                            type='text'
                            placeholder="Enter name"/>
                        <button
                            type='submit'
                            className="button button__main"
                            disabled={loading}>
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMassage component="div" className="char__search-error" name="charName" />
        </Form>
        </Formik>
            {results}
            {errorMessage}
        </div>
    )
}

export default CharSearch;