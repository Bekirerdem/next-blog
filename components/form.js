import { useAuth0 } from "@auth0/auth0-react";

function Form({ onSubmit, text, textSet }) {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  return (
    <form className="mt-10" onSubmit={onSubmit}>
      <div className="mt-4">
        <textarea
          rows="3"
          className="border border-gray-300 rounded w-full block px-2 py-1"
          onChange={(e) => textSet(e.target.value)}
          value={text}
        />
        {isAuthenticated ? (
          <div className="flex items-center space-x-2">
            <button className="bg-blue-700 text-white px-2 py-1 rounded mt-4">
              Send
            </button>
            <img src={user.picture} width={30} className="rounded-full mt-4" />
            <span className="mt-4">{user.name}</span>
            <button
              className="mt-4 px-4"
              typeof="button"
              onClick={() =>
                logout({ returnTo: process.env.NEXT_PUBLIC_URL + "/blog" })
              }
            >
              X
            </button>
          </div>
        ) : (
          <button
            typeof="button"
            onClick={() => loginWithRedirect()}
            className="bg-blue-700 text-white px-2 py-1 rounded mt-4"
          >
            Login
          </button>
        )}
      </div>
    </form>
  );
}

export default Form;
