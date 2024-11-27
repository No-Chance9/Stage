'use client';
import React from 'react';
import Image from 'next/image';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ButtonEdit from '@/app/components/buttonEdit';
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";


export default function UserManagementTable({ sendDataToParent }: any) {
  const { data: session } = useSession();

  // Access the user ID from session
  const userId = session?.user?.id;

  const [users, setUsers] = useState<
    Array<{
      role: string;
      name: string;
      profilePictureUrl: string;
      email: string;
      createdAt: string;
      originalIndex: number
    }>
  >([]);

  const [filteredUsers, setFilteredUsers] = useState<typeof users>([]); // Filtered users
  const [searchQuery, setSearchQuery] = useState<string>(''); // Search query state

  const fetchValues = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();

      // Fetch each profile picture based on profilePictureId
      const usersWithImages = await Promise.all(
        data.map(async (user: any, index: number) => {
          let profilePictureUrl = "/images/Union.svg"; // Fallback URL if no profile picture

          if (user.profilePicture) {
            try {
              const imageRes = await fetch(`/api/profilePicture/${user.profilePicture}`);
              const imageData = await imageRes.json();
              if (imageData && imageData.path) {
                profilePictureUrl = imageData.path;
              }
            } catch (error) {
              console.error("Error fetching profile picture:", error);
            }
          }

          return {
            role: user.role,
            name: user.name,
            profilePictureUrl,
            email: user.email,
            createdAt: user.createdAt || "05/12/2023", // Use a default if createdAt is missing
            originalIndex: index, // Ajoutez l'index original
          };
        })
      );

      setUsers(usersWithImages);
      setFilteredUsers(usersWithImages); // Initialize filtered users with all users
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchValues();
  }, []);

  useEffect(() => {
    // Filter users whenever the search query changes
    const lowerCaseQuery = searchQuery.toLowerCase();

    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(lowerCaseQuery) ||
          user.email.toLowerCase().includes(lowerCaseQuery)
      )
    );
  }, [searchQuery, users]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value); // Update search query state
  };

  // State to control the visibility of the popup
  const [showPopup, setShowPopup] = useState(false);


  // Soft delete function
  const handleDelete = async (email: string) => {
    
    const userConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer l'utilisateur ?");
    if (!userConfirmed) {
      return; // Si l'utilisateur clique sur "Annuler", on sort de la fonction
    }

    try {
      const res = await fetch("/api/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, isActive: false }), // Pass email and set isActive to false
      });

      if (res.ok) {
        const updatedUser = await res.json();
        console.log("User soft deleted:", updatedUser);

        // Update the local state to remove the user or set isActive to false
        setUsers((prevUsers) => prevUsers.filter((user) => user.email !== email));
        setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.email !== email));

        // Show the popup for 3 seconds
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 3000); // 3000ms = 3 seconds
      } else {
        console.error("Failed to delete user:", res.statusText);
      }
    } catch (error) {
      console.error("Error during delete:", error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getPaginatedPages = () => {
    const maxVisiblePages = 5; // Nombre maximum de pages visibles à la fois (hors début/fin)
    const pages = [];
    const totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (totalPages <= maxVisiblePages + 2) {
      // Affiche tout si les pages totales sont inférieures au seuil
      return totalPagesArray;
    }

    if (currentPage <= 3) {
      // Montre les premières pages
      pages.push(...totalPagesArray.slice(0, maxVisiblePages));
      pages.push('...', totalPages); // Points + Dernière page
    } else if (currentPage > totalPages - 3) {
      // Montre les dernières pages
      pages.push(1, '...');
      pages.push(...totalPagesArray.slice(totalPages - maxVisiblePages));
    } else {
      // Pages intermédiaires
      pages.push(1, '...');
      pages.push(...totalPagesArray.slice(currentPage - 1, currentPage + 1));
      pages.push('...', totalPages);
    }

    return pages;
  };

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
          <h1 className='self-center font-bold'>Vos users</h1>
          <div className='relative'>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
            <input
              type="text"
              placeholder="Search a user"
              className="block pl-10 pr-3 py-2 rounded-full bg-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 "
              onChange={handleSearchChange}
            />
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
            {paginatedUsers.map((user, index) => {
              const globalIndex = user.originalIndex; // Utilisez `originalIndex`
              return (
                <tr key={globalIndex} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-sm cursor-pointer hover:text-blue-500 text-gray-800 "
                    onClick={() => {
                      sendDataToParent(user.name, user.email, globalIndex);
                      window.location.href = "/authentified/gestion/user";
                    }} >
                    {user.role}
                  </td>
                  <td onClick={() => {
                    sendDataToParent(user.name, user.email, globalIndex);
                    window.location.href = "/authentified/gestion/user";
                  }} className="p-4 text-sm cursor-pointer hover:text-blue-500 text-gray-800">
                    <Image src={user.profilePictureUrl} alt="avatar" width={30} height={30} className="rounded-full border hover:border-blue-500" />
                  </td>
                  <td onClick={() => {
                    sendDataToParent(user.name, user.email, globalIndex);
                    window.location.href = "/authentified/gestion/user";
                  }} className="p-4 text-sm cursor-pointer hover:text-blue-500 text-gray-800">
                    {user.email}
                  </td>
                  <td onClick={() => {
                    sendDataToParent(user.name, user.email, globalIndex);
                    window.location.href = "/authentified/gestion/user";
                  }} className="p-4 text-sm cursor-pointer hover:text-blue-500 text-gray-800">
                    {user.name}
                  </td>
                  <td className="p-4 text-sm text-gray-800">{user.createdAt}</td>
                  <td
                    className="p-4 text-sm cursor-pointer hover:text-blue-500 text-gray-800 flex gap-2">
                    <a href="/authentified/gestion/user" onClick={() => {
                      sendDataToParent(user.name, user.email, globalIndex);
                    }}>
                      <FiEdit2 className="text-blue-500 cursor-pointer hover:text-blue-700" />
                    </a>
                    <button onClick={() => {
                      handleDelete(user.email);
                    }}>
                      <FiTrash2 className="text-red-500 cursor-pointer hover:text-red-700" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
          {/* Popup */}
          {showPopup && (
            <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md shadow-md z-50">
              Utilisateur supprimé avec succes
            </div>
          )}
        </table>
        <div className="flex justify-self-end justify-end items-center mt-4 bg-white">
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
          {getPaginatedPages().map((page, index) => (
            typeof page === 'number' ? (
              <button
                key={index}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 mx-1 text-sm ${page === currentPage ? 'text-blue-500 font-bold' : 'text-gray-700 hover:text-gray-900'}`}
              >
                {page}
              </button>
            ) : (
              <span key={index} className="px-3 py-1 mx-1 text-sm text-gray-500">
                ...
              </span>
            )
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
