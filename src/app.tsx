import { UserList } from './components';
import { GlobalBoundary } from './components';
import { MessageProvider } from './contexts';
import './global.css';

function App() {
    return (
        <GlobalBoundary>
            <MessageProvider>
                <UserList />
            </MessageProvider>
        </GlobalBoundary>
    );
}

export default App;
