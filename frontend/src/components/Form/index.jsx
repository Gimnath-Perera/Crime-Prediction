import * as Yup from 'yup';
import axios from 'axios';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logo from '../../assets/images/logo.png';
import ModalComponent from '../Modal';
import PredictionScreen from '../PredictionScreen';
import Loading from '../Loading';
import { useState } from 'react';
import { BASE_URL } from '../../constants';
import { DATES, DAYS, HOURS, MONTHS, YEARS } from '../../common/constants';

export const formValidationSchema = Yup.object({
  day_of_week: Yup.string().max(255).required(`Day of week is required`),
  pd_district: Yup.string().max(255).required(`District is required`),
  address: Yup.string().max(255).required(`Address is required`),
  x: Yup.string().max(255).required(`Longitude is required`),
  y: Yup.string().max(255).required(`Latitude is required`),
  year: Yup.string().max(255).required(`Year is required`),
  month: Yup.string().max(255).required(`Month is required`),
  day: Yup.string().max(255).required(`Day is required`),
  hour: Yup.string().max(255).required(`Hour is required`),
});

const initialFormValues = {
  day_of_week: '',
  pd_district: '',
  address: '',
  x: '',
  y: '',
  year: '',
  month: '',
  day: '',
  hour: '',
};

const FormComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [supervisedResult, setSupervisedResult] = useState({});

  const handleOnSubmit = async (values) => {
    try {
      setIsLoading(true);

      const supervisedResponse = await axios.post(
        `${BASE_URL}/api/crime/predict`,
        values
      );
      setSupervisedResult(supervisedResponse?.data);

      setIsLoading(false);
      setIsOpen(true);
    } catch (err) {
      toast.error('Internal Server Error!', {
        theme: 'colored',
      });
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const renderYears = () => {
    return YEARS.map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ));
  };

  const renderMonths = () => {
    return MONTHS.map((item, index) => (
      <option key={item} value={index + 1}>
        {item}
      </option>
    ));
  };

  const renderDays = () => {
    return DAYS.map((item, index) => (
      <option key={item} value={index + 1}>
        {item}
      </option>
    ));
  };

  const renderDates = () => {
    return DATES.map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ));
  };

  const renderHours = () => {
    return HOURS.map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ));
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div class='flex flex-wrap -mx-4  items-center justify-center py-24'>
          <div
            class='w-full px-4 flex  items-center justify-center bg-no-repeat bg-center bg-fixed'
            style={{
              backgroundImage: `url(${logo})`,
            }}
          >
            <div class='hero-content flex-col flex'>
              <h1
                class='
                  text-dark
                  font-bold
                  text-4xl
                  sm:text-[42px]
                  lg:text-[40px]
                  xl:text-[42px]
                  leading-snug
                  mb-3
                '
              >
                Crime Type Prediction
              </h1>
              <p class='text-base mb-8 text-body-color max-w-[480px]'>
                Input your data here
              </p>

              <Formik
                initialValues={initialFormValues}
                validationSchema={formValidationSchema}
                onSubmit={(values) => {
                  handleOnSubmit(values);
                }}
              >
                {({ errors, handleChange, touched, values }) => (
                  <Form>
                    <div class='flex flex-wrap -mx-4'>
                      <div class='w-full md:w-1/2 lg:w-1/4 px-4'>
                        <div class='mb-12'>
                          <label
                            for=''
                            class='font-medium text-base text-black block mb-3'
                          >
                            Enter a day Of week
                          </label>
                          <select
                            placeholder='Disabled Input'
                            name='day_of_week'
                            onChange={handleChange}
                            value={values.day_of_week}
                            class={`w-full
                        border-[1.5px] border-form-stroke
                        rounded-lg
                        py-3
                        px-5
                        font-medium
                        text-body-color
                        placeholder-body-color
                        outline-none
                        focus:border-primary
                        active:border-primary
                          ${
                            touched.day_of_week &&
                            errors.day_of_week &&
                            'focus:border-error active:border-error'
                          }
                        transition
                        disabled:bg-[#F5F7FD] disabled:cursor-default
                        ${
                          touched.day_of_week &&
                          errors.day_of_week &&
                          'input-error'
                        }
                        `}
                          >
                            <option value='' disabled>
                              Select day of week
                            </option>
                            {renderDays()}
                          </select>
                          {touched.day_of_week && errors.day_of_week && (
                            <span class='flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1'>
                              {errors.day_of_week}
                            </span>
                          )}
                        </div>
                      </div>

                      <div class='w-full md:w-1/2 lg:w-1/4 px-4'>
                        <div class='mb-12'>
                          <label
                            for=''
                            class='font-medium text-base text-black block mb-3'
                          >
                            Enter a district
                          </label>
                          <input
                            type='text'
                            placeholder={`Enter District`}
                            name='pd_district'
                            onChange={handleChange}
                            value={values.pd_district}
                            class={`w-full
                        border-[1.5px] border-form-stroke
                        rounded-lg
                        py-3
                        px-5
                        font-medium
                        text-body-color
                        placeholder-body-color
                        outline-none
                        focus:border-primary
                        active:border-primary
                        ${
                          touched.pd_district &&
                          errors.pd_district &&
                          'focus:border-error active:border-error'
                        }
                        transition
                        disabled:bg-[#F5F7FD] disabled:cursor-default
                        ${
                          touched.pd_district &&
                          errors.pd_district &&
                          'input-error'
                        }
                        `}
                          />
                          {touched.pd_district && errors.pd_district && (
                            <span class='flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1'>
                              {errors.pd_district}
                            </span>
                          )}
                        </div>
                      </div>

                      <div class='w-full md:w-1/2 lg:w-1/4 px-4'>
                        <div class='mb-12'>
                          <label
                            for=''
                            class='font-medium text-base text-black block mb-3'
                          >
                            Enter a address
                          </label>
                          <input
                            type='text'
                            placeholder={`Enter Address`}
                            name='address'
                            onChange={handleChange}
                            value={values.address}
                            class={`w-full
                        border-[1.5px] border-form-stroke
                        rounded-lg
                        py-3
                        px-5
                        font-medium
                        text-body-color
                        placeholder-body-color
                        outline-none
                        focus:border-primary
                        active:border-primary
                        ${
                          touched.address &&
                          errors.address &&
                          'focus:border-error active:border-error'
                        }
                        transition
                        disabled:bg-[#F5F7FD] disabled:cursor-default
                        ${touched.address && errors.address && 'input-error'}
                        `}
                          />
                          {touched.address && errors.address && (
                            <span class='flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1'>
                              {errors.address}
                            </span>
                          )}
                        </div>
                      </div>

                      <div class='w-full md:w-1/2 lg:w-1/4 px-4'>
                        <div class='mb-12'>
                          <label
                            for=''
                            class='font-medium text-base text-black block mb-3'
                          >
                            Enter a longitude
                          </label>
                          <input
                            type='text'
                            placeholder='Enter Longitude'
                            name='x'
                            onChange={handleChange}
                            value={values.x}
                            class={`w-full
                        border-[1.5px] border-form-stroke
                        rounded-lg
                        py-3
                        px-5
                        font-medium
                        text-body-color
                        placeholder-body-color
                        outline-none
                        focus:border-primary
                        active:border-primary
                          ${
                            touched.x &&
                            errors.x &&
                            'focus:border-error active:border-error'
                          }
                        transition
                        disabled:bg-[#F5F7FD] disabled:cursor-default
                        ${touched.x && errors.x && 'input-error'}
                        `}
                          />
                          {touched.x && errors.x && (
                            <span class='flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1'>
                              {errors.x}
                            </span>
                          )}
                        </div>
                      </div>

                      <div class='w-full md:w-1/2 lg:w-1/4 px-4'>
                        <div class='mb-12'>
                          <label
                            for=''
                            class='font-medium text-base text-black block mb-3'
                          >
                            Enter a latitude
                          </label>
                          <input
                            type='text'
                            placeholder='Enter Latitude'
                            name='y'
                            onChange={handleChange}
                            value={values.y}
                            class={`w-full
                        border-[1.5px] border-form-stroke
                        rounded-lg
                        py-3
                        px-5
                        font-medium
                        text-body-color
                        placeholder-body-color
                        outline-none
                        focus:border-primary
                        active:border-primary
                          ${
                            touched.y &&
                            errors.y &&
                            'focus:border-error active:border-error'
                          }
                        transition
                        disabled:bg-[#F5F7FD] disabled:cursor-default
                        ${touched.y && errors.y && 'input-error'}
                        `}
                          />
                          {touched.y && errors.y && (
                            <span class='flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1'>
                              {errors.y}
                            </span>
                          )}
                        </div>
                      </div>

                      <div class='w-full md:w-1/2 lg:w-1/4 px-4'>
                        <div class='mb-12'>
                          <label
                            for=''
                            class='font-medium text-base text-black block mb-3'
                          >
                            Select a year
                          </label>
                          <select
                            placeholder='Select Year'
                            name='year'
                            onChange={handleChange}
                            value={values.year}
                            class={`w-full
                        border-[1.5px] border-form-stroke
                        rounded-lg
                        py-3
                        px-5
                        font-medium
                        text-body-color
                        placeholder-body-color
                        outline-none
                        focus:border-primary
                        active:border-primary
                          ${
                            touched.year &&
                            errors.year &&
                            'focus:border-error active:border-error'
                          }
                        transition
                        disabled:bg-[#F5F7FD] disabled:cursor-default
                        ${touched.year && errors.year && 'input-error'}
                        `}
                          >
                            <option value='' disabled>
                              Select a year
                            </option>
                            {renderYears()}
                          </select>
                          {touched.year && errors.year && (
                            <span class='flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1'>
                              {errors.year}
                            </span>
                          )}
                        </div>
                      </div>

                      <div class='w-full md:w-1/2 lg:w-1/4 px-4'>
                        <div class='mb-12'>
                          <label
                            for=''
                            class='font-medium text-base text-black block mb-3'
                          >
                            Select a month
                          </label>
                          <select
                            placeholder='Select Month'
                            name='month'
                            onChange={handleChange}
                            value={values.month}
                            class={`w-full
                        border-[1.5px] border-form-stroke
                        rounded-lg
                        py-3
                        px-5
                        font-medium
                        text-body-color
                        placeholder-body-color
                        outline-none
                        focus:border-primary
                        active:border-primary
                          ${
                            touched.month &&
                            errors.month &&
                            'focus:border-error active:border-error'
                          }
                        transition
                        disabled:bg-[#F5F7FD] disabled:cursor-default
                        ${touched.month && errors.month && 'input-error'}
                        `}
                          >
                            <option value='' disabled>
                              Select a month
                            </option>
                            {renderMonths()}
                          </select>
                          {touched.month && errors.month && (
                            <span class='flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1'>
                              {errors.month}
                            </span>
                          )}
                        </div>
                      </div>

                      <div class='w-full md:w-1/2 lg:w-1/4 px-4'>
                        <div class='mb-12'>
                          <label
                            for=''
                            class='font-medium text-base text-black block mb-3'
                          >
                            Select a date
                          </label>
                          <select
                            placeholder='Select date'
                            name='day'
                            onChange={handleChange}
                            value={values.day}
                            class={`w-full
                        border-[1.5px] border-form-stroke
                        rounded-lg
                        py-3
                        px-5
                        font-medium
                        text-body-color
                        placeholder-body-color
                        outline-none
                        focus:border-primary
                        active:border-primary
                          ${
                            touched.day &&
                            errors.day &&
                            'focus:border-error active:border-error'
                          }
                        transition
                        disabled:bg-[#F5F7FD] disabled:cursor-default
                        ${touched.day && errors.day && 'input-error'}
                        `}
                          >
                            <option value='' disabled>
                              Select a day
                            </option>
                            {renderDates()}
                          </select>
                          {touched.day && errors.day && (
                            <span class='flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1'>
                              {errors.day}
                            </span>
                          )}
                        </div>
                      </div>

                      <div class='w-full md:w-1/2 lg:w-1/4 px-4'>
                        <div class='mb-12'>
                          <label
                            for=''
                            class='font-medium text-base text-black block mb-3'
                          >
                            Select an hour
                          </label>
                          <select
                            placeholder='Select an hour'
                            name='hour'
                            onChange={handleChange}
                            value={values.hour}
                            class={`w-full
                        border-[1.5px] border-form-stroke
                        rounded-lg
                        py-3
                        px-5
                        font-medium
                        text-body-color
                        placeholder-body-color
                        outline-none
                        focus:border-primary
                        active:border-primary
                          ${
                            touched.hour &&
                            errors.hour &&
                            'focus:border-error active:border-error'
                          }
                        transition
                        disabled:bg-[#F5F7FD] disabled:cursor-default
                        ${touched.hour && errors.hour && 'input-error'}
                        `}
                          >
                            <option value='' disabled>
                              Select an hour
                            </option>
                            {renderHours()}
                          </select>
                          {touched.hour && errors.hour && (
                            <span class='flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1'>
                              {errors.hour}
                            </span>
                          )}
                        </div>
                      </div>

                      <div class='w-full flex justify-center mt-4'>
                        <button
                          class='text-base
                  font-medium
                  text-white
                  bg-[#3D4451]
                  rounded-lg
                  py-3
                  px-7
                  hover:bg-opacity-90 w-1/2
                  hover:text-[#061F6C]'
                        >
                          Predict
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          <ModalComponent
            isOpen={isOpen}
            modalContent={
              <PredictionScreen
                onClose={handleModalClose}
                supervisedResult={supervisedResult}
              />
            }
            handleClose={handleModalClose}
            showCloseIcon={false}
          />
        </div>
      )}
    </>
  );
};

export default FormComponent;
