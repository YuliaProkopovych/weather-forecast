import styled from 'styled-components';
import { Box } from 'grommet';

const BackgroundBox = styled(Box)`
background: radial-gradient(at 0 10%, rgba(180,180,180,0.9) 0, rgba(180,180,180,0.8) 11%, rgba(255,255,255,0.6) 21%, rgba(255,255,255,0.3) 31%, rgba(255,255,255,0) 100%),
radial-gradient(at 0 40%, rgba(180,180,180,0.9) 0, rgba(180,180,180,0.8) 11%, rgba(255,255,255,0.6) 51%, rgba(255,255,255,0.3) 81%, rgba(255,255,255,0) 100%),
radial-gradient(at 10% 80%, rgba(180,180,180,0.9) 0, rgba(180,180,180,0.8) 11%, rgba(255,255,255,0.6) 51%, rgba(255,255,255,0.3) 81%, rgba(255,255,255,0) 100%),
radial-gradient(at 60% 30px, #f7e413 20px, #ebf38b 180px, #adfbda 50%);
`;

export default BackgroundBox;
