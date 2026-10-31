import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Hero = () => {

    const {user} = useSelector(state=>state.auth)
    const [menuOpen, setMenuOpen] = React.useState(false);

    return (
        <>
            <div className="min-h-screen pb-20">
                {/* Navbar */}
                <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
                    <Link to="/" aria-label="ResumeCraft home">
                        <img src="/logo.svg" alt="logo" className='h-11 w-auto' />
                        
                    </Link>

                    <div className="hidden md:flex items-center gap-8 transition duration-500 text-slate-800">
                        <a href="#top" className="hover:text-purple-600 transition">Home</a>
                        <a href="#features" className="hover:text-purple-600 transition">Features</a>
                        <a href="#cta" className="hover:text-purple-600 transition">Contact</a>
                    </div>

                    <div className="flex gap-2">
                        <Link to='/app?state=register' className="hidden md:block px-6 py-2 bg-purple-500 hover:bg-purple-700 active:scale-95 transition-all rounded-full text-white"hidden={user}>
                            Get started
                        </Link>
                        <Link to='/app?state=login' className="hidden md:block px-6 py-2 border active:scale-95 hover:bg-slate-50 transition-all rounded-full text-slate-700 hover:text-slate-900"hidden={user} >
                            Login
                        </Link>
                        <Link to='/app'className='hidden md:block px-8 py-2 bg-purple-500 hover:bg-purple-700 active:scale-95 transition-all rounded-full text-white'hidden={!user}>
                        Dashboard
                        </Link>
                    </div>

                    <button type="button" aria-label="Open navigation menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-menu" >
                            <path d="M4 5h16M4 12h16M4 19h16" />
                        </svg>
                    </button>
                </nav>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="fixed inset-0 z-[100] bg-slate-950/90 text-white backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden">
                        <button type="button" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} className="absolute right-6 top-6 rounded-full border border-white/30 px-3 py-1 text-sm">
                            Close
                        </button>
                        <a href="#top" onClick={() => setMenuOpen(false)}>Home</a>
                        <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
                        <a href="#cta" onClick={() => setMenuOpen(false)}>Contact</a>
                        {user ? (
                            <Link to="/app" onClick={() => setMenuOpen(false)} className="rounded-full bg-purple-600 px-6 py-3">Dashboard</Link>
                        ) : (
                            <>
                                <Link to="/app?state=register" onClick={() => setMenuOpen(false)} className="rounded-full bg-purple-600 px-6 py-3">Get started</Link>
                                <Link to="/app?state=login" onClick={() => setMenuOpen(false)} className="rounded-full border border-white/50 px-6 py-3">Login</Link>
                            </>
                        )}
                    </div>
                )}

                {/* Hero Section */}
                <div id="top" className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black">
                    <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-purple-300 blur-[100px] opacity-30"></div>

                   

                    {/* Headline + CTA */}
                    <h1 className="text-5xl mt-15 md:text-6xl font-semibold max-w-5xl text-center  md:leading-[70px]">
                      Build your resume effortlessly with <span className=" bg-gradient-to-r from-purple-700 to-purple-600 bg-clip-text text-transparent text-nowrap">Resume</span> Craft.
                    </h1>

                    <p className="max-w-md mt-20 text-center text-base my-7">Build your perfect resume in minutes using the  AI features of Resume Craft.</p>

                    {/* CTA Buttons */}
                    <div className="flex items-center mt-20 gap-4 ">
                        <Link to='/app' className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-9 h-12 m-1 ring-offset-2 ring-1 ring-purple-400 flex items-center transition-colors">
                            Get started
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-1 size-4" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </Link>
                       
                    </div>

                    

                    
                </div>
            </div>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

                    * {
                        font-family: 'Poppins', sans-serif;
                    }
                `}
            </style>
        </>
    );
}

export default Hero
