import { Button } from 'antd';
import styled from 'styled-components';
import exampleImage from '@/assets/react.svg';

const StyledButton = styled(Button)`
    background-color: #e05419;
    color: #fff;
`;

function App() {
    return (
        <>
            <StyledButton type="primary">Business Canvas</StyledButton>
            <img src={exampleImage} alt="vite" />
        </>
    );
}

export default App;
