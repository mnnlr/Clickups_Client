import React from 'react'

export const ContactUsPage = () => {
    return (
        <section>
            <div className="relative w-full h-96"><img className="absolute h-full w-full object-cover object-center" src="https://bucket.material-tailwind.com/magic-ai/bbe71871de8b4d6f23bb0f17a6d5aa342f3dea72677ba7238b18defa3741244d.jpg" alt="nature image" />
                <div className="absolute inset-0 h-full w-full bg-black/50" />
                <div className="relative pt-28 text-center">
                    <h2 className="block antialiased tracking-normal font-sans font-semibold leading-[1.3] text-white mb-4 text-3xl lg:text-4xl">Contact Us</h2>
                    <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-white mb-9 opacity-70">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi nec, ultricies metus.</p>
                </div>
            </div>
            <form className="-mt-16 mb-8 px-8">
                <div className="container mx-auto">
                    <div className="py-12 flex justify-center rounded-xl border border-white bg-white shadow-md shadow-black/5 saturate-200">
                        <div className="py-4">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="flex flex-col">
                                    <input
                                        className="py-4 bg-white rounded-full px-6 placeholder:text-xs border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="email"
                                        name='email'
                                        placeholder="Email Adresse"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        className="py-4 bg-white rounded-full px-6 placeholder:text-xs border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        name='phone'
                                        type="tel"
                                        placeholder="Phone Number"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="my-6">
                                <textarea
                                    className="w-full rounded-2xl placeholder:text-xs px-6 py-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    name='message'
                                    placeholder="type your message here..."
                                    rows={8}
                                    required
                                />
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="rounded-full bg-blue-900 text-white font-bold py-4 px-6 min-w-40 hover:bg-blue-800 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </section>

    )
}
