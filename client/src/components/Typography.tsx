import { TypeAnimation } from 'react-type-animation';

const Typography = () => {
    return (
        <TypeAnimation
            sequence={[
                // Same substring at the start will only be typed out once, initially
                'Wanted a personalized necklace?',
                800, // wait 1s before replacing "Mice" with "Hamsters"
                'Wanted a personalized head jewelry?',
                800,
                'Wanted a personalized head jewelry?',
                800,
                'Wanted a personalized arm jewelry?',
                800,
                'Jewelcraft.com',
                800
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: '50px', display: 'inline-block' }}
            repeat={0}
        />
    );
};
export default Typography