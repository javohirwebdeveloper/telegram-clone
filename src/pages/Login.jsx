// src/pages/Login.jsx
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import pb from '../pb';

export default function Login() {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [globalError, setGlobalError] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (pb.authStore.isValid) {
      window.location.href = '/chat';
    }
  }, []);
  
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Noto‘g‘ri email format')
        .required('Email majburiy'),
      username: mode === 'signup' ? Yup.string().required('Username majburiy') : Yup.string(),
      password: Yup.string()
        .min(6, 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak')
        .required('Parol majburiy'),
    }),
    onSubmit: async (values) => {
      setGlobalError('');
      setLoading(true);
      try {
        if (mode === 'login') {
          await pb.collection('users').authWithPassword(values.email, values.password);
          window.location.href = '/chat';
        } else {
          await pb.collection('users').create({
            email: values.email,
            password: values.password,
            passwordConfirm: values.password,
            username: values.username,
          });
          await pb.collection('users').authWithPassword(values.email, values.password);
          window.location.href = '/chat';
        }
      } catch (err) {
        const res = err?.response?.data;
        if (res?.email?.message) {
          formik.setFieldError('email', res.email.message);
        }
        if (res?.username?.message) {
          formik.setFieldError('username', res.username.message);
        }
        if (res?.password?.message) {
          formik.setFieldError('password', res.password.message);
        }

        setGlobalError(err.message || 'Noma’lum xatolik');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow-2xl p-8 rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Telegram Klon</h1>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`w-full p-3 border rounded-md focus:outline-none ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        {mode === 'signup' && (
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className={`w-full p-3 border rounded-md focus:outline-none ${formik.touched.username && formik.errors.username ? 'border-red-500' : 'border-gray-300'}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>
            )}
          </div>
        )}

        <div>
          <input
            type="password"
            name="password"
            placeholder="Parol"
            className={`w-full p-3 border rounded-md focus:outline-none ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
          )}
        </div>

        {globalError && <p className="text-red-500 text-sm text-center">{globalError}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? 'Yuklanmoqda...' : mode === 'login' ? 'Kirish' : "Ro‘yxatdan o‘tish"}
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-gray-600">
        {mode === 'login' ? (
          <>
            Hisobingiz yo‘qmi?{' '}
            <button
              type="button"
              onClick={() => setMode('signup')}
              className="text-blue-500 hover:underline"
            >
              Ro‘yxatdan o‘tish
            </button>
          </>
        ) : (
          <>
            Allaqachon hisobingiz bormi?{' '}
            <button
              type="button"
              onClick={() => setMode('login')}
              className="text-blue-500 hover:underline"
            >
              Kirish
            </button>
          </>
        )}
      </div>
    </div>
  );
}
