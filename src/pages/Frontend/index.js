import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Hero from './Home/Hero'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
// import About from './About/'
// import Contact from './Contact/'
import Todos from './Todos/'
import Upload from './Todos/Upload'
import Add from './Add/Add'

import NoPage from '../../components/NoPage'

export default function Frontend() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route index element={<Hero />} />
                    <Route path='/add' element={<Add />} />
                    <Route path='/todos' element={<Todos />} />
                    <Route path='/upload' element={<Upload />} />
                    {/* <Route path='/about' element={<About />} /> */}
                    {/* <Route path='/contact' element={<Contact />} /> */}

                    <Route path='*' element={<NoPage />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}
