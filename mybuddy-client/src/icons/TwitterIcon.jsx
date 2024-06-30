import twitterBlackIcon from '../assets/icon/twitter-black-icon.png';
import twitterWhiteIcon from '../assets/icon/twitter-white-icon.png';

const TwitterIcon = ({theme}) => {
    return (
    <>
    {
        theme !== 'light' ?

        <img className='w-6' src={twitterBlackIcon} alt=''/>

        :
        <img className='' src={twitterWhiteIcon} alt=''/>

    }
            
        </>
    );
};

export default TwitterIcon;