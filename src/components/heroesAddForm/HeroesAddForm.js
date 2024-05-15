import {useHttp} from '../../hooks/http.hook';
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { addToStore } from '../../actions';
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров
const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);

    return(
        <>
            <label htmlFor={props.name} className="form-label fs-4">{label}</label>
            <input {...props}{...field} className="form-control"/>
            {meta.touched && meta.error ? (
                <div style={{"color":'red'}}>{meta.error}</div>
            ) : null}
        </>
    )
};

function HeroesAddForm() {
    const dispatch = useDispatch()

    const {request} = useHttp();
    const sendToServer = (arr) => {
        arr.id = uuidv4();
        request("http://localhost:3001/heroes", "POST", JSON.stringify(arr))
        dispatch(addToStore(arr))
    }

    return (
        <Formik
            initialValues={{
                name: '',
                description: '',
                element: '',
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .min(2, "Mинимум 2 символа")
                    .required('Обязательное поле'),
                description: Yup.string()
                    .min(10, "Не менее 10 символов")
                    .required('Обязательное поле'),
                element: Yup.string()
                    .required("Выберете элемент")
            })}
            onSubmit={values => sendToServer(values)}>
            <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <MyTextInput
                        label="Имя нового героя"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Как меня зовут?" />
                </div>

                <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <Field
                        name="description"
                        className="form-control"
                        id="description"
                        placeholder="Что я умею?"
                        as="textarea"
                        style={{ "height": '130px' }} />
                    <ErrorMessage style={{"color":'red'}} name="description" component="div" />
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field
                        id="element"
                        name="element"
                        as="select">
                        <option>Я владею элементом...</option>
                        <option value="fire">Огонь</option>
                        <option value="water">Вода</option>
                        <option value="wind">Ветер</option>
                        <option value="earth">Земля</option>
                    </Field>
                    <ErrorMessage style={{"color":'red'}} name="element" component="div" />
                </div>

                <button type="submit" className="btn btn-primary">Создать</button>
            </Form>
        </Formik>
    );
}

export default HeroesAddForm;