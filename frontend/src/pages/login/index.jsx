
import { useState } from 'react';
import dotenv from 'dotenv';

dotenv.config();

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const sendCredentials = async (e) => {
    try {
      const response = await fetch(`http://localhost:3000/auth/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      }, []);

      const json = await response.json();

      if (response.status !== 200) {
        setError(json.message);
      }

    } catch (error) {
      console.error(`Erro: ${error}`)
    }
  };

  return (
    <div>
      <section className="h-screen">
        <div className="container h-full px-6 py-24">
          <div
            className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone image" />
            </div>

            <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
              <div className="relative mb-6" data-te-input-wrapper-init>
                <input
                  type="text"
                  className="bg-sky-100 peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  placeholder="Email address" />
                <label
                  htmlFor="email"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                >Email
                </label>
              </div>

              <div className="relative mb-6">
                <input
                  type="password"
                  className="bg-sky-100 peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  placeholder="Password" />
                <label
                  htmlFor="password"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                >Senha
                </label>
              </div>

              <button
                type="button"
                onClick={sendCredentials}
                className="bg-sky-600 inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-sky-800 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                data-te-ripple-init
                data-te-ripple-color="light">
                Login
              </button>

              {error && <p className="error bg-red-200 mt-4 text-center rounded">{error}</p>}

              <div className="mt-4 flex items-center justify-center">
                <p className="mr-1">Não possui uma conta?</p>
                <a href="#!" className="text-sky-600 text-primary transition duration-150 ease-in-out hover:text-sky-800 focus:text-primary-600 active:text-primary-700">
                  Cadastre-se
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}