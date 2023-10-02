import React, { useState } from 'react';
import Permission from './Permission';
import Video from '../../assets/output.mp4.avi';

const Interview = () => {
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  const handlePermissionGranted = () => {
    setPermissionsGranted(true);
  };

  return (
    <div>
      {!permissionsGranted ? (
        <Permission onPermissionGranted={handlePermissionGranted} />
      ) : (
        <Video videoUrl="path/to/interviewer-video.mp4" />
      )}
    </div>
  );
};

export default Interview;
