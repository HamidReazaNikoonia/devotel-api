import { Navigate, Route, Routes } from 'react-router-dom';

import { Message } from './Message';
import { Messages } from './Messages';
import { EditMessage } from './EditMessage';
import {CreateMessage} from './CreateMessage';

export const MessagesRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Messages />} />
      <Route path="/create" element={<CreateMessage />} />
      <Route path=":MessageId" element={<Message />} />
      <Route path="/edit/:MessageId" element={<EditMessage />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
