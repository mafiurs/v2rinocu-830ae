import { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import getConfig from 'next/config';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import { getInputProps } from '../../../utils/helpers';
import gameSuggestions from '../../../services/gamesSuggestions/gameSuggestions';
import Alert from './Alert';
const { publicRuntimeConfig } = getConfig();
const { captchaSitekey } = publicRuntimeConfig;
export default function CoinsRibbon() {
  const initialValues = {
    name: '',
    email: '',
    why: '',
    captcha: ''
  };
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [alertContent, setAlertContent] = useState({
    open: false,
    content: null
  });
  const reCaptcha = useRef();
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(50, 'Must be less than 50 characters')
      .required('Required')
      .typeError('Must be a valid name')
      .matches(/^[a-zA-Z ]*$/, 'Must be a valid name'),
    email: Yup.string()
      .max(50, 'Must be less than 50 characters')
      .required('Required')
      .typeError('Must be a valid email')
      .email('Must be a valid email'),
    why: Yup.string().max(150, 'Must be less than 150 characters').required('Required'),
    captcha: Yup.string().required('Please complete the captcha')
  });
  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await gameSuggestions(values);
      if (response.status === 200) {
        setAlertContent({
          ...alertContent,
          open: true,
          content: {
            title: 'Suggestion submitted',
            description: 'Thank you for replying.',
            type: 'success'
          }
        });
      }
    } catch (err) {
      setAlertContent({
        ...alertContent,
        open: true,
        content: {
          title: 'Suggestion could not be submitted',
          description: 'Please try again later.',
          type: 'error'
        }
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
    validateOnChange: false
  });
  useEffect(() => {
    if (token) {
      formik.setFieldValue('captcha', token);
    }
  }, [token]);

  return (
    <div className="pt-24 relative">
      <div className="absolute left-0 right-0 h-1/2 bg-warm-gray-50" aria-hidden="true" />
      <div className="relative max-w-md mx-auto px-4 sm:max-w-3xl sm:px-6 lg:max-w-screen-2xl lg:px-8">
        <div className="py-10 px-6 bg-gradient-to-l from-gray-900 to-gray-800  sm:py-16 sm:px-12 lg:py-8 lg:px-20 lg:flex lg:items-center">
          <div className="lg:w-0 lg:flex-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Another game in mind?
            </h2>
            <p className="mt-4 max-w-3xl text-base text-cyan-100">
              Tell us more about which game you would like us to add into our tools. We will analyze
              each of your proposals and will contact you eventually for further clarification if
              needed.
            </p>
          </div>
          <div className="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1">
            <form onSubmit={formik.handleSubmit} className="">
              <Input
                {...getInputProps('name', formik)}
                className="py-1"
                label="Game name"
                placeholder="Ej: Pegaxy"
                autofocus
                required
              />
              <Input
                {...getInputProps('email', formik)}
                className="py-1"
                label="Your email"
                type="email"
                autoComplete="email"
                placeholder="your@email.com"
                required
              />
              <Input
                {...getInputProps('why', formik)}
                className="py-1"
                label="Why?"
                placeholder="The reason in few words"
                required
              />
              {formik.dirty && !alertContent.open && (
                <>
                  <div className="pt-1">
                    <ReCAPTCHA
                      ref={reCaptcha}
                      sitekey={captchaSitekey}
                      onChange={(token) => setToken(token)}
                      onExpired={(e) => setToken('')}
                    />
                  </div>
                  {formik.errors?.captcha && (
                    <p className="mt-1 text-xs text-red-500" id={`error-captcha`}>
                      {formik.errors?.captcha}
                    </p>
                  )}
                </>
              )}
              {alertContent.open && (
                <div className="pt-1">
                  <Alert {...alertContent.content} />
                </div>
              )}
              {!alertContent.open && (
                <div className="pt-1">
                  <Button
                    type="submit"
                    label="Submit"
                    size="sm"
                    inverted
                    className="mt-1"
                    disabled={alertContent.open}
                    loading={loading}
                  />
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
