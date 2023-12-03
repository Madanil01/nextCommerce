"use client";
import FormAddColor from '@/components/admin/colors/FormAddColor';
import TableColor from '@/components/admin/colors/TableColor';
import React from 'react'
import AdminLayout from "../layouts";

const ColorPage = () => {
  return (
    <AdminLayout>
      <div className="p-2 grid lg:grid-cols-2 mt-4 gap-2">
        <FormAddColor />
        <TableColor />
      </div>
    </AdminLayout>
  );
}

export default ColorPage