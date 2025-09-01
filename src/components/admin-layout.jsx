import React from 'react'
import AdminHeader from './admin/AdminHeader'

function AdminLayout({ children }) {
    return (
        <div className='flex justify-center items-center flex-col'>
            <AdminHeader />
            <div className="container mt-5">
                {children}
            </div>
        </div>
    )
}

export default AdminLayout