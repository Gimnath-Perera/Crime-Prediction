import animationData from '../../lotties/steal.json';
import Lottie from 'react-lottie';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const PredictionScreen = ({ onClose, supervisedResult }) => {
  return (
    <div className='container'>
      <div className='text-center pb-4'>
        <h1
          className='text-dark
                  font-bold
                  text-2xl
                  sm:text-[32px]
                  lg:text-[30px]
                  xl:text-[32px]
                  leading-snug
                  mb-3
                  capitalize
                  '
        >
          Here is your prediction
        </h1>
      </div>
      <div class='flex flex-col w-75 lg:flex-row p-2  justify-center flex'>
        <div class='h-44 w-full bg-gray-100 rounded-xl flex flex-col justify-center shadow duration-300 hover:bg-white hover:shadow-xl'>
          <div class='-z-1 w-2/3'>
            <Lottie options={defaultOptions} height={110} width={500} />
          </div>
          <h2 class='mt-6 text-md ?leading-5 font-semibold text-center'>
            {supervisedResult?.crime || '-'}
          </h2>
        </div>
      </div>
    </div>
  );
};
export default PredictionScreen;
