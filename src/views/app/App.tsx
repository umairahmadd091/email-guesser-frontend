import * as React from 'react';
import './app.css';
import { getEmail } from '../../api/api';

const App: React.FC = () => {
  const [fullName, setFullName] = React.useState<string>('');
  const [domain, setDomain] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await getEmail({ fullName, domain });
      setEmail(response.data.email);
      setError('');
    } catch (err) {
      setEmail('');
      setError('Email could not be derived');
    }
  };

  return (
    <div className="d-flex main">
      <div className="box">
        <h2 className="heading">Email Guesser</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              className="input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Full Name"
            />
          </div>
          <div>
            <input
              type="text"
              className="input"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              required
              placeholder="Domain Name"
            />
          </div>
          <div className="d-flex">
            <button type="submit" className="submit">
              Guess Email
            </button>
          </div>
        </form>
        {email && <p>Derived Email: {email}</p>}
        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
};

export default App;
