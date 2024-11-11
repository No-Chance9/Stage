'use client';
import React from 'react';
import Image from 'next/image';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ButtonEdit from '@/app/components/buttonEdit';
import { useState, useEffect } from 'react';


export default function UserManagementTable({sendDataToParent}:any) {

  const [chartData, setChartData] = useState<{
    role: string[],
    name: string[],
    // avatar: string[],
    email: string[],
    // createdAt: Date,
  }>({
    role: [],
    name: [],
    // avatar: [],
    email: [],
    // createdAt: Date,
  });

  const fetchValues = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();

      const role = data.map((item: any) => item.role);
      const avatar = data.map((item: any) => item.avatar);
      const name = data.map((item: any) => item.name);
      const email = data.map((item: any) => item.email);
      // const createdAt = data.map((item: any) => item.createdAt);

      setChartData({ name, email, role });
      console.log('from register:', data)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    fetchValues();
  }, []);


  const users = chartData.name.map((name, index) => ({
    role: chartData.role[index], // Vous pouvez ajouter d'autres données ici si nécessaire
    avatar: '/images/theo.svg', // Mettre un avatar par défaut ou utiliser une valeur dynamique
    email: chartData.email[index],
    name: name,
    createdAt: '05/12/2023', // Vous pouvez adapter cette valeur
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <div className='flex justify-between m-6 '>
        <p className='self-center font-bold'>Gestion des utilisateurs</p>
        <div className=''>
          <ButtonEdit />
        </div>
      </div>
      <div className="overflow-x-auto grid m-6">
        <div className='flex bg-white justify-between p-4'>
          <h1 className='self-center font-bold'>Modifiez vos users</h1>
          <div className='relative'>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
            <input
              type="text"
              placeholder="Search or type a command"
              className="block pl-10 pr-3 py-2 rounded-full bg-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 " />
          </div>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-white border-b">
              <th className="p-4 text-left font-semibold text-sm text-gray-400">Rôle</th>
              <th className="p-4 text-left font-semibold text-sm text-gray-400">Avatar</th>
              <th className="p-4 text-left font-semibold text-sm text-gray-400">Email</th>
              <th className="p-4 text-left font-semibold text-sm text-gray-400">Name</th>
              <th className="p-4 text-left font-semibold text-sm text-gray-400">Créé le</th>
              <th className="p-4 text-left font-semibold text-sm text-gray-400">Modifier</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4 text-sm text-gray-800 " >
                  <a  href="/authentified/gestion/user" className='cursor-pointer hover:text-blue-500'>{user.role}</a>
                </td>
                <td className="p-4 text-sm text-gray-800">
                  <a href="/authentified/gestion/user">
                    <Image src={user.avatar} alt="avatar" width={30} height={30} className="rounded-full border hover:border-blue-500" />
                  </a>
                </td>
                <td className="p-4 text-sm text-gray-800">
                  <a onClick={() => sendDataToParent(user.name, user.email)}  className='cursor-pointer hover:text-blue-500' href="/authentified/gestion/user" >{user.email}</a>
                </td>
                <td className="p-4 text-sm text-gray-800">
                  <a onClick={() => sendDataToParent(user.name, user.email)} className='cursor-pointer hover:text-blue-500' href="/authentified/gestion/user">{user.name}</a>
                </td>
                <td className="p-4 text-sm text-gray-800">{user.createdAt}</td>
                <td className="p-4 text-sm text-gray-800 flex gap-2">
                  <a href="/authentified/gestion/user">
                    <FiEdit2 className="text-blue-500 cursor-pointer hover:text-blue-700" />
                  </a>
                  <FiTrash2 className="text-red-500 cursor-pointer hover:text-red-700" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex  justify-self-end justify-end items-center mt-4 bg-white">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="px-2 py-1 mx-1 text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50"
          >
            Début
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 mx-1 text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 mx-1 text-sm ${page === currentPage ? 'text-blue-500 font-bold' : 'text-gray-700 hover:text-gray-900'}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 mx-1 text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50"
          >
            &gt;
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 mx-1 text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50"
          >
            Fin
          </button>
        </div>
      </div>
    </>
  );
}


