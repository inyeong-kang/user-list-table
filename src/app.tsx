import { UserList } from './components';
import { MessageProvider } from './contexts/message';
import './global.css';

function App() {
    return (
        <MessageProvider>
            <UserList />
        </MessageProvider>
    );
}

export default App;
