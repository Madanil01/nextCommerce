"use client"
import FormAddSize from '@/components/admin/sizes/FormAddSize';
import TableSize from '@/components/admin/sizes/TableSize';
import React from 'react'
import AdminLayout from "../layouts";

const SizePage = () => {
  return (
    <AdminLayout>
      <div className="p-2 grid lg:grid-cols-2 mt-4 gap-2">
        <FormAddSize />
        <TableSize />
      </div>
    </AdminLayout>
  );
}

export default SizePage