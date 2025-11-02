import React from 'react'

function Avatars() {
    let count = 10.9;
  return (
    <div className='flex items-center gap-1'>
      <div className="avatar-group -space-x-6">
        <div className="avatar">
          <div className="w-8">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          </div>
        </div>
        <div className="avatar">
          <div className="w-8">
            <img src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
          </div>
        </div>
        <div className="avatar">
          <div className="w-8">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          </div>
        </div>
        <div className="avatar">
          <div className="w-8">
            <img src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
          </div>
        </div>
      </div>
      <p className="text-small font-medium ms-3 text-primary">
        {count}K Members
      </p>
    </div>
  );
}

export default Avatars