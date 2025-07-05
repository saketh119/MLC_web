import React from 'react';

export default function MemberCard({ name, role, image }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-black w-72 text-center">
      <img
        src={image}
        alt={name}
        className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
      />
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm text-gray-700">{role}</p>
    </div>
  );
}
