import { login, signup } from "./actions";

type LoginPageProps = {
  searchParams?: Promise<{
    message?: string | string[];
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const message = Array.isArray(params?.message)
    ? params.message[0]
    : params?.message;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-96 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">登入 / 註冊</h2>
        {message ? (
          <p className="rounded border border-yellow-300 bg-yellow-50 px-3 py-2 text-sm text-yellow-800">
            {message}
          </p>
        ) : null}
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border p-2 rounded"
        />

        <label htmlFor="password">密碼:</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="border p-2 rounded"
        />

        <div className="flex gap-4 mt-4">
          <button
            formAction={login}
            className="bg-blue-500 text-white px-4 py-2 rounded flex-1"
          >
            登入
          </button>
          <button
            formAction={signup}
            className="bg-green-500 text-white px-4 py-2 rounded flex-1"
          >
            註冊
          </button>
        </div>
      </form>
    </div>
  );
}
