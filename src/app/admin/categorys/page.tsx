"use client";
import React from 'react'
import AdminLayout from "../layouts";
import FormAddCategory from '@/components/admin/categorys/FormAddCategory'
import TableCategory from '@/components/admin/categorys/TableCategory'
import FormAddSubCategory from '@/components/admin/subcategorys/FormAddSubCategory'
import TableSubCategory from '@/components/admin/subcategorys/TableSubCategory'


const CategoryPage = () => {
  return (
    <AdminLayout>
        <div className="p-2 grid lg:grid-cols-2 mt-4 gap-2">
          <FormAddCategory/>
          <TableCategory/>
        </div>
        <div className="p-2 grid lg:grid-cols-2 mt-4 gap-2">
          <FormAddSubCategory/>
          <TableSubCategory/>
        </div>
    </AdminLayout>
    
  )
}

export default CategoryPage