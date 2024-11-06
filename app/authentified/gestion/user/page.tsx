'use client';
import React from 'react';
import Image from 'next/image';
import ButtonEdit from '@/app/components/buttonEdit';
import { useState, useEffect } from 'react';

export default function Attribution() {

  //   Le double useEffect a été utilisé pour deux tâches différentes :

  // Le premier useEffect s'assure de récupérer les valeurs de la base de données lorsque le composant est monté (via fetchValues).
  // Le second useEffect est utilisé pour définir les données récupérées (selectedName) une fois qu'elles sont reçues par le composant Attribution.
  // Ces deux étapes sont distinctes : l'une concerne la récupération de données, l'autre le réglage des valeurs à afficher, d'où l'usage de deux useEffect.

  const [values, setValues] = useState<{
    name: string,
    email: string,
    // surname: string,

  }>({
    name: '',
    email: '',
    // surname: '',
  });


  useEffect(() => {
    const savedData = localStorage.getItem("selectedData");

    if (savedData) {
      const parsedData = JSON.parse(savedData);

      const name = parsedData.name;
      const email = parsedData.email;
      // const surname = '';

      setValues({ name, email });
    }
  }, []);

  const [modifs, setModif] = useState("");

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModif(event.target.value);
  };


  const handleSave = async (event: React.FormEvent) => {
    console.log("Début de handleSave"); // Vérifie si handleSave est bien appelé
    event.preventDefault();
    try {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          surname: modifs,
        }),
      });

      console.log("Requête envoyée à l'API"); // Vérifie que fetch ne bloque pas

      if (!response.ok) {
        console.error("Erreur lors de la mise à jour :", response.statusText);
        return;
      }

      try {
        const updatedUser = await response.json();
        console.log("Nouveau nom sauvegardé :", updatedUser.surname);
      } catch (jsonError) {
        console.error("Erreur lors du parsing JSON :", jsonError);
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
    }
  };

  const [data, setData] = useState<{
    surname:string[],

  }>({
    surname: [],
  });

  const users = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();

      const role = data.map((item: any) => item.role);
      const avatar = data.map((item: any) => item.avatar);
      const surname = data.map((item: any) => item.surname);
      const email = data.map((item: any) => item.email);
      // const createdAt = data.map((item: any) => item.createdAt);
      if(data.findOne({email:values.email}).exec()){
      setData({surname})
      }
      console.log('from surname:', surname)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    users();
  }, []);
  // [
  //   { role: 'Admin', avatar: '/images/theo.svg', email: 'theo@ziema.fr', name: 'Théo', createdAt: '05/12/2023' },
  // ]

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // const paginatedUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <div className="flex justify-between m-6">
        <h1 className="font-bold text-2xl mb-4">Gestion des utilisateurs</h1>
        <div className=''>
          <ButtonEdit />
        </div>
      </div>

      <div className="overflow-x-auto grid m-6">
        <div className='flex flex-col bg-white justify-between items-center p-4'>
          {/* {users.map((user) => (
            <div>
              <Image src={user.avatar} alt="avatar" width={191} height={191} className="rounded-full " />
              <p>{user.name}[surname]</p>
            </div>))} */}
          <div className="max-w-md mx-auto p-6">
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rôle</label>
                <select id="role" name="role" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option>Admin</option>
                  <option>Editeur</option>
                  <option>Observateur</option>
                </select>
              </div>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Prénom</label>
                <input type="text" id="firstName" name="firstName" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" defaultValue={values.name} />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Nom</label>
                <input type="text" id="lastName" name="lastName" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" defaultValue={data.surname} onChange={handleValueChange} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" defaultValue={values.email} />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
                <input type="text" id="address" name="address" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" defaultValue="1 rue des exemples" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ville</label>
                  <input type="text" id="city" name="city" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" defaultValue="Toulouse" />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Code postal</label>
                  <input type="text" id="postalCode" name="postalCode" className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" defaultValue="31000" />
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleSave}>
                Enregistrer les modifications
              </button>
            </form>
          </div>
        </div>
        {/* <p className='self-center font-bold'>Gestion des utilisateurs</p>
        <div className=''>
          <ButtonEdit />
        </div>
      </div>
      <div className="overflow-x-auto  m-6">
        <div className='flex bg-white justify-between p-4'>
          <div className='relative'>
          </div>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-white border-b">
              <th className="p-4 text-left font-semibold text-sm text-gray-400">Rôle</th>
              <th className="p-4 text-left font-semibold text-sm text-gray-400">Avatar</th>
              <th className="p-4 text-left font-semibold text-sm text-gray-400">Email</th>
              <th className="p-4 text-left font-semibold text-sm text-gray-400">Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4 text-sm text-gray-800">{user.role}</td>
                <td className="p-4 text-sm text-gray-800">
                  <Image src={user.avatar} alt="avatar" width={30} height={30} className="rounded-full" />
                </td>
                <td className="p-4 text-sm text-gray-800">{user.email}</td>
                <td className="p-4 text-sm text-gray-800">{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <div className="flex justify-end items-center mt-4">
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


