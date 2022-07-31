import React from 'react';

const suggestions = [
    {
        name: "Sonny Sangha",
        src: "https://links.papareact.com/zof",
        profile: "https://links.papareact.com/l4v",
        worksAt: 'Home'
      },
      {
        name: "Elon Musk",
        src: "https://links.papareact.com/4zn",
        profile: "https://links.papareact.com/kxk",
        worksAt: 'Tesla'
      },
      {
        name: "Jeff Bezoz",
        src: "https://links.papareact.com/k2j",
        profile: "https://links.papareact.com/f0p",
        worksAt: 'Toto Company'
      },
      {
        name: "Mark Zukerberg",
        src: "https://links.papareact.com/xql",
        profile: "https://links.papareact.com/snf",
        worksAt: 'Facebook'
      },
      {
        name: "Bill Gates",
        src: "https://links.papareact.com/4u4",
        profile: "https://links.papareact.com/zvy",
        worksAt: 'Microsoft'
      },
]

const Suggestions = () => {
    return (
        <div className='mt-4 ml-10'>
            <div className='flex justify-between text-sm mb-5'>
                <h3 className='text-sm font-bold text-gray-400'>Suggestions for you</h3>
                <button className="text-gray-400 font-semibold cursor-pointer">See All</button>
            </div>

            {
                suggestions.map(profile => (
                    <div className='flex items-center justify-between mt-3' key={profile.src}>
                        <img className='w-10 h-10 rounded-full border p-[2px]' src={profile.profile} alt="" />

                        <div className='flex-1 ml-4'>
                            <h2 className='font-semibold text-sm'>{profile.name}</h2>
                            <h3 className='text-xs text-gray-400'>Works at {profile.worksAt}</h3>
                        </div>

                        <button className='text-blue-400 text-sm font-bold'>Follow</button>
                    </div>
                ))
            }
        </div>
    );
};

export default Suggestions;