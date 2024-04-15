import { Form, Formik } from 'formik';
import { FormEvent, useState } from 'react';
import * as Yup from 'yup';
import { FormEditorInput } from '../../../common/components/forms/FormEditorInput';
import { FormSelect } from '../../../common/components/forms/FormSelect';
import { FormTextInput } from '../../../common/components/forms/FormTextInput';
import { Button } from 'primereact/button';
import { t } from "i18next"
import { lang } from "../../../langs"
interface SelectImage {
    temp: string;
    image: File
}

interface Props {
    setVisible: (visible: boolean) => void;
}

export const FormNewsletter = ({setVisible}:Props) => {

    const [selectedImage, setSelectedImage] = useState<SelectImage>({} as SelectImage);
    const [selectedImageMini, setSelectedImageMini] = useState<SelectImage>({} as SelectImage);

    const handleImageUpload = (event: FormEvent<HTMLInputElement>, setFieldValue: any) => {
        if (!event?.currentTarget?.files?.length) return;
        const file = event.currentTarget?.files[0];
        let reader = new FileReader();
        reader.onload = function ({ target }) {
            setSelectedImage({
                image: file,
                temp: String(target?.result),
            });
            // Aquí actualizas el valor en Formik
            setFieldValue('frontPageImage', file);
        }
        reader.readAsDataURL(file);
    };
    const handleImageUploadMini = (event: FormEvent<HTMLInputElement>, setFieldValue: any) => {
        if (!event?.currentTarget?.files?.length) return;
        const file = event.currentTarget?.files[0];
        let reader = new FileReader();
        reader.onload = function ({ target }) {
            setSelectedImageMini({
                image: file,
                temp: String(target?.result),
            });
            // Aquí actualizas el valor en Formik
            setFieldValue('miniImage', file);
        }
        reader.readAsDataURL(file);
    };

    // Manejador para el input de archivo

    const categoriasOption = [
        { name: 'Tecnologia', code: 'Tec', value: 1 },
        { name: 'Robotica', code: 'Rob', value: 2 },
    ];
    const locationsOption = [
        { name: 'Internacional', code: 'INT', value: 1 },
        { name: 'Local', code: 'Local', value: 2 },
    ];
    const initialValues = {
        title: '',
        subtitle: '',
        category: '',
        place: '',
        frontPageImage: null,
        miniImage: null,
        description: '',
    };
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('El titulo es requerido'),
        subtitle: Yup.string().required('El sub titulo es requerido'),
        place: Yup.string().required('Campo requerido'),
        category: Yup.string().required('Campo requerido'),
        frontPageImage: Yup.mixed().required('Campo requerido'),
        miniImage: Yup.mixed().required('Campo requerido'),
        description: Yup.string().required('Campo requerido'),
    });
    const handleSubmit = (values: any) => {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
            if (key === 'frontPageImage') {
                formData.append(key, values[key]);
            } else {
                formData.append(key, values[key]);
            }
        });

        // Aquí envías formData a tu API
        console.log('Form submitted with FormData:', values);

    };
    return (
        <>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}  >
                {({ setFieldValue }) => (

                    <Form>
                        <div className="p-fluid formgrid grid">
                            <div className="field col-12 md:col-6">
                                <FormTextInput label={t(lang.newsletter.form.title.fieldTitle)} name={'title'}
                                />
                            </div>
                            <div className="field col-12 md:col-6">
                                <FormTextInput type='text' label={'Sub-Titulo'} name={'subtitle'}
                                />
                            </div>
                            <div className="field col-12 md:col-6">
                                <FormSelect options={categoriasOption} optionLabel={'name'} label={'Categoria'} name={'category'} />
                            </div>
                            <div className="field col-12 md:col-6">
                                <FormSelect options={locationsOption} optionLabel={'name'} label={'Lugar'} name={'place'} />
                            </div>
                            <div className="field col-12 md:col-6">
                                <div className='col-12 mb-5'>
                                    <label htmlFor="miniImage">Imagen Miniatura</label>
                                </div>
                                <div className='col-12'>
                                    <input
                                        type="file"
                                        name="miniImage"
                                        id="miniImage"
                                        accept="image/*"
                                        onChange={(event) => handleImageUpload(event, setFieldValue)}
                                    />
                                    <div className='col-12 md:col-6 mt-2'>
                                        {selectedImage && <img src={selectedImage.temp} alt="Selected" width={'100%'} />}
                                    </div>
                                </div>
                            </div>
                            <div className="field col-12 md:col-6">
                                <div className='col-12 mb-5'>
                                    <label htmlFor="miniImage">Imagen Miniatura</label>
                                </div>
                                <div className='col-12'>
                                    <input
                                        type="file"
                                        name="miniImage"
                                        id="miniImage"
                                        accept="image/*"
                                        onChange={(event) => handleImageUploadMini(event, setFieldValue)}
                                    />
                                    <div className='col-12 md:col-6 mt-2'>
                                        {selectedImageMini && <img src={selectedImageMini.temp} alt="Selected" width={'100%'} />}
                                    </div>
                                </div>
                            </div>
                            <div className="field col-12">
                                <FormEditorInput label={'Texto'} name={'description'} />
                            </div>
                        </div>
                        <div className="flex justify-content-end flex-wrap">
                            <Button label="Cancelar" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
                            <Button type='submit' label="Guardar" icon="pi pi-save" autoFocus />
                        </div>

                    </Form>
                )}
            </Formik>
        </>
    )
}
