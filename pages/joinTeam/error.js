//error.js
const Error400 = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900">
        <h1 className="text-2xl font-semibold text-black dark:text-white mb-4">
          400 - Bad Request
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Uh-oh! It seems like the link you clicked has expired.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
        No biggie! Just hit up your team leader for a brand-new link that's fresh from the Futurepreneurs vault. 🚀
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
        Alternatively, if you've got the top-secret team code, punch it in on the Join Team page, and you're in! 🤐💥
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Stay cool and keep rockin'! 🤘😎
        </p>
        <a href="/joinTeam" className="text-blue-500 dark:text-blue-600 hover:underline mt-4">
          Go to the Join Team page
        </a>
      </div>
    );
  };
  
  export default Error400;