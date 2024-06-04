import React from 'react'

function page() {
  return (
    <div className="grid place-content-center px-4">
  <div className="text-center">
    <h1 className="text-9xl font-black text-gray-200">201</h1>

    <p className="text-2xl font-bold tracking-tight text-gray-1000 sm:text-4xl">Congratulations!</p>

    <p className="mt-4 text-gray-500">You have been successfully added.</p>

    <a
      href="/"
      className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
    >
      Go Back Home
    </a>
  </div>
</div>
  )
}

export default page
